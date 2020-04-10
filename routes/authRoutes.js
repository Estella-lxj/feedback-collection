const passport = require("passport");

module.exports = (app) => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})
	);

	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.get('/googleb7a43c1ce5fde505.html', (req, res) => {
		res.send(req.user);
	});
};
