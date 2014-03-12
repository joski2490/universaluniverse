/**
* This file is the main application routes for the Universal Universe simulator.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description Main application backbone routes!.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		var _Router;
		var _RouterPrototype;

		var _TimeShift = 0.1;
		var _TimeShiftFast = 1.0;
		var _TimeShiftStep = 1.0;

		function oInitialize(SceneRenderer)
		{
			// Define the routes in the base router object
			_RouterPrototype = Backbone.Router.extend
			({
				routes:
				{
					"": "displayOrrery",
					"orrery": "displayOrrery",
					"log": "displayLog",
					"backfast": "goFastBackward",
					"back": "goBackward",
					"pause": "goPause",
					"forward": "goForward",
					"forwardfast":"goFastForward"
				},
				displayOrrery:function()
				{
				},
				displayLog:function()
				{
				},
				goFastBackward:function()
				{
					SceneRenderer.TimeShift = -_TimeShiftFast;
				},
				goBackward:function()
				{
					SceneRenderer.TimeShift = -_TimeShift;
				},
				goPause:function()
				{
					SceneRenderer.TimeShift = 0.0;
				},
				goForward:function()
				{
					SceneRenderer.TimeShift = _TimeShift;
				},
				goFastForward:function()
				{
					SceneRenderer.TimeShift = _TimeShiftFast;
				}
			});

			_Router = new _RouterPrototype();

			// Startup the history object, so bookmarking of URLs works.
			Backbone.history.start();

			return true;
		}

		////////// Return Object //////////
		var oApplicationRoutes = (
		{
			Initialize: oInitialize
		});

		return oApplicationRoutes;
	}
);