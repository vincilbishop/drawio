/**
 * @file StorageLibrary.js - Browser-Stored Shape Library
 * @description StorageLibrary handles custom shape libraries stored in browser storage.
 *
 * This class provides:
 * - Save/load shape libraries to IndexedDB/localStorage
 * - Autosave support for library modifications
 * - Special handling for scratchpad (.scratchpad)
 * - Type differentiation from diagram files
 *
 * StorageLibrary is used when:
 * - User creates custom shape libraries stored in browser
 * - Scratchpad stores user-created shapes
 * - Libraries are saved to "Browser" storage option
 *
 * Key difference from StorageFile:
 * - type='L' (Library) vs type='F' (File)
 * - Always autosaves changes
 * - No conflict checking needed
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @see StorageFile.js for base class
 * @see LocalLibrary.js for device-stored libraries
 */

/**
 * Constructs a new StorageLibrary for browser-stored shape libraries.
 *
 * StorageLibrary extends StorageFile with library-specific behavior:
 * autosave enabled, no conflict detection, special scratchpad handling.
 *
 * @constructor
 * @extends StorageFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {string} title - Library title (or ".scratchpad" for scratchpad).
 */
StorageLibrary = function(ui, data, title)
{
	StorageFile.call(this, ui, data, title);
};

//Extends mxEventSource
mxUtils.extend(StorageLibrary, StorageFile);

/**
 * A differentiator of the stored object type (file or lib)
 */
StorageLibrary.prototype.type = 'L';

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Overridden to avoid updating data with current file.
 */
StorageLibrary.prototype.saveAs = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageLibrary.prototype.getHash = function()
{
	return 'L' + encodeURIComponent(this.title);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageLibrary.prototype.getTitle = function()
{
	return (this.title == '.scratchpad') ? mxResources.get('scratchpad') : this.title;
};

/**
 * Overridden to avoid updating data with current file.
 */
StorageLibrary.prototype.isRenamable = function(title, success, error)
{
	return this.title != '.scratchpad';
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
StorageLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
