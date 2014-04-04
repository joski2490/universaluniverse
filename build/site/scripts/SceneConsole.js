/**
* This file is a basic console logging system, with the ability to output to a DIV from a template.
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description Basic logging with "levels" to be pushed back out to logging objects.
*
*              NOTE: This is not using the factory new object pattern that the rest of these
*                    requirejs modules are defined with because it is expected to act somewhat
*                    "global".
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	[],
	function()
	{
		// LogLevel 0 is ultra quiet.  Higher is noisier.
		var _LogLevel = 0;

		// Write Log Entries to the Console
		var _WriteToConsole = true;

		// Extra Log Output Function Pointer
		var _WriteLogDelegate = false;

		function writeLog(pMessage, pLevel)
		{
			if (_LogLevel < ((typeof(pLevel) === 'undefined') ? 0 : pLevel)) return;

			if (_WriteToConsole)
				console.log(pMessage);

			if (_WriteLogDelegate)
				_WriteLogDelegate(pMessage, pLevel);
		}

		var oSceneConsole = (
		{
			WriteLog: writeLog,
			log: writeLog
		});

		Object.defineProperty(oSceneConsole, 'WriteLogDelegate',
		{
			get: function() { return _WriteLogDelegate; },
			set: function(pWriteLogDelegate) { _WriteLogDelegate = pWriteLogDelegate; }
		});

		return oSceneConsole;
	}
);