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
	["SceneRenderer", "ApplicationRoutes"],
	function(SceneRenderer, ApplicationRoutes)
	{
		// Initialize the rendering pipeline.
		// This should only happen once per page load, and is tied directly to the routes.
		var _SceneRenderer = SceneRenderer.New();
		_SceneRenderer.InitializeRenderer();

		// Setup the application router, which also holds the global state object.
		ApplicationRoutes.Initialize(_SceneRenderer);
	}
);