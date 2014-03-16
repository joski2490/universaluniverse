/**
* This file is part of the Universal Universe test environment.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description This is the gulp build file to test the javascript and generate the site.
*/



////////////////////////////////////////////////////////////////////
////////////////////////   GLOBAL MODULES   ////////////////////////
//================================================================//

var Gulp = require('gulp');
var Rename = require('gulp-rename');
var Clean = require('gulp-clean');
var Concat = require('gulp-concat');
var Exec = require('gulp-exec');
var Nodemon = require('gulp-nodemon');

// Underscore for Map functions and templating
var _JS = require('underscore');



////////////////////////////////////////////////////////////////////
////////////////////////   CONFIGURATION    ////////////////////////
//================================================================//

/********************************************************
 * Magic Paths Global
 */
var Path = {};
Path.Application = './UniversalUniverseSimulator.js';
Path.Tests = {Mocha: './test/*.js'};
Path.Build =
	{
		Destination: './build/site/'
	};
Path.Scripts =
	{
		Source: './scripts/**.*',
		Destination: Path.Build.Destination + 'scripts/'
	};
// External dependencies...
Path.Dependencies =
	{
		Source: './dependencies/',
		Destination: Path.Build.Destination + 'dependencies/'
	};
Path.Dependencies.Output =
	{
		ocanvas: 'js/ocanvas.js',
		require: 'js/require.js',
		underscore: 'js/underscore.js',
		pure: 'css/pure.css',
		jquery: 'js/jquery.js',
		backbone: 'js/backbone.js',
		moment: '../scripts/moment.js' // Hacky?  Maybe.  Moment is a requirejs compatible dependency though!
	}
Path.Dependencies.Input =
	{
		ocanvas: Path.Dependencies.Source + 'ocanvas/ocanvas-2.6.0.min.js',
		require: Path.Dependencies.Source + 'requirejs/require-2.1.11.min.js',
		underscore: Path.Dependencies.Source + 'underscore/underscore-min.js',
		pure: Path.Dependencies.Source + 'pure/pure-min.css',
		jquery: Path.Dependencies.Source + 'jquery/jquery-2.1.0.min.js',
		backbone: Path.Dependencies.Source + 'backbone/backbone-min.js',
		moment: Path.Dependencies.Source + 'moment/moment-with-langs.min.js'
	}
Path.Dependencies.InputDebug =
	{
		ocanvas: Path.Dependencies.Source + 'ocanvas/ocanvas-2.6.0.js',
		require: Path.Dependencies.Source + 'requirejs/require-2.1.11.js',
		underscore: Path.Dependencies.Source + 'underscore/underscore.js',
		pure: Path.Dependencies.Source + 'pure/pure.css',
		jquery: Path.Dependencies.Source + 'jquery/jquery-2.1.0.js',
		backbone: Path.Dependencies.Source + 'backbone/backbone.js',
		moment: Path.Dependencies.Source + 'moment/moment-with-langs.js'
	}
Path.Site =
	{
		Source: './html/**/*.*',
		Destination: Path.Build.Destination
	};
Path.CSS =
	{
		Source: './less/**/*.less',
		Destination: Path.Build.Destination + 'css/'
	};
Path.Icons =
	{
		Source: './assets/icons/'
	};
Path.Icons.File = Path.Icons.Source + 'style.css';
Path.Icons.Destination = Path.Icons.Source + 'staged/';
Path.Icons.Font = Path.Icons.Source + 'fonts/*.*';
Path.Icons.FontDestination = Path.Icons.Destination + 'fonts/';
Path.Assets =
	{
		Source: './assets/',
		Destination: Path.Build.Destination + 'assets/'
	};
Path.Assets.Output =
	{
		fonts: 'fonts',
		icons: 'icons'
	};
Path.Assets.Input =
	{
		fonts: Path.Assets.Source + 'fonts/**/*.*',
		icons: Path.Assets.Source + 'icons/staged/**/*.*',
	};



////////////////////////////////////////////////////////////////////
//////////////////////// Run the Application ///////////////////////
//================================================================//

/********************************************************
 * TASK: Run the server, use nodemon to reload on change
 */
