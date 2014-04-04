/**
* This file is part of the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description The circular Orbital Solver class for our pseudo-science orbiting body systems.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	//['bigdecimal'],
	//function(bigdecimal)
	['OrbitalSolver'],
	function(OrbitalSolver)
	{
		function oNew()
		{
			var oOrbitalSolverCircular = OrbitalSolver.New();
			oOrbitalSolverCircular.New = oNew;

			// Start with 90deg rotation for now
			oOrbitalSolverCircular.Options.InitialRotation = 0;
			oOrbitalSolverCircular.Options.Rotation = 0;
			oOrbitalSolverCircular.Options.Radius = 1;

			oOrbitalSolverCircular.SolverName = 'Circular';

			function computeLocation(pTime)
			{
				oOrbitalSolverCircular.Options.Rotation = oOrbitalSolverCircular.Options.InitialRotation + (oOrbitalSolverCircular.OrbitalVelocity*pTime);
				return (
				{
					X: oOrbitalSolverCircular.OrbitalCenterX + oOrbitalSolverCircular.Options.Radius * Math.cos(oOrbitalSolverCircular.Options.Rotation),
					Y: oOrbitalSolverCircular.OrbitalCenterY + oOrbitalSolverCircular.Options.Radius * Math.sin(oOrbitalSolverCircular.Options.Rotation)
				});
			}
			oOrbitalSolverCircular.ComputeLocation = computeLocation;

			Object.defineProperty(oOrbitalSolverCircular, 'Radius',
			{
				get: function() { return oOrbitalSolverCircular.Options.Radius; },
				set: function(pRadius) { oOrbitalSolverCircular.Options.Radius = pRadius; }
			});

			return oOrbitalSolverCircular;
		}

		return oNew();
	}
);
