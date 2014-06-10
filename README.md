# Universal Universe

Copyright (c) 2014 Steven Velozo

The Universal Universe Simulator is an environment for modeling celestial bodies with gravity, mass, weight and other physical properties.  This is not meant to be a perfect or accurate simulation of rotation and gravity, but instead a playground to build systems that are usable within the context of computer games.

It also provided a fun framework for setting up a site using node tools and gulp, including livereload and complex compilation scripts.

![Universal Universe Site](https://github.com/stevenvelozo/universaluniverse/raw/master/screenshots/UU.png)

## Setting Things Up
New to node?  Check out this repository, download node.js and go to this folder.  Type the following command:
```$ npm install```

And node will automagically download a ton of crap to allow you to build and run the simulator.

## Running the Simulator

The system runs by executing the following command from the project root folder:
```$ npm start```

Which will serve a page at http://localhost:9999/ containing the Universe Simulation.

If you wish to get fancy about where it serves from, you can run:
```$ node UniversalUniverseSimulator.js -p 6000```

Which will serve a page at http://localhost:6000/ for your viewing pleasure.  If you click on the universe box, the planets even spin!  Reload for more random universes.

## Logging and Hacking

There is a real-time back-end and front-end log system, so anything the simulator does can easily write entries to a rolling log display on a tab in the web page.  These entries can also be written to files or other appenders, if you like that sort of thing.

![Universal Universe Log](https://github.com/stevenvelozo/universaluniverse/raw/master/screenshots/UU-Log.png)

## Unit Testing

The point of this sandbox project is to create an extensible framework and model to build on.  To this end there are unit tests for our celestial objects and solvers.  We are using the delightful mocha and chai testing frameworks to do human-readable assertions.  To spool your environment up for running these you need to install mocha in your node global repository with:
```$ npm install -g mocha```

After node does its thing, you can run:
```$ npm test```

## Building

Building the sandbox uses the new gulp stream-based task runner.  In order to build this project you will need to install gulp in your node global repository with:
```$ npm install -g gulp```

After that there are a number of neat things you can do.  Each of the commands in the following table are expected to be run from the project root directory:

Command | Action Taken
----|----
gulp | run jslint linter and the unit tests
gulp clean | clean the build folder
gulp build | build the site with compilation, minification, etc.
gulp build-debug | build the site with all the javascript intact
gulp watch-lint | watch the scripts/ folder for file changes and automatically run the linter
gulp watch-test | watch the scripts/ folder for file changes and automatically run the unit tests
gulp watch-scriptcompile-debug | watch the scripts/ folder for file changes and automatically update the built site with the debug version of them

What this magic allows us is to open a few terminals on our second environment and have a live environment with code linting and unit tests out of the box.  Gulp is pretty awesome!  There are some other commands you can pass it, which are found in the gulpfile.js within the root of this repository.