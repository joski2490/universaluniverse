/**
* This file is part of the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description The base Orbital Solver class for our pseudo-science orbiting body systems.
*
* Solvers will include: base, circular, elliptical, potentially more bizzare ones.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	//['bigdecimal'],
	//function(bigdecimal)
	function()
	{
		function oNew()
		{
			var _Options = (
			{
				SolverName: 'base',

				OrbitalCenterX: 0.0,
				OrbitalCenterY: 0.0,

				OrbitalVelocity: 0.0
			});

			// This function computes the Orbital distance from the universe centerpoint
			// at a given time in the universal time stream.
			function computeOrbitalDistance(pTime)
			{
				// Because we are a circular orbit, we are always the same distance from centerpoint
				return _Options.OrbitalRadius;
			}

			// Compute the centerpoint of an orbiting body at a given time in Universe Time Units
			function computeLocation(pTime)
			{
				return (
				{
					X: _Options.OrbitalCenterX,
					Y: _Options.OrbitalCenterY
				});
			}

			var oOrbitalSolver = (
			{
				New: oNew,
				OrbitalDistance: computeOrbitalDistance,
				ComputeLocation: computeLocation
			});

			Object.defineProperty(oOrbitalSolver, 'SolverName',
			{
				get: function() { return _Options.SolverName; },
				set: function(pSolverName) { _Options.SolverName = pSolverName; }
			});

			Object.defineProperty(oOrbitalSolver, 'OrbitalCenterX',
			{
				get: function() { return _Options.OrbitalCenterX; },
				set: function(pOrbitalCenterX) { _Options.OrbitalCenterX = pOrbitalCenterX; }
			});
			Object.defineProperty(oOrbitalSolver, 'OrbitalCenterY',
			{
				get: function() { return _Options.OrbitalCenterY; },
				set: function(pOrbitalCenterY) { _Options.OrbitalCenterY = pOrbitalCenterY; }
			});

			Object.defineProperty(oOrbitalSolver, 'OrbitalVelocity',
			{
				get: function() { return _Options.OrbitalVelocity; },
				set: function(pOrbitalVelocity) { _Options.OrbitalVelocity = pOrbitalVelocity; }
			});

			Object.defineProperty(oOrbitalSolver, 'Options',
			{
				get: function() { return _Options; },
				set: function(pOptions) { _Options = pOptions; }
			});

			return oOrbitalSolver;
		}

		return oNew();
	}
);
