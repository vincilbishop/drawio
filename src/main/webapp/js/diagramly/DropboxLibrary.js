/**
 * @file DropboxLibrary.js - Dropbox Shape Library
 * @description Handles custom shape libraries stored in Dropbox.
 *
 * This class provides:
 * - Save/load shape libraries to Dropbox
 * - Autosave support for library modifications
 *
 * DropboxLibrary extends DropboxFile with library-specific behavior:
 * - Always autosaves (no manual save required)
 * - Uses same Dropbox API as diagram files
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends DropboxFile
 * @see DropboxFile.js for base class
 * @see DropboxClient.js for API operations
 */

/**
 * Constructs a new DropboxLibrary for Dropbox shape libraries.
 *
 * @constructor
 * @extends DropboxFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} stat - Dropbox file metadata.
 */
DropboxLibrary = function(ui, data, stat)
{
	DropboxFile.call(this, ui, data, stat);
};

//Extends mxEventSource
mxUtils.extend(DropboxLibrary, DropboxFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Overridden to avoid updating data with current file.
 */
DropboxLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
DropboxLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
