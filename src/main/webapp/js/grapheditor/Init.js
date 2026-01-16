/**
 * @file Init.js - Graph Editor Initialization
 * @description Entry point and global configuration for the draw.io graph editor.
 *
 * This file sets up global configuration variables that control the editor's
 * behavior, including:
 * - URL endpoints for save/export operations
 * - Resource paths for stencils, images, and styles
 * - Security configuration for HTML sanitization (DOMPurify)
 * - mxGraph base paths and language settings
 *
 * These variables can be overridden before loading this file to customize
 * the editor for different deployment environments.
 *
 * @copyright 2006-2021, JGraph Holdings Ltd
 * @copyright 2006-2021, draw.io AG
 * @see README.md for grapheditor module overview
 * @see ../diagramly/Init.js for application-level initialization
 */

// Why: urlParams may be null when the editor is embedded in another application
// (e.g., Confluence, VS Code extension). We need a fallback empty object to
// prevent errors when checking URL parameters.
window.urlParams = window.urlParams || {};

// Public global variables
window.DOM_PURIFY_CONFIG = window.DOM_PURIFY_CONFIG ||
    {ADD_TAGS: ['use', 'foreignObject'], FORBID_TAGS: ['form'],
    ALLOWED_URI_REGEXP: /^((?!javascript:).)*$/i,
    HTML_INTEGRATION_POINTS: {'foreignobject': true},
    ADD_ATTR: ['target', 'content', 'pointer-events',
        'requiredFeatures']};
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;

// URLs for save and export
window.EXPORT_URL = window.EXPORT_URL || '/export';
window.SAVE_URL = window.SAVE_URL || '/save';
window.OPEN_URL = window.OPEN_URL || '/open';
window.RESOURCES_PATH = window.RESOURCES_PATH || 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + '/grapheditor';
window.STENCIL_PATH = window.STENCIL_PATH || 'stencils';
window.IMAGE_PATH = window.IMAGE_PATH || 'images';
window.STYLE_PATH = window.STYLE_PATH || 'styles';
window.CSS_PATH = window.CSS_PATH || 'styles';
window.OPEN_FORM = window.OPEN_FORM || 'open.html';

// Sets the base path, the UI language via URL param and configures the
// supported languages to avoid 404s. The loading of all core language
// resources is disabled as all required resources are in grapheditor.
// properties. Note that in this example the loading of two resource
// files (the special bundle and the default bundle) is disabled to
// save a GET request. This requires that all resources be present in
// each properties file since only one file is loaded.
window.mxBasePath = window.mxBasePath || 'mxgraph';
window.mxImageBasePath = window.mxImageBasePath || 'mxgraph/images';
window.mxLanguage = window.mxLanguage || urlParams['lang'];
window.mxLanguages = window.mxLanguages || ['de', 'se'];
