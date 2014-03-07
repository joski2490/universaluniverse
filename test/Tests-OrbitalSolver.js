/**
* Unit tests for the base Orbital Solver
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*/
var Requirejs = require('requirejs');
Requirejs.config
({
	nodeRequire: require,
	baseUrl: __dirname+'/../scripts/' // This is hacky but it's required because the globally installed mocha runs from somewhere else.
});

var Chai = require("chai");
var Expect = Chai.expect;
var Assert = Chai.assert;

suite
(
	'OrbitalSolver',
	function()
	{
		var testOrbitalSolver = false;

		setup
		(
			function()
			{
				testOrbitalSolver = Requirejs('../scripts/OrbitalSolver');
			}
		);

		suite
		(
			'Object Sanity',
			function()
			{
				test
				(
					'The class should initialize itself into a happy little object.',
					function()
					{
						Expect(testOrbitalSolver).to.be.an('object');
					}
				);
				test
				(
					'There should be some basic metadata on the class',
					function()
					{
						Expect(testOrbitalSolver).to.have.a.property('SolverName')
						.that.is.a('string')
						.that.is.not.empty;
						Expect(testOrbitalSolver.SolverName).to.equal('base');
					}
				);
			}
		);

		suite
		(
			'#Metadata',
			function()
			{
				test
				(
					'Orbit Properties',
					function()
					{
						Expect(testOrbitalSolver).to.have.a.property('OrbitalCenterX')
							.that.is.a('number');
						Expect(testOrbitalSolver).to.have.a.property('OrbitalCenterY')
							.that.is.a('number');

						Expect(testOrbitalSolver).to.have.a.property('OrbitalVelocity')
							.that.is.a('number');
					}
				);
			}
		);

		suite
		(
			'#Methods',
			function()
			{
				test
				(
					'OrbitalDistance',
					function()
					{
						Expect(testOrbitalSolver).to.have.a.property('OrbitalDistance');
					}
				)
			}
		);
	}
);
