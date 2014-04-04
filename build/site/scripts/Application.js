/*
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description The base Orbital Solver class for our pseudo-science orbiting body systems.

 Solvers will include: base, circular, elliptical, potentially more bizzare ones.
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description The base Celestial Body class for our pseudo-science orbiting body systems
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description The Planet Celestial Body class for our pseudo-science orbiting body systems
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description The primary container to hold all the objects in the universe.
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description The circular Orbital Solver class for our pseudo-science orbiting body systems.
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description A simple renderer to glue our graphics lib (currently oCanvas) to our test model.
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description Main application backbone routes!.
     MIT
 @copyright   Copyright (c) 2014, Mutination

 @author      Steven Velozo <steven@mutination.com>

 @description Main application.
*/
define("OrbitalSolver",[],function(){function d(){var b={SolverName:"base",OrbitalCenterX:0,OrbitalCenterY:0,OrbitalVelocity:0},a={New:d,OrbitalDistance:function(a){return b.OrbitalRadius},ComputeLocation:function(a){return{X:b.OrbitalCenterX,Y:b.OrbitalCenterY}}};Object.defineProperty(a,"SolverName",{get:function(){return b.SolverName},set:function(a){b.SolverName=a}});Object.defineProperty(a,"OrbitalCenterX",{get:function(){return b.OrbitalCenterX},set:function(a){b.OrbitalCenterX=a}});Object.defineProperty(a,
"OrbitalCenterY",{get:function(){return b.OrbitalCenterY},set:function(a){b.OrbitalCenterY=a}});Object.defineProperty(a,"OrbitalVelocity",{get:function(){return b.OrbitalVelocity},set:function(a){b.OrbitalVelocity=a}});Object.defineProperty(a,"Options",{get:function(){return b},set:function(a){b=a}});return a}return d()});
define("CelestialBody",["OrbitalSolver"],function(d){function b(){var a={Name:"Unnamed Celestial Body",X:0,Y:0,Radius:1,Density:1,OrbitalSolver:d,Renderable:!1},e={New:b,Mass:function(){return 4/3*a.Density*3.14159*(a.Radius^3)}};Object.defineProperty(e,"Name",{get:function(){return a.Name},set:function(b){a.Name=b}});Object.defineProperty(e,"X",{get:function(){return a.X},set:function(b){a.X=b}});Object.defineProperty(e,"Y",{get:function(){return a.Y},set:function(b){a.X=b}});Object.defineProperty(e,
"Radius",{get:function(){return a.Radius},set:function(b){a.Radius=b}});Object.defineProperty(e,"Density",{get:function(){return a.Density},set:function(b){a.Density=b}});Object.defineProperty(e,"OrbitalSolver",{get:function(){return a.OrbitalSolver},set:function(b){a.OrbitalSolver=b}});Object.defineProperty(e,"Options",{get:function(){return a},set:function(b){a=b}});Object.defineProperty(e,"Renderable",{get:function(){return a.Renderable},set:function(b){a.Renderable=b}});return e}return b()});
define("CelestialBody-Planet",["CelestialBody"],function(d){return d.New()});
define("UniversalUniverse",["CelestialBody","CelestialBody-Planet"],function(d,b){var a=[],e=[],k=1E3,f=0,g={AddSun:function(){var b=require("CelestialBody").New();a.push(b)},AddPlanet:function(){var a=require("CelestialBody-Planet").New();e.push(a)}};Object.defineProperty(g,"Suns",{get:function(){return a},set:function(b){a=b}});Object.defineProperty(g,"Planets",{get:function(){return e},set:function(a){e=a}});Object.defineProperty(g,"Time",{get:function(){return f},set:function(a){f=a}});Object.defineProperty(g,
"TimeUnitsPerYear",{get:function(){return k},set:function(a){k=a}});Object.defineProperty(g,"TimeCurrentYear",{get:function(){return Math.floor(f/k)}});Object.defineProperty(g,"TimeCurrentDay",{get:function(){return f%k}});return g});
define("OrbitalSolver-Circular",["OrbitalSolver"],function(d){function b(){var a=d.New();a.New=b;a.Options.InitialRotation=0;a.Options.Rotation=0;a.Options.Radius=1;a.SolverName="Circular";a.ComputeLocation=function(b){a.Options.Rotation=a.Options.InitialRotation+a.OrbitalVelocity*b;return{X:a.OrbitalCenterX+a.Options.Radius*Math.cos(a.Options.Rotation),Y:a.OrbitalCenterY+a.Options.Radius*Math.sin(a.Options.Rotation)}};Object.defineProperty(a,"Radius",{get:function(){return a.Options.Radius},set:function(b){a.Options.Radius=
b}});return a}return b()});
define("SceneRenderer",["UniversalUniverse","OrbitalSolver-Circular"],function(d){function b(){function a(){g=f.width/2;l=f.height/2;e()}function e(){for(var a=0;a<c.Suns.length;a++)c.Suns[a].OrbitalSolver.OrbitalCenterX=g,c.Suns[a].OrbitalSolver.OrbitalCenterY=l;for(a=0;a<c.Planets.length;a++)c.Planets[a].OrbitalSolver.OrbitalCenterX=g,c.Planets[a].OrbitalSolver.OrbitalCenterY=l;k()}function k(){for(var a=0;a<c.Suns.length;a++){var b=c.Suns[a].OrbitalSolver.ComputeLocation(c.Time);c.Suns[a].Renderable.moveTo(b.X,
b.Y)}for(a=0;a<c.Planets.length;a++)b=c.Planets[a].OrbitalSolver.ComputeLocation(c.Time),c.Planets[a].Renderable.moveTo(b.X,b.Y);$(".UUUniverseYears").text(c.TimeCurrentYear);$(".UUUniverseDays").text(c.TimeCurrentDay.toFixed(2))}var f=!1,g=0,l=0,c=d,m=0,n={New:b,InitializeRenderer:function(){f=oCanvas.create({canvas:"#UUCanvasUniverse",background:"#000"});a();c.AddSun();c.Suns[0].Radius=30;c.Suns[0].Renderable=f.display.ellipse({radius:c.Suns[0].Radius,fill:"#f13"}).add();for(var b=Math.floor(8*
Math.random()+1),d=g/(b+1),l="0123456789abcdef".split(""),h=0;h<b;h++)c.AddPlanet(),c.Planets[h].X=(h+1)*d,c.Planets[h].Radius=12*Math.random()+7,c.Planets[h].OrbitalSolver=require("OrbitalSolver-Circular").New(),c.Planets[h].OrbitalSolver.Radius=c.Planets[h].X,c.Planets[h].OrbitalSolver.OrbitalVelocity=0.1*Math.random(),c.Planets[h].Renderable=f.display.ellipse({radius:c.Planets[h].Radius,fill:"#"+l[Math.floor(17*Math.random())]+l[Math.floor(17*Math.random())]+l[Math.floor(17*Math.random())]}).add();
e();f.setLoop(function(){0!==m&&(c.Time+=m,k())});f.timeline.start()},UpdateCanvasDimensions:a,UpdateUniverseOrbits:e,UpdateBodyLocations:k};Object.defineProperty(n,"TimeShift",{get:function(){return m},set:function(a){m=a;console.log("Timeshift set to "+m)}});Object.defineProperty(n,"Time",{get:function(){return c.Time},set:function(a){c.Time=a}});return n}return b()});
define("ApplicationRoutes",[],function(){var d;return{Initialize:function(b){d=Backbone.Router.extend({routes:{"":"displayOrrery",orrery:"displayOrrery",log:"displayLog",backfast:"goFastBackward",back:"goBackward",pause:"goPause",forward:"goForward",forwardfast:"goFastForward"},displayOrrery:function(){},displayLog:function(){},goFastBackward:function(){b.TimeShift=-1},goBackward:function(){b.TimeShift=-0.1},goPause:function(){b.TimeShift=0},goForward:function(){b.TimeShift=0.1},goFastForward:function(){b.TimeShift=
1}});new d;Backbone.history.start();return!0}}});define("Application",["SceneRenderer","ApplicationRoutes"],function(d,b){var a=d.New();a.InitializeRenderer();b.Initialize(a)});