Gulp.task
(
	'run',
	function ()
	{
		Nodemon
		(
			{
				script: Path.Application,
				ext: 'js'
			}
		)
		.on('change', ['lint'])
		.on
		(
			'restart',
			function ()
			{
				console.log('The Node server has restarted!');
			}
		)
	}
);



////////////////////////////////////////////////////////////////////
//////////////////////// TESTS & VALIDATORS ////////////////////////
//================================================================//

/********************************************************
 * TASK: Run all unit tests
 */
Gulp.task
(
	'test',
	function()
	{
		var Mocha = require('gulp-mocha');

		// Execute tasks
		Gulp.src(Path.Tests.Mocha)
			.pipe
			(
				Mocha
				({
					ui: 'tdd',
					reporter: 'spec'
				})
			)
			.on
			(
				'error',
				function()
				{
					console.log('Something blew up during unit tests.');
				}
			);
	}
);

/********************************************************
 * TASK: Run all unit tests with the brief reporter
 */
Gulp.task
(
	'test-brief',
	function()
	{
		var Mocha = require('gulp-mocha');

		// Execute tasks
		Gulp.src(Path.Tests.Mocha)
			.pipe
			(
				Mocha
				({
					ui: 'tdd'
				})
			)
			.on
			(
				'error',
				function()
				{
					console.log('Something blew up during unit tests.');
				}
			);
	}
);

/********************************************************
 * TASK: Lint the JS with jshint
 */
Gulp.task
(
	'lint',
	function()
	{
		var JSHint = require('gulp-jshint');

		Gulp.src(Path.Scripts.Source)
			.pipe(JSHint())
			.pipe(JSHint.reporter('jshint-stylish'));
	}
);



////////////////////////////////////////////////////////////////////
////////////////////////    SITE CLEANUP    ////////////////////////
//================================================================//

/********************************************************
 * TASK: Clean the build directory
 */
Gulp.task
(
	'clean',
	function()
	{
		Gulp.src(Path.Build.Destination, {read: false})
			.pipe(Clean());
	}
);

/********************************************************
 * TASK: Clean the build scripts directory
 */
Gulp.task
(
	'clean-scripts',
	function()
	{
		Gulp.src(Path.Scripts.Destination, {read: false})
			.pipe(Clean());
	}
);

////////////////////////////////////////////////////////////////////
////////////////////////     SITE BUILD     ////////////////////////
//================================================================//

/********************************************************
 * TASK: Compile CSS with the less compiler and minify
 */
Gulp.task
(
	'less',
	function ()
	{
		var Less = require('gulp-less');
		var MinifyCSS = require('gulp-minify-css')
		Gulp.src(Path.CSS.Source)
			.pipe(Less())
			.pipe(MinifyCSS
					(
					{
						// * for keeping all (default), 1 for keeping first one, 0 for removing all
						keepSpecialComments: 1,
						keepBreaks: false,
						removeEmpty: true,
						debug: false
					}
					))
			.on
			(
				'error',
				function()
				{
					console.log('Something blew up during Less CSS compilation.');
				}
			)
			.pipe(Gulp.dest(Path.CSS.Destination));
	}
);

/********************************************************
 * TASK: Compile CSS with the less compiler
 */
Gulp.task
(
	'less-debug',
	function ()
	{
		var Less = require('gulp-less');
		Gulp.src(Path.CSS.Source)
			.pipe(Less())
		.on
			(
				'error',
				function()
				{
					console.log('Something blew up during Less CSS compilation.');
				}
			)
			.pipe(Gulp.dest(Path.CSS.Destination));
	}
);

/********************************************************
 * TASK: Copy the Site (HTML)
 */
Gulp.task
(
	'site-copy',
	function ()
	{
		var Template = require('gulp-template');
		Gulp.src(Path.Site.Source)
			.pipe(Template({ Debug: false }))
			.pipe(Gulp.dest(Path.Site.Destination));
	}
);

/********************************************************
 * TASK: Copy the Site (HTML) in debug mode
 */
