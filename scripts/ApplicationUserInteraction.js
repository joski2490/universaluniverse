/**
* This file is the bridge between the main application and the DOM
*
* @license     MIT
* @copyright   Copyright (c) 2014, Mutination
*
* @author      Steven Velozo <steven@mutination.com>
*
* @description Main application UX/UI code.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	["moment"],
	function(Moment)
	{
		// So we don't create this object every time, cache it.
		var _LogEntryTemplate = _.template($('#LogEntryTemplate').text());

		// Append a message to the log entries div
		function writeLogDelegate(pMessage, pLevel)
		{
			$("#LogEntries")
				.append
				(
					_LogEntryTemplate
					(
						Message =
						{
							Time: Moment().format("YYYY-MM-DD HH:mm:ss.ssss"),
							Body: pMessage
						}
					)
				);
		}

		var oApplicationUserInteraction = (
		{
			WriteLogDelegate: writeLogDelegate
		});

		return oApplicationUserInteraction;
	}
);