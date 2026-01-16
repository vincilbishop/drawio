/**
 * @file main.js - Application Startup Trigger
 * @description Final script that triggers the application startup after all resources load.
 *
 * This file:
 * - Waits for window load event (non-dev mode)
 * - Signals that window has loaded (mxWinLoaded = true)
 * - Calls checkAllLoaded() to start App.main()
 *
 * Startup Flow:
 * 1. bootstrap.js loads all scripts
 * 2. Scripts set mxScriptsLoaded = true when done
 * 3. This file sets mxWinLoaded = true on window load
 * 4. checkAllLoaded() calls App.main() when both are true
 *
 * Dev Mode:
 * In dev mode (urlParams['dev'] == '1'), App.main() is called
 * immediately without waiting for window load.
 *
 * Confluence Guard:
 * The AJS check prevents this code from running when draw.io
 * is loaded as part of Confluence's batch.js bundle.
 *
 * @copyright 2020-2025, JGraph Holdings Ltd
 * @copyright 2020-2025, draw.io AG
 * @see bootstrap.js for checkAllLoaded() function
 * @see App.js for App.main() implementation
 */
if (typeof AJS === 'undefined') // conf insists on pulling in this file into batch.js for atlas-debug
{
	if (urlParams['dev'] != '1' && typeof document.createElement('canvas').getContext === "function")
	{
		window.addEventListener('load', function()
		{
			mxWinLoaded = true;
			checkAllLoaded();
		});
	}
	else
	{
		App.main();
	}
}
