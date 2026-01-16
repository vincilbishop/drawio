/**
 * @file UrlLibrary.js - Remote URL Shape Library
 * @description UrlLibrary handles read-only shape libraries loaded from remote URLs.
 *
 * This class provides:
 * - Load shape libraries from any URL
 * - Read-only access (cannot save back to URL)
 * - Display-friendly filename extraction from URL path
 * - URL-based library identification
 *
 * UrlLibrary is used when:
 * - Custom shape libraries are hosted remotely
 * - Third-party libraries are loaded via URL parameter
 * - Shared libraries are distributed via HTTP
 *
 * Note: UrlLibrary is read-only. The library content is loaded
 * from the URL but cannot be modified or saved back.
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @see StorageFile.js for base class
 * @see RemoteLibrary.js for cloud-service remote libraries
 */

/**
 * Constructs a new UrlLibrary for URL-loaded shape libraries.
 *
 * UrlLibrary loads library content from a URL and provides
 * read-only access. The filename is extracted from the URL path.
 *
 * @constructor
 * @extends StorageFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data loaded from URL.
 * @param {string} title - Full URL of the library.
 */
UrlLibrary = function(ui, data, title)
{
	StorageFile.call(this, ui, data, title);
	
	var fname = title;
	var last = fname.lastIndexOf('/');
		
	if (last >= 0)
	{
		fname = fname.substring(last + 1);
	}
	
	this.fname = fname;
};

//Extends mxEventSource
mxUtils.extend(UrlLibrary, StorageFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
UrlLibrary.prototype.getHash = function()
{
	return 'U' + encodeURIComponent(this.title);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
UrlLibrary.prototype.getTitle = function()
{
	return this.fname;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
UrlLibrary.prototype.isAutosave = function()
{
	return false;
};

/**
 * Overridden to avoid updating data with current file.
 */
UrlLibrary.prototype.isEditable = function(title, success, error)
{
	return false;
};

/**
 * Overridden to avoid updating data with current file.
 */
UrlLibrary.prototype.saveAs = function(title, success, error)
{
	// Cannot be saved
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
UrlLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
