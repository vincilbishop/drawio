/**
 * @file GitLabLibrary.js - GitLab Shape Library
 * @description Handles custom shape libraries stored in GitLab repositories.
 *
 * This class provides:
 * - Save/load shape libraries to GitLab repositories
 * - Commit-based version control
 *
 * GitLabLibrary extends GitLabFile with library-specific behavior:
 * - Direct save without data update
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends GitLabFile
 * @see GitLabFile.js for base class
 * @see GitLabClient.js for API operations
 */

/**
 * Constructs a new GitLabLibrary for GitLab shape libraries.
 *
 * @constructor
 * @extends GitLabFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} meta - GitLab file metadata.
 */
GitLabLibrary = function(ui, data, meta)
{
	GitLabFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(GitLabLibrary, GitLabFile);

/**
 * Overridden to avoid updating data with current file.
 */
GitLabLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
GitLabLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
