/**
* This file is part of the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description The Planet Celestial Body class for our pseudo-science orbiting body systems
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	// TODO: Learn how to use external libraries, like bigdecimal, in the browser and node.
	//['OrbitalSolver', 'bigdecimal'],
	//function(bigdecimal)
	['CelestialBody'],
	function(CelestialBody)
	{
		function oNew()
		{
			var oCelestialBodyPlanet = CelestialBody.New();

			return oCelestialBodyPlanet;
		}

		return oNew();
	}
);
