/**
 * @file TrelloLibrary.js - Trello Shape Library
 * @description Handles custom shape libraries stored as Trello attachments.
 *
 * This class provides:
 * - Save/load shape libraries as Trello card attachments
 *
 * TrelloLibrary extends TrelloFile with library-specific behavior:
 * - Direct save without data update
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends TrelloFile
 * @see TrelloFile.js for base class
 * @see TrelloClient.js for API operations
 */

/**
 * Constructs a new TrelloLibrary for Trello shape libraries.
 *
 * @constructor
 * @extends TrelloFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} meta - Trello attachment metadata.
 */
TrelloLibrary = function(ui, data, meta)
{
	TrelloFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(TrelloLibrary, TrelloFile);

/**
 * Overridden to avoid updating data with current file.
 */
TrelloLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
TrelloLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
