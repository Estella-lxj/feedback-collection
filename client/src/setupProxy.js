const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'https://sheltered-lowlands-43900.herokuapp.com' }));
}