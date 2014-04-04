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
		function oNew()
		{
			var _CanvasElement = '#UUCanvasUniverse';
			var _CanvasBackground = '#000';
			var _Canvas = false;

			var _XOrigin = 0;
			var _YOrigin = 0;

			var _Universe = UniversalUniverse;

			var _TimeShift = 0;

			////////// Configure the Canvas Element //////////
			function initializeCanvas()
			{
				_Canvas = oCanvas.create({ canvas: _CanvasElement, background: _CanvasBackground });
				updateCanvasDimensions();
			}

			////////// Setup the Canvas Dimensions //////////
			function updateCanvasDimensions()
			{
				_XOrigin = _Canvas.width / 2;
				_YOrigin = _Canvas.height / 2;
				updateUniverseOrbits();
			}

			////////// Cascade Rendering State to Rendering Solvers //////////
			function updateUniverseOrbits()
			{
				// Move the midpoints for the orbital solvers on Suns
				for (var i = 0; i < _Universe.Suns.length; i++)
				{
					_Universe.Suns[i].OrbitalSolver.OrbitalCenterX = _XOrigin;
					_Universe.Suns[i].OrbitalSolver.OrbitalCenterY = _YOrigin;
				}
				// Move the midpoints for the orbital solvers on Planets
				for (var j = 0; j < _Universe.Planets.length; j++)
				{
					_Universe.Planets[j].OrbitalSolver.OrbitalCenterX = _XOrigin;
					_Universe.Planets[j].OrbitalSolver.OrbitalCenterY = _YOrigin;
				}

				updateBodyLocations();
			}

			////////// Update the Universal Time //////////
			function updateUniverseTime()
			{
				if (_TimeShift === 0) return;

				_Universe.Time += _TimeShift;

				updateBodyLocations();
			}

			////////// Update the Locations of Celestial Bodies //////////
			function updateBodyLocations()
			{
				// Move the midpoints for the orbital solvers on Suns
				for (var i = 0; i < _Universe.Suns.length; i++)
				{
					var tmpSunLocation = _Universe.Suns[i].OrbitalSolver.ComputeLocation(_Universe.Time);
					_Universe.Suns[i].Renderable.moveTo(tmpSunLocation.X, tmpSunLocation.Y);
				}
				// Move the midpoints for the orbital solvers on Planets
				for (var j = 0; j < _Universe.Planets.length; j++)
				{
					var tmpLocation = _Universe.Planets[j].OrbitalSolver.ComputeLocation(_Universe.Time);
					_Universe.Planets[j].Renderable.moveTo(tmpLocation.X, tmpLocation.Y);
				}

				// Now update the text.
				$('.UUUniverseYears').text(_Universe.TimeCurrentYear);
				$('.UUUniverseDays').text(_Universe.TimeCurrentDay.toFixed(2));
			}

			////////// Initialize the Renderer and generate the universe //////////
			function initializeRenderer()
			{
				initializeCanvas();

				////////// Create a single sun for now in our universe.  They don't have orbits yet anyway. //////////
				_Universe.AddSun();
				_Universe.Suns[0].Radius = 30;
				_Universe.Suns[0].Renderable = _Canvas.display.ellipse
				({
					radius: _Universe.Suns[0].Radius,
					fill: "#f13"
				}).add();

				////////// Create some random planets in random places. //////////
				// Minimum of 1 and maximum of 8 planets.
				var tmpPlanetCount = Math.floor((Math.random()*8)+1);
				//console.log('There are '+ tmpPlanetCount +' planets.');
				// We are abusing the origin, knowing it's the midpoint
				var tmpPlanetSpacing = _XOrigin / (tmpPlanetCount + 1);
				//console.log('The planets are '+ tmpPlanetSpacing +' units apart.');

				// For the janky color generation until the POV images are integrated...
				var tmpColors = Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
				// Create each planet
				for (var i = 0; i < tmpPlanetCount; i++)
				{
					_Universe.AddPlanet();
					_Universe.Planets[i].X = (i + 1) * tmpPlanetSpacing;
					//console.log('Planet ' + i + ' Initial X: ' + _Universe.Planets[i].X );
					_Universe.Planets[i].Radius = Math.random()*12+7;
					//console.log('Planet ' + i + ' Object Radius: ' + _Universe.Planets[i].X );
					// Set the orbital solver to be circular
					_Universe.Planets[i].OrbitalSolver = require('OrbitalSolver-Circular').New();
					_Universe.Planets[i].OrbitalSolver.Radius = _Universe.Planets[i].X;
					_Universe.Planets[i].OrbitalSolver.OrbitalVelocity = Math.random() * 0.1;
					//console.log('Planet ' + i + ' Orbital Velocity: ' + _Universe.Planets[i].OrbitalSolver.OrbitalVelocity );
					_Universe.Planets[i].Renderable = _Canvas.display.ellipse
					({
						radius: _Universe.Planets[i].Radius,
						fill: '#'+tmpColors[Math.floor((Math.random()*17))]+tmpColors[Math.floor((Math.random()*17))]+tmpColors[Math.floor((Math.random()*17))]
					}).add();
				}

				// Now update the orbital centers and ultimately locations for frame 1
				updateUniverseOrbits();
//				_Canvas.redraw();

				_Canvas.setLoop
				(
					function ()
					{
						updateUniverseTime();
					}
				);

				// Now start the canvas timeline running (with a timeshift of 0)
				_Canvas.timeline.start();
			}

			////////// Return Object //////////
			var oSceneRenderer = (
			{
				New: oNew,
				InitializeRenderer: initializeRenderer,
				UpdateCanvasDimensions: updateCanvasDimensions,
				UpdateUniverseOrbits: updateUniverseOrbits,
				UpdateBodyLocations: updateBodyLocations
			});

			// This is the amount of change each tick that the universe gets.
			// Hard coded above to 30 ticks per second at the moment.
			Object.defineProperty(oSceneRenderer, 'TimeShift',
			{
				get: function() { return _TimeShift; },
				set: function(pTimeShift)
						{
							_TimeShift = pTimeShift;
							console.log('Timeshift set to '+_TimeShift);
						}
			});

			Object.defineProperty(oSceneRenderer, 'Time',
			{
				get: function() { return _Universe.Time; },
				set: function(pTime) { _Universe.Time = pTime; }
			});

			return oSceneRenderer;
		}

		return oNew();
	}
);
