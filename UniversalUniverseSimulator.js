var Connect = require('connect');
var ServeStatic = require('serve-static');

var Application = Connect();

Application.use(ServeStatic('build/site', {'index': 'index.html'}));
Application.listen(9999);