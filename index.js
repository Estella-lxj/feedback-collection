const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const app = express();
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

app.use(express.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
	//express will server up production main.js in build
	app.use(express.static("client/build"));
	//index.html if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sandFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
