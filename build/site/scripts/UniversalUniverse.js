/**
* This file is the primary controller for the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description The primary container to hold all the objects in the universe.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	['CelestialBody', 'CelestialBody-Planet'],
	function(CelestialBody, CelestialBodyPlanet)
	{
		var _Options = (
		{
			Suns: [],
			Planets: [],
			TimeUnitsPerYear: 1000,
			Time: 0
		});

		function addSun()
		{
			var tmpSun = require('CelestialBody').New();
			_Options.Suns.push(tmpSun);
		}
		function addPlanet()
		{
			// Need to add a clone method here.
			var tmpPlanet = require('CelestialBody-Planet').New();
			_Options.Planets.push(tmpPlanet);
		}

		var oUniversalUniverse = (
		{
			AddSun: addSun,
			AddPlanet: addPlanet
		});

		Object.defineProperty(oUniversalUniverse, 'Suns',
		{
			get: function() { return _Options.Suns; },
			set: function(pSuns) { _Options.Suns = pSuns; }
		});

		Object.defineProperty(oUniversalUniverse, 'Planets',
		{
			get: function() { return _Options.Planets; },
			set: function(pPlanets) { _Options.Planets = pPlanets; }
		});

		////////// Temporal Properties //////////
		Object.defineProperty(oUniversalUniverse, 'Time',
		{
			get: function() { return _Options.Time; },
			set: function(pTime) { _Options.Time = pTime; }
		});
		Object.defineProperty(oUniversalUniverse, 'TimeUnitsPerYear',
		{
			get: function() { return _Options.TimeUnitsPerYear; },
			set: function(pTimeUnitsPerYear) { _Options.TimeUnitsPerYear = pTimeUnitsPerYear; }
		});
		Object.defineProperty(oUniversalUniverse, 'TimeCurrentYear',
		{
			get: function() { return Math.floor(_Options.Time / _Options.TimeUnitsPerYear); }
		});
		Object.defineProperty(oUniversalUniverse, 'TimeCurrentDay',
		{
			get: function() { return _Options.Time % _Options.TimeUnitsPerYear; }
		});

		return oUniversalUniverse;
	}
);
