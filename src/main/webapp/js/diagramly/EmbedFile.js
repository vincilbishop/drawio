/**
 * @file EmbedFile.js - Embedded Diagram File Handler
 * @description EmbedFile handles diagrams embedded in external applications.
 *
 * This class provides:
 * - Base class for embedded diagram integration
 * - Communication bridge between draw.io and host application
 * - Support for two-way data synchronization
 * - Mode indicator for embed context
 *
 * EmbedFile is used when:
 * - draw.io is embedded in another application via iframe
 * - Third-party integrations need diagram editing capability
 * - Custom implementations require file abstraction
 *
 * Note: This is a minimal base class. Integrators should extend this
 * class to implement features like real-time collaboration, custom
 * save handlers, and application-specific functionality.
 *
 * @copyright 2020, JGraph Holdings Ltd
 * @see DrawioFile.js for base class
 * @see embed.html for embed entry point
 */

/**
 * Constructs a new EmbedFile for embedded diagram editing.
 *
 * EmbedFile provides a minimal file abstraction for embedded contexts.
 * Integrators typically extend this class to add custom save/load logic.
 *
 * @constructor
 * @extends DrawioFile
 * @param {EditorUi} ui - The EditorUi instance.
 * @param {string} data - Initial diagram data (XML content).
 * @param {Object} [desc={}] - File descriptor with optional title property.
 */
EmbedFile = function(ui, data, desc)
{
	DrawioFile.call(this, ui, data);
	
	this.desc = desc || {};
	this.mode = App.MODE_EMBED;
};

//Extends DrawioFile
mxUtils.extend(EmbedFile, DrawioFile);

EmbedFile.prototype.getMode = function()
{
	return this.mode;
};

EmbedFile.prototype.getTitle = function()
{
	return this.desc.title || '';
};

//This class need to be implemented by integrations if some file features like real-time collaboration is needed
