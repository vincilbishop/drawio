/**
 * @file OneDriveLibrary.js - OneDrive Shape Library
 * @description Handles custom shape libraries stored in OneDrive/SharePoint.
 *
 * This class provides:
 * - Save/load shape libraries to OneDrive/SharePoint
 * - Autosave support for library modifications
 *
 * OneDriveLibrary extends OneDriveFile with library-specific behavior:
 * - Always autosaves (no manual save required)
 * - Uses same Graph API as diagram files
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends OneDriveFile
 * @see OneDriveFile.js for base class
 * @see OneDriveClient.js for API operations
 */

/**
 * Constructs a new OneDriveLibrary for Microsoft shape libraries.
 *
 * @constructor
 * @extends OneDriveFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} meta - Microsoft Graph file metadata.
 */
OneDriveLibrary = function(ui, data, meta)
{
	OneDriveFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(OneDriveLibrary, OneDriveFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveLibrary.prototype.save = function(revision, success, error)
{
	this.ui.oneDrive.saveFile(this, mxUtils.bind(this, function(resp)
	{
		this.desc = resp;
		
		if (success != null)
		{
			success(resp);
		}
	}), error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
OneDriveLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