Gulp.task
(
	'site-copy-debug',
	function ()
	{
		var Template = require('gulp-template');
		Gulp.src(Path.Site.Source)
			.pipe(Template({ Debug: true }))
			.pipe(Gulp.dest(Path.Site.Destination));
	}
);

/********************************************************
 * TASK: Stage the icons
 */
Gulp.task
(
	'icons-stage',
	function ()
	{
		Gulp.src(Path.Icons.File)
			.pipe(Gulp.dest(Path.Icons.Destination));
		Gulp.src(Path.Icons.Font)
			.pipe(Gulp.dest(Path.Icons.FontDestination));
	}
);

/********************************************************
 * TASK: Copy Assets
 */
Gulp.task
(
	'asset-copy',
	function ()
	{
		// Basic sentence: ForEach ASSET_TO_OUTPUT Copy ASSET_SOURCE While Renaming to ASSET_OUTPUT_NAME
		for (var tmpAssetName in Path.Assets.Output)
			if (typeof(Path.Assets.Input[tmpAssetName]) === 'undefined')
				// Show a message maybe that this asset isn't supported.
				console.log('Asset '+tmpAssetName+' is in list of expected outputs without a valid input.');
			else
				Gulp.src(Path.Assets.Input[tmpAssetName])
					.pipe(Gulp.dest(Path.Assets.Destination + Path.Assets.Output[tmpAssetName]));
	}
);

/********************************************************
 * TASK: Copy Dependencies
 */
Gulp.task
(
	'dependencies',
	function ()
	{
		// Basic sentence: ForEach DEPENDENCY_TO_OUTPUT Copy DEPENDENCY_SOURCE While Renaming to DEPENDENCY_OUTPUT_NAME
		for (var tmpDependencyName in Path.Dependencies.Output)
			if (typeof(Path.Dependencies.Input[tmpDependencyName]) === 'undefined')
				// Show a message maybe that this dependency isn't supported.
				console.log('Dependency '+tmpDependencyName+' is in list of expected outputs without a valid input.');
			else
				// This allows us to skip dependencies that are debug only.
				if (Path.Dependencies.Input[tmpDependencyName])
					Gulp.src(Path.Dependencies.Input[tmpDependencyName])
						.pipe(Rename(Path.Dependencies.Output[tmpDependencyName]))
						.pipe(Gulp.dest(Path.Dependencies.Destination));
	}
);

/********************************************************
 * TASK: Copy Dependencies (debug mode)
 *
 * TODO: This *could* fall back on the non debug dependencies.  Do we want it to?
 */
Gulp.task
(
	'dependencies-debug',
	function ()
	{
		// Basic sentence: ForEach DEPENDENCY_TO_OUTPUT Copy DEPENDENCY_SOURCE While Renaming to DEPENDENCY_OUTPUT_NAME
		for (var tmpDependencyName in Path.Dependencies.Output)
			if (typeof(Path.Dependencies.Input[tmpDependencyName]) === 'undefined')
				// Show a message maybe that this dependency isn't supported.
				console.log('Dependency '+tmpDependencyName+' is in list of expected outputs without a valid debug input.');
			else
				// This allows us to skip dependencies that are release only.
				if (Path.Dependencies.InputDebug[tmpDependencyName])
					Gulp.src(Path.Dependencies.InputDebug[tmpDependencyName])
						.pipe(Rename(Path.Dependencies.Output[tmpDependencyName]))
						.pipe(Gulp.dest(Path.Dependencies.Destination));
	}
);

/********************************************************
 * TASK: Build the scripts
 */
Gulp.task
(
	'scriptcompile',
	function()
	{
		var Requirejs = require('gulp-requirejs');
		var ClosureCompiler = require('gulp-closure-compiler');

		// Here we use Require's compiler, which is out of pattern for this gulp stuff.
		Requirejs
			({
				name: 'Application',
				baseUrl: './scripts/',
				out: 'Application-compiled.js',
				shim: { }
			})
			.pipe(Gulp.dest(Path.Scripts.Destination))
			// Then pump that temporary file through the Closure Compiler.
			.pipe(ClosureCompiler())
			// Then save that to the minified conjoined file to a new filename.
			.pipe(Rename('Application.js'))
			.pipe(Gulp.dest(Path.Scripts.Destination))
			// Clean up after the dirty, dirty Require compiler.
			// BECAUSE GULP IS ASYNC, IT IS THIS OR A LOT OF BOILERPLATE.
			// This move should have a name like "gulpy pipe stream twiddle cleanup"
			.pipe(Rename('Application-compiled.js'))
			.pipe(Clean());
	}
);

