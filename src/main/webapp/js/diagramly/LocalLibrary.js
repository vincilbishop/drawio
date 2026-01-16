/**
 * @file LocalLibrary.js - Device-Stored Shape Library
 * @description LocalLibrary handles custom shape libraries stored on the local device.
 *
 * This class provides:
 * - Save/load shape libraries via File System Access API or download
 * - Manual save workflow (no autosave)
 * - File-based library identification
 *
 * LocalLibrary is used when:
 * - User opens a .xml library file from device
 * - User saves library to device storage
 * - Libraries are managed via file system
 *
 * Key difference from StorageLibrary:
 * - Stored on device filesystem, not browser storage
 * - No autosave (requires explicit save action)
 * - Can use File System Access API when available
 *
 * @copyright 2006-2014, JGraph Holdings Ltd
 * @see LocalFile.js for base class
 * @see StorageLibrary.js for browser-stored libraries
 */

/**
 * Constructs a new LocalLibrary for device-stored shape libraries.
 *
 * LocalLibrary extends LocalFile for library-specific behavior:
 * no autosave, file-based hash, empty open() implementation.
 *
 * @constructor
 * @extends LocalFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {string} title - Library filename.
 */
LocalLibrary = function(ui, data, title)
{
	LocalFile.call(this, ui, data, title);
};

//Extends mxEventSource
mxUtils.extend(LocalLibrary, LocalFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalLibrary.prototype.getHash = function()
{
	return 'F' + this.getTitle();
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalLibrary.prototype.isAutosave = function()
{
	return false;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalLibrary.prototype.saveAs = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalLibrary.prototype.updateFileData = function()
{
	// Do nothing
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
LocalLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
