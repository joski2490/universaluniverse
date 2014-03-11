/**
* This file is the scene rendering engine for the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description A simple renderer to glue our graphics lib (currently oCanvas) to our test model.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['UniversalUniverse', 'OrbitalSolver-Circular'],
	function(UniversalUniverse)
	{
		// This should move to the universe object...
		var _UniversalTime = 0;

		function initializeRenderer()
		{
			// TODO: Split this up into Graphics Context management, Universe Generation and Renderer setup.
			var tmpCanvas = oCanvas.create({ canvas: "#UUCanvasUniverse", background: "#000" });
			var tmpXOrigin = tmpCanvas.width / 2;
			var tmpYOrigin = tmpCanvas.height / 2;

			////////// Create a single sun for now in our universe.  They don't have orbits anyway. //////////
			// Sun protoype object
			UniversalUniverse.AddSun();
			UniversalUniverse.Suns[0].Radius = 30;
			UniversalUniverse.Suns[0].OrbitalSolver.OrbitalCenterX = tmpXOrigin;
			UniversalUniverse.Suns[0].OrbitalSolver.OrbitalCenterY = tmpYOrigin;
			var tmpSunLocation = UniversalUniverse.Suns[0].OrbitalSolver.ComputeLocation(UniversalUniverse.Time);
			UniversalUniverse.Suns[0].Renderable = tmpCanvas.display.ellipse
			({
				x: tmpSunLocation.X,
				y: tmpSunLocation.Y,
				radius: UniversalUniverse.Suns[0].Radius,
				fill: "#f00"
			}).add();

			////////// Create some random planets in random places. //////////
			// Minimum of 1 and maximum of 8 planets.
			var tmpPlanetCount = Math.floor((Math.random()*8)+1);
			//console.log('There are '+ tmpPlanetCount +' planets.');
			// We are abusing the origin, knowing it's the midpoint
			var tmpPlanetSpacing = tmpXOrigin / (tmpPlanetCount + 1);
			//console.log('The planets are '+ tmpPlanetSpacing +' units apart.');

			// For the janky color generation until the POV images are integrated...
			var tmpColors = Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
			// Create each planet
			for (var i = 0; i < tmpPlanetCount; i++)
			{
				UniversalUniverse.AddPlanet();
				UniversalUniverse.Planets[i].X = (i + 1) * tmpPlanetSpacing;
				//console.log('Planet ' + i + ' Initial X: ' + UniversalUniverse.Planets[i].X );
				UniversalUniverse.Planets[i].Radius = Math.random()*12+7;
				//console.log('Planet ' + i + ' Object Radius: ' + UniversalUniverse.Planets[i].X );
				// Set the orbital solver to be circular
				UniversalUniverse.Planets[i].OrbitalSolver = require('OrbitalSolver-Circular').New();
				UniversalUniverse.Planets[i].OrbitalSolver.OrbitalCenterX = tmpXOrigin;
				UniversalUniverse.Planets[i].OrbitalSolver.OrbitalCenterY = tmpYOrigin;
				UniversalUniverse.Planets[i].OrbitalSolver.Radius = UniversalUniverse.Planets[i].X;
				UniversalUniverse.Planets[i].OrbitalSolver.OrbitalVelocity = Math.random() * 0.1;
				var tmpLocation = UniversalUniverse.Planets[i].OrbitalSolver.ComputeLocation(_UniversalTime);
				//console.log('Planet ' + i + ' Orbital Velocity: ' + UniversalUniverse.Planets[i].OrbitalSolver.OrbitalVelocity );
				UniversalUniverse.Planets[i].Renderable = tmpCanvas.display.ellipse
				({
					x: tmpLocation.X,
					y: tmpLocation.Y,
					radius: UniversalUniverse.Planets[i].Radius,
					fill: '#'+tmpColors[Math.floor((Math.random()*17))]+tmpColors[Math.floor((Math.random()*17))]+tmpColors[Math.floor((Math.random()*17))]
				}).add();
			}

			// Setup the animation loop and action to start/pause
			tmpCanvas.bind
			(
				'click tap',
				function ()
				{
					tmpCanvas.timeline[tmpCanvas.timeline.running ? "stop" : "start"]();
				}
			);
			tmpCanvas.setLoop
			(
				function ()
				{
					UniversalUniverse.Time++;

					for (var i = 0; i < UniversalUniverse.Planets.length; i++)
					{
						tmpLocation = UniversalUniverse.Planets[i].OrbitalSolver.ComputeLocation(UniversalUniverse.Time);
						UniversalUniverse.Planets[i].Renderable.moveTo(tmpLocation.X, tmpLocation.Y);
					}
				}
			);
		}

		////////// Return Object //////////
		var oSceneRenderer = (
		{
			InitializeRenderer: initializeRenderer
		});

		return oSceneRenderer;
	}
);
