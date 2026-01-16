/**
 * @file DrawioUser.js - User Identity Model
 * @description Represents a user in draw.io for collaboration and cloud services.
 *
 * This class provides:
 * - User identity storage
 * - Display information for UI
 * - Locale for internationalization
 * - Profile picture URL
 *
 * DrawioUser is used for:
 * - Cloud service authentication (Google, Microsoft, etc.)
 * - Real-time collaboration (user presence, cursors)
 * - File ownership and sharing
 * - Comment authorship
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @see DrawioClient.js for authentication
 * @see P2PCollab.js for collaboration
 */

/**
 * Constructs a new DrawioUser with identity information.
 *
 * Represents a user from any cloud storage service or
 * local authentication system.
 *
 * @constructor
 * @param {string} id - Unique user ID from the storage system.
 * @param {string} email - User's email address.
 * @param {string} displayName - User's display name for UI.
 * @param {string} pictureUrl - URL to user's profile picture.
 * @param {string} locale - User's locale/country code (e.g., 'en-US').
 */
DrawioUser = function(id, email, displayName, pictureUrl, locale)
{
	// Unique ID of the user for the current storage system
	this.id = id;
	
	// Email address of the user
	this.email = email;
	
	// Display name of the user
	this.displayName = displayName;
	
	// URL to an image of the user
	this.pictureUrl = pictureUrl;
	
	// country code locale of the user
	this.locale = locale;
};
