/**
 * @file GitHubLibrary.js - GitHub Shape Library
 * @description Handles custom shape libraries stored in GitHub repositories.
 *
 * This class provides:
 * - Save/load shape libraries to GitHub repositories
 * - Commit-based version control
 *
 * GitHubLibrary extends GitHubFile with library-specific behavior:
 * - Direct save without data update
 * - Empty open() implementation (libraries don't render)
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends GitHubFile
 * @see GitHubFile.js for base class
 * @see GitHubClient.js for API operations
 */

/**
 * Constructs a new GitHubLibrary for GitHub shape libraries.
 *
 * @constructor
 * @extends GitHubFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Library data (mxlibrary XML format).
 * @param {Object} meta - GitHub file metadata.
 */
GitHubLibrary = function(ui, data, meta)
{
	GitHubFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(GitHubLibrary, GitHubFile);

/**
 * Overridden to avoid updating data with current file.
 */
GitHubLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
GitHubLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
