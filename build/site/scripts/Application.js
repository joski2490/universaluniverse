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

 @description Main application.
*/
define("OrbitalSolver",[],function(){function b(){var c={SolverName:"base",OrbitalCenterX:0,OrbitalCenterY:0,OrbitalVelocity:0},a={New:b,OrbitalDistance:function(a){return c.OrbitalRadius},ComputeLocation:function(a){return{X:c.OrbitalCenterX,Y:c.OrbitalCenterY}}};Object.defineProperty(a,"SolverName",{get:function(){return c.SolverName},set:function(a){c.SolverName=a}});Object.defineProperty(a,"OrbitalCenterX",{get:function(){return c.OrbitalCenterX},set:function(a){c.OrbitalCenterX=a}});Object.defineProperty(a,
"OrbitalCenterY",{get:function(){return c.OrbitalCenterY},set:function(a){c.OrbitalCenterY=a}});Object.defineProperty(a,"OrbitalVelocity",{get:function(){return c.OrbitalVelocity},set:function(a){c.OrbitalVelocity=a}});Object.defineProperty(a,"Options",{get:function(){return c},set:function(a){c=a}});return a}return b()});
define("CelestialBody",["OrbitalSolver"],function(b){function c(){var a={Name:"Unnamed Celestial Body",X:0,Y:0,Radius:1,Density:1,OrbitalSolver:b,Renderable:!1},d={New:c,Mass:function(){return 4/3*a.Density*3.14159*(a.Radius^3)}};Object.defineProperty(d,"Name",{get:function(){return a.Name},set:function(b){a.Name=b}});Object.defineProperty(d,"X",{get:function(){return a.X},set:function(b){a.X=b}});Object.defineProperty(d,"Y",{get:function(){return a.Y},set:function(b){a.X=b}});Object.defineProperty(d,
"Radius",{get:function(){return a.Radius},set:function(b){a.Radius=b}});Object.defineProperty(d,"Density",{get:function(){return a.Density},set:function(b){a.Density=b}});Object.defineProperty(d,"OrbitalSolver",{get:function(){return a.OrbitalSolver},set:function(b){a.OrbitalSolver=b}});Object.defineProperty(d,"Options",{get:function(){return a},set:function(b){a=b}});Object.defineProperty(d,"Renderable",{get:function(){return a.Renderable},set:function(b){a.Renderable=b}});return d}return c()});
define("CelestialBody-Planet",["CelestialBody"],function(b){return b.New()});
define("UniversalUniverse",["CelestialBody","CelestialBody-Planet"],function(b,c){var a=[],d=[],f=0,g={AddSun:function(){var b=require("CelestialBody").New();a.push(b)},AddPlanet:function(){var a=require("CelestialBody-Planet").New();d.push(a)}};Object.defineProperty(g,"Suns",{get:function(){return a},set:function(b){a=b}});Object.defineProperty(g,"Planets",{get:function(){return d},set:function(a){d=a}});Object.defineProperty(g,"Time",{get:function(){return f},set:function(a){f=a}});return g});
define("OrbitalSolver-Circular",["OrbitalSolver"],function(b){function c(){var a=b.New();a.New=c;a.Options.InitialRotation=0;a.Options.Rotation=0;a.Options.Radius=1;a.SolverName="Circular";a.ComputeLocation=function(b){a.Options.Rotation=a.Options.InitialRotation+a.OrbitalVelocity*b;return{X:a.OrbitalCenterX+a.Options.Radius*Math.cos(a.Options.Rotation),Y:a.OrbitalCenterY+a.Options.Radius*Math.sin(a.Options.Rotation)}};Object.defineProperty(a,"Radius",{get:function(){return a.Options.Radius},set:function(b){a.Options.Radius=
b}});return a}return c()});
define("SceneRenderer",["UniversalUniverse","OrbitalSolver-Circular"],function(b){return{InitializeRenderer:function(){var c=oCanvas.create({canvas:"#canvasUniverse",background:"#000"}),a=c.width/2,d=c.height/2;b.AddSun();b.Suns[0].Radius=30;b.Suns[0].OrbitalSolver.OrbitalCenterX=a;b.Suns[0].OrbitalSolver.OrbitalCenterY=d;var f=b.Suns[0].OrbitalSolver.ComputeLocation(b.Time);b.Suns[0].Renderable=c.display.ellipse({x:f.X,y:f.Y,radius:b.Suns[0].Radius,fill:"#f00"}).add();for(var f=Math.floor(8*Math.random()+
1),g=a/(f+1),k="0123456789abcdef".split(""),e=0;e<f;e++){b.AddPlanet();b.Planets[e].X=(e+1)*g;b.Planets[e].Radius=12*Math.random()+7;b.Planets[e].OrbitalSolver=require("OrbitalSolver-Circular").New();b.Planets[e].OrbitalSolver.OrbitalCenterX=a;b.Planets[e].OrbitalSolver.OrbitalCenterY=d;b.Planets[e].OrbitalSolver.Radius=b.Planets[e].X;b.Planets[e].OrbitalSolver.OrbitalVelocity=0.1*Math.random();var h=b.Planets[e].OrbitalSolver.ComputeLocation(0);b.Planets[e].Renderable=c.display.ellipse({x:h.X,y:h.Y,
radius:b.Planets[e].Radius,fill:"#"+k[Math.floor(17*Math.random())]+k[Math.floor(17*Math.random())]+k[Math.floor(17*Math.random())]}).add()}c.bind("click tap",function(){c.timeline[c.timeline.running?"stop":"start"]()});c.setLoop(function(){b.Time++;for(var a=0;a<b.Planets.length;a++)h=b.Planets[a].OrbitalSolver.ComputeLocation(b.Time),b.Planets[a].Renderable.moveTo(h.X,h.Y)})}}});require(["SceneRenderer"],function(b){b.InitializeRenderer()});define("Application",function(){});
