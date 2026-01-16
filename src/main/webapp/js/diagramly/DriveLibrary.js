/**
 * @file DriveLibrary.js - Google Drive Shape Library
 * @description Handles custom shape libraries stored in Google Drive.
 *
 * This class provides:
 * - Save/load shape libraries to Google Drive
 * - Autosave support for library modifications
 * - Integration with Drive file picker
 *
 * DriveLibrary extends DriveFile with library-specific behavior:
 * - Always autosaves (no manual save required)
 * - Uses same Drive API as diagram files
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends DriveFile
 * @see DriveFile.js for base class
 * @see DriveClient.js for API operations
 */

/**
 * Constructs a new DriveLibrary for Google Drive shape libraries.
 *
 * @constructor
 * @extends DriveFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} desc - Google Drive file descriptor.
 */
DriveLibrary = function(ui, data, desc)
{
	DriveFile.call(this, ui, data, desc);
};

//Extends mxEventSource
mxUtils.extend(DriveLibrary, DriveFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveLibrary.prototype.save = function(revision, success, error)
{
	this.ui.drive.saveFile(this, revision, mxUtils.bind(this, function(resp)
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
DriveLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
