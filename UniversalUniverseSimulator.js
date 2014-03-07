/**
* This file is the web server for the Universal Universe simulator.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description Simulator server.  Bork bork.
*/

var Connect = require('connect');
var ServeStatic = require('serve-static');

var Application = Connect();

Application.use(ServeStatic('build/site', {'index': 'index.html'}));
Application.listen(9999);