/**
* This file is the main application for the Universal Universe simulator.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description Main application.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["SceneRenderer", "ApplicationRoutes", "ApplicationUserInteraction"],
	function(SceneRenderer, ApplicationRoutes, ApplicationUserInteraction)
	{
		// Initialize the rendering pipeline.
		// This should only happen once per page load, and is tied directly to the routes.
		var _SceneRenderer = SceneRenderer.New();

		var _ApplicationUserInteraction = ApplicationUserInteraction;
		// Now use the the UI logging object to write log entries to the log div with a template.
		// This wire-up is clumsy but it is completely abstracted to the "Application" layer.
		_SceneRenderer.SceneConsole.WriteLogDelegate = _ApplicationUserInteraction.WriteLogDelegate;

		// Now tell the user that things are being initialized....
		_SceneRenderer.SceneConsole.WriteLog('Initializing the Solar System renderer...');

		_SceneRenderer.InitializeRenderer();

		_SceneRenderer.SceneConsole.WriteLog('...Solar System renderer initialized.');

		// Setup the application router, which also holds the global state object.
		ApplicationRoutes.Initialize(_SceneRenderer);


		var oApplication = (
		{
		});

		Object.defineProperty(oApplication, 'SceneRenderer',
		{
			get: function() { return _SceneRenderer; }
		});
	}
);