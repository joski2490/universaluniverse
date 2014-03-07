/**
* Unit tests for Celestial Bodies
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
	'CelestialBody',
	function()
	{
		var testCelestialBody = false;

		setup
		(
			function()
			{
				testCelestialBody = Requirejs('../scripts/CelestialBody');
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
						Expect(testCelestialBody).to.be.an('object', 'The CelestialBody library should load properly from a require directive.');
					}
				);
				test
				(
					'There should be some basic metadata on the class',
					function()
					{
						Expect(testCelestialBody).to.have.a.property('Name')
						.that.is.a('string')
						.that.is.not.empty;
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
					'Location',
					function()
					{
						Expect(testCelestialBody).to.have.a.property('X')
							.that.is.a('number');
						Expect(testCelestialBody).to.have.a.property('Y')
							.that.is.a('number');
					}
				);
				test
				(
					'Physical Properties',
					function()
					{
						Expect(testCelestialBody).to.have.a.property('Radius')
							.that.is.a('number');
						Expect(testCelestialBody).to.have.a.property('Density')
							.that.is.a('number');
					}
				);
			}
		);

		suite
		(
			'#Mass',
			function()
			{
				test
				(
					'Property Is Valid',
					function()
					{
						Expect(testCelestialBody).to.have.a.property('Mass')
							.that.deep.is.a('function');
						Assert.isNumber(testCelestialBody.Mass(), "mass should always be numeric")
					}
				);
			}
		);
	}
);
