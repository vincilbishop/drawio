/**
 * @file DrawioFilePolling.js - File Change Detection via Polling
 * @description Provides polling-based synchronization for file changes.
 *
 * This class provides:
 * - Periodic polling to detect remote file changes
 * - Adaptive polling intervals (faster when activity detected)
 * - Automatic merge of remote changes into local file
 * - Status updates for collaborative editing indicators
 *
 * DrawioFilePolling is used when:
 * - Real-time sync (P2P/WebSocket) is not available
 * - File backend only supports polling (e.g., some cloud services)
 * - Detecting changes across browser tabs for StorageFile
 *
 * Polling Strategy:
 * - Starts with configurable max delay
 * - Reduces to minPollDelay when activity detected
 * - Gradually increases back to maxDelay during inactivity
 * - Retries on error with exponential backoff
 *
 * @copyright 2006-2024, draw.io AG
 * @see DrawioFileSync.js for real-time synchronization
 * @see DrawioFile.js for file abstraction
 */

/**
 * Constructs a new DrawioFilePolling instance.
 *
 * Polls the file's backend for changes and merges them when detected.
 * Works with any DrawioFile that supports getLatestVersionId().
 *
 * @constructor
 * @param {DrawioFile} file - The file to poll for changes.
 * @param {DrawioFileSync} sync - The sync instance for status updates.
 */
DrawioFilePolling = function(file, sync)
{
    this.file = file;
    this.sync = sync;

};

/**
 * Maximum number if attempts to poll after an error.
 */
DrawioFilePolling.prototype.maxRetries = 2;

/**
 * The minimum delay between polls for adaptive polling.
 */
DrawioFilePolling.prototype.minPollDelay = 2000;

/**
 * Starts the polling with the given delay.
 */
DrawioFilePolling.prototype.start = function(delay)
{
    if (!this.isConnected())
    {
        this.maxDelay = delay;
        this.delay = delay;

        var threadFn = mxUtils.bind(this, function()
        {
            this.poll(0, nextFn);
        });

        var nextFn = mxUtils.bind(this, function()
        {
            // To get adaptive polling, we use timeout instead of interval
            this.thread = setTimeout(threadFn, this.delay);
            this.delay = Math.min(this.maxDelay, this.delay + 2000); // TODO this or this.delay * 2
        });

        nextFn();

        EditorUi.debug('DrawioFilePolling.start', [this],
            'thread', this.thread, 'delay', delay,
            'rev', this.file.getCurrentRevisionId());
    }
};

/**
 * Checks if the file has been modified.
 */
DrawioFilePolling.prototype.updateStatus = function()
{
    if (this.hasOtherWriters())
    {
        this.sync.lastMessage = mxResources.get('otherUsersEditing');
    }

    this.sync.lastModified = this.file.getLastModifiedDate();
    this.sync.updateStatus();
};

/**
 * Checks if the file has been modified.
 */
DrawioFilePolling.prototype.poll = function(retry, nextFn)
{
    retry = (retry != null) ? retry : 0;

    var handleError = mxUtils.bind(this, function(e)
    {
        if (retry < this.maxRetries)
        {
            this.retryPoll(mxUtils.bind(this, function()
            {
                this.poll(retry + 1, nextFn);
            }));
        }
        else
        {
            nextFn();
        }
    });

    this.file.getLatestVersionId(mxUtils.bind(this, function(latestVersionId)
    {
        if (latestVersionId != -1)
        {
            var currentVersionId = this.file.getCurrentRevisionId();

            if (latestVersionId != currentVersionId)
            {
                this.file.getLatestVersion(mxUtils.bind(this, function(latestFile)
                {
                    this.file.mergeFile(latestFile, mxUtils.bind(this, function()
                    {
                        // An update is detected, so start adaptive polling
                        this.delay = this.minPollDelay;
                        this.lastOtherWriter = Date.now();
                        this.updateStatus();
                        nextFn();
                    }), handleError);
                }), handleError);
            }
            else
            {
                this.updateStatus();
                nextFn();
            }
        }
        else
        {
            nextFn();
        }
        
    }), handleError);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFilePolling.prototype.retryPoll = function(fn)
{
	var delay = 300 + Math.random() * 300;
	window.setTimeout(fn, delay);
	
	EditorUi.debug('StorageFile.retryPoll', [this], 'delay', delay);
};

/**
 * Stops the polling.
 */
DrawioFilePolling.prototype.stop = function()
{
    EditorUi.debug('DrawioFilePolling.stop',
        [this], 'thread', this.thread);
    
    clearTimeout(this.thread);
    this.thread = null;
};

/**
 * Returns true if polling is active.
 */
DrawioFilePolling.prototype.isConnected = function()
{
    return this.thread != null;
};

DrawioFilePolling.prototype.hasOtherWriters = function()
{
    return this.lastOtherWriter != null && Date.now() - this.lastOtherWriter < 60 * 1000; // Other writer detected in the last minute
};
