/**
 * @file RemoteFile.js - Remote URL File Access
 * @description RemoteFile handles diagrams loaded from remote URLs.
 *
 * This class provides:
 * - Load diagrams from any URL
 * - Read-only access (cannot save back to URL)
 * - URL-based file identification
 * - Integration with embed/viewer modes
 *
 * RemoteFile is used when:
 * - Diagram is loaded via ?url= parameter
 * - Diagram is embedded from external source
 * - Viewer mode displays remote content
 *
 * Note: RemoteFile is read-only. To save, user must choose
 * a different storage location (local, cloud, etc.).
 *
 * @copyright 2006-2020, JGraph Holdings Ltd
 * @see DrawioFile.js for base class
 * @see GraphViewer.js for view-only mode
 */

/**
 * Constructs a new RemoteFile for URL-based access.
 *
 * RemoteFile loads diagram content from a remote URL. It provides
 * read-only access since the original URL cannot be written to.
 *
 * @constructor
 * @extends DrawioFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - File data loaded from URL.
 * @param {string} title - File title (often derived from URL).
 */
RemoteFile = function(ui, data, title)
{
	DrawioFile.call(this, ui, data);
	
	this.title = title;
	this.mode = null;
};

//Extends mxEventSource
mxUtils.extend(RemoteFile, DrawioFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
RemoteFile.prototype.isAutosave = function()
{
	return false;
};

/**
 * 
 */
RemoteFile.prototype.getMode = function()
{
	return this.mode;
};

/**
 * 
 */
RemoteFile.prototype.getTitle = function()
{
	return this.title;
};

/**
 * 
 */
RemoteFile.prototype.isRenamable = function()
{
	return false;
};

/**
 */
RemoteFile.prototype.open = function()
{
	this.ui.setFileData(this.getData());
	this.installListeners();
};
