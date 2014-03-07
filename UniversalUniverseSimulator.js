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
var Minimist = require('minimist');
var Connect = require('connect');
var ServeStatic = require('serve-static');

var Settings = { };

var CommandLineArguments = Minimist(process.argv);

// Meh we aren't gonna check for errors in this
if (typeof(CommandLineArguments.p) === 'undefined')
	Settings.Port = 9999;
else
	Settings.Port = CommandLineArguments.p;

var Application = Connect();

Application.use(ServeStatic('build/site', {'index': 'index.html'}));
Application.listen(Settings.Port);