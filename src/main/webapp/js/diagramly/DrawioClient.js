/**
 * @file DrawioClient.js - Cloud Service Client Base Class
 * @description Base class for all cloud storage service integrations.
 *
 * This class provides:
 * - OAuth token management (storage, retrieval, clearing)
 * - User session management
 * - Persistent token storage (localStorage/sessionStorage/cookies)
 * - Event-based user change notifications
 *
 * DrawioClient is the abstract base for:
 * - DriveClient (Google Drive)
 * - DropboxClient (Dropbox)
 * - OneDriveClient (Microsoft OneDrive/SharePoint)
 * - GitHubClient (GitHub repositories)
 * - GitLabClient (GitLab repositories)
 * - TrelloClient (Trello cards)
 *
 * Each cloud service client extends this class and implements
 * service-specific authentication and API methods.
 *
 * @copyright 2006-2017, JGraph Holdings Ltd
 * @extends mxEventSource
 * @see DriveClient.js, DropboxClient.js, OneDriveClient.js
 * @see GitHubClient.js, GitLabClient.js, TrelloClient.js
 */

/**
 * Constructs a new DrawioClient base instance.
 *
 * Initializes token storage and retrieves any persisted authentication token.
 * Subclasses call this constructor with their specific cookie name.
 *
 * @constructor
 * @extends mxEventSource
 * @param {EditorUi} editorUi - The EditorUi instance.
 * @param {string} cookieName - Name for token storage (e.g., 'gDriveAuthInfo').
 */
DrawioClient = function(editorUi, cookieName)
{
	mxEventSource.call(this);

	this.ui = editorUi;
	this.cookieName = cookieName;
	this.token = this.getPersistentToken();
};

// Extends mxEventSource
mxUtils.extend(DrawioClient, mxEventSource);

/**
 * Token for the current user.
 */
DrawioClient.prototype.token = null;

/**
 * Token for the current user.
 */
DrawioClient.prototype.user = null;

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DrawioClient.prototype.setUser = function(user)
{
	this.user = user;
	this.fireEvent(new mxEventObject('userChanged'));
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DrawioClient.prototype.getUser = function()
{
	return this.user;
};

/**
 * 
 */
DrawioClient.prototype.clearPersistentToken = function()
{
	if (isLocalStorage)
	{
		localStorage.removeItem('.' + this.cookieName);
		sessionStorage.removeItem('.' + this.cookieName);
	}
	else if (typeof(Storage) != 'undefined')
	{
		var expiration = new Date();
		expiration.setYear(expiration.getFullYear() - 1);
		document.cookie = this.cookieName + '=; expires=' + expiration.toUTCString();
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DrawioClient.prototype.getPersistentToken = function(trySessionStorage)
{
	var token = null;
	
	if (isLocalStorage)
	{
		token = localStorage.getItem('.' + this.cookieName);
		
		if (token == null && trySessionStorage)
		{
			token = sessionStorage.getItem('.' + this.cookieName);
		}
	}
	
	if (token == null && typeof(Storage) != 'undefined')
	{
		var cookies = document.cookie;
		var name = this.cookieName + '=';
		var start = cookies.indexOf(name);
	
		if (start >= 0)
		{
			start += name.length;
			var end = cookies.indexOf(';', start);
		    
			if (end < 0)
			{
				end = cookies.length;
			}
			else
			{
				postCookie = cookies.substring(end);
		    }
	
			var value = cookies.substring(start, end);
			token = (value.length > 0) ? value : null;
			
			if (token != null && isLocalStorage)
			{
				// Moves to local storage
				var expiry = new Date();
				expiry.setYear(expiry.getFullYear() - 1);
				document.cookie = name + '; expires=' + expiry.toUTCString();
				localStorage.setItem('.' + this.cookieName, token);
			}
		}
	}
	
	return token;
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DrawioClient.prototype.setPersistentToken = function(token, sessionOnly)
{
	try
	{
		if (token != null)
		{
			if (isLocalStorage)
			{
				if (sessionOnly)
				{
					sessionStorage.setItem('.' + this.cookieName, token);
				}
				else 
				{
					localStorage.setItem('.' + this.cookieName, token);
				}
			}
			else if (typeof(Storage) != 'undefined')
			{
				var expiration = new Date();
				expiration.setYear(expiration.getFullYear() + 10);
				var cookie = this.cookieName + '=' + token + '; path=/' + (sessionOnly? '' : '; expires=' + expiration.toUTCString());
		
				if (document.location.protocol.toLowerCase() == 'https')
				{
					cookie = cookie + ';secure';
				}
		
				document.cookie = cookie;
			}
		}
		else
		{
			this.clearPersistentToken();
		}
	}
	catch (e)
	{
		this.ui.handleError(e);
	}
};
