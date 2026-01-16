/**
 * @file DesktopLibrary.js - Electron Desktop Shape Library
 * @description DesktopLibrary handles shape libraries in the Electron desktop app.
 *
 * This class provides:
 * - Direct file system access via Electron APIs
 * - File path-based library identification
 * - Native save functionality for libraries
 *
 * DesktopLibrary is used when:
 * - Running draw.io as Electron desktop application
 * - Libraries are opened from local file system
 * - Native file operations are required
 *
 * Key difference from LocalLibrary:
 * - Uses Electron's file system APIs (fileObj.path)
 * - Hash based on file path, not title
 * - Direct native file save capability
 *
 * @copyright 2006-2020, JGraph Holdings Ltd
 * @see LocalLibrary.js for base class
 * @see ElectronApp.js for Electron application integration
 */

/**
 * Constructs a new DesktopLibrary for Electron desktop app.
 *
 * DesktopLibrary stores the file object containing the native
 * file path for direct file system operations.
 *
 * @constructor
 * @extends LocalLibrary
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} fileObj - Native file object from Electron.
 * @param {string} fileObj.name - File name.
 * @param {string} fileObj.path - Full file system path.
 */
DesktopLibrary = function(ui, data, fileObj)
{
	LocalLibrary.call(this, ui, data, fileObj.name);
	this.fileObj = fileObj;
};

//Extends LocalLibrary
mxUtils.extend(DesktopLibrary, LocalLibrary);

/**
 * 
 */
DesktopLibrary.prototype.getHash = function()
{
	return 'S' + encodeURIComponent(this.fileObj.path);
};

/**
 * 
 */
DesktopLibrary.prototype.save = function(revision, success, error)
{
	LocalFile.prototype.saveFile.apply(this, arguments);
};
