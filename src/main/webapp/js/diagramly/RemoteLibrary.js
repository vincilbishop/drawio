/**
 * @file RemoteLibrary.js - Cloud Service Remote Shape Library
 * @description RemoteLibrary handles read-only shape libraries from cloud services.
 *
 * This class provides:
 * - Load shape libraries from cloud storage services
 * - Read-only access (library managed by remote service)
 * - Library object metadata (id, title, downloadUrl)
 * - JSON-encoded hash for library identification
 *
 * RemoteLibrary is used when:
 * - Shape libraries are loaded from Google Drive, Dropbox, etc.
 * - Third-party cloud-hosted libraries are integrated
 * - Enterprise libraries are distributed via cloud services
 *
 * Note: RemoteLibrary is read-only. Changes cannot be saved
 * back to the remote location. The library object contains
 * metadata needed to re-fetch the library content.
 *
 * @copyright 2006-2020, JGraph Holdings Ltd
 * @see LocalFile.js for base class
 * @see UrlLibrary.js for URL-based remote libraries
 */

/**
 * Constructs a new RemoteLibrary for cloud-hosted shape libraries.
 *
 * RemoteLibrary stores library metadata (libObj) to enable
 * re-fetching and identification across sessions.
 *
 * @constructor
 * @extends LocalFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} libObj - Library metadata object.
 * @param {string} libObj.id - Unique identifier from cloud service.
 * @param {string} libObj.title - Display title for the library.
 * @param {string} libObj.downloadUrl - URL to fetch library content.
 */
RemoteLibrary = function(ui, data, libObj)
{
	RemoteFile.call(this, ui, data, libObj.title);
	this.libObj = libObj;
};

//Extends mxEventSource
mxUtils.extend(RemoteLibrary, LocalFile);

/**
 * 
 */
RemoteLibrary.prototype.getHash = function()
{
	return 'R' + encodeURIComponent(JSON.stringify([this.libObj.id, this.libObj.title, this.libObj.downloadUrl])); //Using an array to get the same order in all platforms
};

/**
 * 
 */
RemoteLibrary.prototype.isEditable = function()
{
	return false;
};
/**
 * 
 */
RemoteLibrary.prototype.isRenamable = function()
{
	return false;
};

/**
 * 
 */
RemoteLibrary.prototype.isAutosave = function()
{
	return false;
};

/**
 * 
 */
RemoteLibrary.prototype.save = function(revision, success, error)
{
	// Do nothing
};

/**
 * 
 */
RemoteLibrary.prototype.saveAs = function(title, success, error)
{
	// Do nothing
};

/**
 * 
 */
RemoteLibrary.prototype.updateFileData = function()
{
	// Do nothing
};

/**
 */
RemoteLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