/********************************************************
 * TASK: Build the scripts with debug info.
 */
Gulp.task
(
	'scriptcompile-debug',
	function()
	{
		// Use the "copy compiler" in debug mode.  Yay for Requirejs.
		Gulp.src(Path.Scripts.Source)
			.pipe(Gulp.dest(Path.Scripts.Destination));
	}
);




////////////////////////////////////////////////////////////////////
////////////////////////  SITE BUILD META   ////////////////////////
//================================================================//

/********************************************************
 * TASK: Build and stage the full application
 */
Gulp.task
(
	'build',
	['less', 'site-copy', 'asset-copy', 'dependencies', 'scriptcompile']
);

/********************************************************
 * TASK: Clean, then build and stage the full application
 */
Gulp.task
(
	'build-clean',
	['clean'],
	function (pCallback)
	{
		// Until I see a pattern for build-clean that works, it seems gulp has
		//   taken the "javascript" way a little far.
		// This is a hack.
		var RunSequence = require('run-sequence');

		RunSequence
			(
				'build',
				pCallback
			);
	}
);

/********************************************************
 * TASK: Build and stage the full application for debug
 */
Gulp.task
(
	'build-debug',
	['less-debug', 'site-copy-debug', 'asset-copy', 'dependencies-debug', 'scriptcompile-debug']
);



////////////////////////////////////////////////////////////////////
////////////////////////  THE DEFAULT TASK  ////////////////////////
//================================================================//
Gulp.task ('default', ['test', 'lint']);



////////////////////////////////////////////////////////////////////
//////////////////////// AUTOMATIC WATCHERS ////////////////////////
//================================================================//

/********************************************************
 * TASK: Auto unit test on save
 */
Gulp.task
(
	'watch-test',
	function()
	{
		Gulp.watch(Path.Scripts.Source, ['test']);
	}
);

/********************************************************
 * TASK: Auto unit test on save
 */
Gulp.task
(
	'watch-test-brief',
	function()
	{
		Gulp.watch(Path.Scripts.Source, ['test-brief']);
	}
);

/********************************************************
 * TASK: Auto lint on save
 */
Gulp.task
(
	'watch-lint',
	function()
	{
		Gulp.watch(Path.Scripts.Source, ['lint']);
	}
);

/********************************************************
 * TASK: Auto debug-build on save
 */
Gulp.task
(
	'watch-scriptcompile-debug',
	function()
	{
		Gulp.watch(Path.Scripts.Source, ['scriptcompile-debug']);
	}
);

/********************************************************
 * TASK: Auto build the site/assets on save and livereload
 */
Gulp.task
(
	'watch-livesite',
	function()
	{
		var tmpAssetPathArray = _JS.map
		(
			Path.Assets.Input,
			function (pValue, pKey, pList)
			{
				return [pValue];
			}
		);
		var tmpSitePath = tmpAssetPathArray.concat([Path.CSS.Source, Path.Site.Source]);
		Gulp.watch(tmpSitePath, ['less-debug', 'site-copy-debug', 'asset-copy']);
	}
);

Gulp.task
(
	'watch-livereload',
	function()
	{
		var LiveReload = require('gulp-livereload');
		var LiveReloadServer = LiveReload();
		Gulp.watch('build/**')
			.on
			(
				'change',
				function(pFile)
				{
					LiveReloadServer.changed(pFile.path);
				}
			);
	}
);

////////////////////////////////////////////////////////////////////
////////////////////////   WATCHERS META    ////////////////////////
//================================================================//

/********************************************************
 * TASK: Do all the copying and magic when files change
 */
Gulp.task
(
	'develop',
	['watch-scriptcompile-debug', 'watch-livesite', 'watch-livereload', 'run']
);


