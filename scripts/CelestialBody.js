/**
* This file is part of the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description The base Celestial Body class for our pseudo-science orbiting body systems
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	// TODO: Learn how to use external libraries, like bigdecimal, in the browser and node.
	//['OrbitalSolver', 'bigdecimal'],
	//function(bigdecimal)
	['OrbitalSolver'],
	function(OrbitalSolver)
	{
		function oNew()
		{
			////////// Internal Data and Settings //////////
			var _Options = (
			{
				Name: 'Unnamed Celestial Body',

				X: 0,
				Y: 0,

				Radius: 1.0,
				Density: 1.0,

				OrbitalSolver: OrbitalSolver,

				Renderable: false
			});

			////////// Behavioral Functions //////////
			// Compute the Mass of the celestial body
			function computeMass()
			{
				// Basing mass on the universal density/mass equation:
				//     Mass = density * ((4/3) * pi * (Radius^3))
				// TODO: Determine if we need to use arbitrary precision libraries for this
				// TODO: We should cache this value once we compute it once, or potentially
				//       precompute it when values are set in the object.
				// THE BELOW IMPLEMENTATION GIVES VARYING RESULTS IN DIFFERENT JAVASCRIPT ENGINES
				var tmpMass = _Options.Density * ((4.0/3.0) * 3.14159 * (_Options.Radius^3));
				// THE BELOW IMPLEMENTATION IS CONSISTENT BECAUSE WE USE BIGDECIMAL
				/*
				// Note that bigdecimal is really finicky about working right, and it is almost
				// impossible to debug why.  Using inconsistent JS methods for now.
				var tmpPrecision = 25;
				var tmpRoundingMode = bigdecimal.RoundingMode.HALF_UP();

				var tmpDensity = new bigdecimal.BigDecimal(_Options.Density);
				var tmpRadius = new bigdecimal.BigDecimal(_Options.Radius);

				var tmpPi = new bigdecimal.BigDecimal('3.14159');
				var tmpRatioTop = new bigdecimal.BigDecimal('4.0');
				var tmpRatioBottom = new bigdecimal.BigDecimal('3.0');

				// Compute the 4/3 ratio multiplier.  Thanks Archimedes.
				var tmpRatio = tmpRatioTop.add(tmpRatioBottom, tmpPrecision, tmpRoundingMode);

				// Now get the products of the 3d volume, to generate mass!
				var tmpDensityRatio = tmpRatio.multiply(tmpDensity, tmpPrecision, tmpRoundingMode);
				var tmpRadiusCubed = tmpRadius(3, tmpPrecision, tmpRoundingMode);
				var tmpPiRadiusCubed = tmpRadiusCubed.multiply(tmpPi, tmpPrecision, tmpRoundingMode);

				var tmpMass = tmpDensityRatio.multiply(tmpPiRadiusCubed, tmpPrecision, tmpRoundingMode);
				*/

				//console.log('Computed celestial bodies mass: ' + tmpMass);
				return tmpMass;
			}

			// Set the Orbital Solver
			function setOrbitalSolver(pOrbitalSolver)
			{
				// TODO: We should test that it's a valid solver
				_Options.OrbitalSolver = pOrbitalSolver;
			}

			////////// Return Object //////////
			var oCelestialBody = (
			{
				New: oNew,
				Mass: computeMass
			});

			////////// Basic Metadata //////////
			Object.defineProperty(oCelestialBody, 'Name',
			{
				get: function() { return _Options.Name; },
				set: function(pName) { _Options.Name = pName; }
			});

			Object.defineProperty(oCelestialBody, 'X',
			{
				get: function()   { return _Options.X; },
				set: function(pX) { _Options.X = pX; }
			});
			Object.defineProperty(oCelestialBody, 'Y',
			{
				get: function()   { return _Options.Y; },
				set: function(pY) { _Options.X = pY; }
			});

			Object.defineProperty(oCelestialBody, 'Radius',
			{
				get: function()   { return _Options.Radius; },
				set: function(pRadius) { _Options.Radius = pRadius; }
			});
			Object.defineProperty(oCelestialBody, 'Density',
			{
				get: function()   { return _Options.Density; },
				set: function(pDensity) { _Options.Density = pDensity; }
			});

			Object.defineProperty(oCelestialBody, 'OrbitalSolver',
			{
				get: function()   { return _Options.OrbitalSolver; },
				set: function(pOrbitalSolver) { _Options.OrbitalSolver = pOrbitalSolver; }
			});

			Object.defineProperty(oCelestialBody, 'Options',
			{
				get: function()   { return _Options; },
				set: function(pOptions) { _Options = pOptions; }
			});

			////////// This is the "Magic Property" that integrates with the Rendering Subsystem //////////
			Object.defineProperty(oCelestialBody, 'Renderable',
			{
				get: function()   { return _Options.Renderable; },
				set: function(pRenderable) { _Options.Renderable = pRenderable; }
			});

			return oCelestialBody;
		}

		return oNew();
	}
);
