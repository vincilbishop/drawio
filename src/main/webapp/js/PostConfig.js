/**
 * @file PostConfig.js - Post-Initialization Configuration
 * @description Clears or overrides global variables AFTER init.js loads.
 *
 * This file is loaded late in the bootstrap sequence to:
 * - Disable features not available in self-hosted deployments
 * - Clear server URLs that require licensed services
 *
 * Configuration Variables:
 * - VSS_CONVERT_URL: Visio VSS converter service (null to disable)
 * - EMF_CONVERT_URL: EMF image converter service (null to disable)
 * - ICONSEARCH_PATH: Icon search service path (null to disable)
 *
 * Why Post-Config:
 * Some URLs are set by init.js based on environment detection.
 * This file runs after to override with deployment-specific values.
 *
 * @copyright 2006-2024, JGraph Holdings Ltd
 * @copyright 2006-2024, draw.io AG
 * @see PreConfig.js for pre-init configuration
 * @see bootstrap.js for load sequence
 */
// null'ing of global vars need to be after init.js
window.VSS_CONVERT_URL = null;
window.EMF_CONVERT_URL = null;
window.ICONSEARCH_PATH = null;
