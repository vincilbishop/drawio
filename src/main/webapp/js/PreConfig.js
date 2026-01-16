/**
 * @file PreConfig.js - Pre-Initialization Configuration
 * @description Sets global configuration variables BEFORE draw.io libraries load.
 *
 * This file is loaded early in the bootstrap sequence to configure:
 * - Build type (public vs enterprise)
 * - Server URLs for export, PlantUML, etc.
 * - Base URLs for deployment
 * - Custom draw.io configuration
 *
 * Configuration Variables:
 * - DRAWIO_PUBLIC_BUILD: true for open-source builds
 * - EXPORT_URL: Server endpoint for image export
 * - PLANT_URL: PlantUML server for diagram generation
 * - DRAWIO_BASE_URL: Base path for deployment
 * - DRAWIO_VIEWER_URL: Path to viewer.min.js
 * - DRAWIO_LIGHTBOX_URL: URL for lightbox viewing
 * - DRAW_MATH_URL: Path to MathJax library
 * - DRAWIO_CONFIG: Custom configuration object
 *
 * Self-Hosted Deployment:
 * Replace placeholder values with your own server URLs
 * when deploying draw.io to your own infrastructure.
 *
 * @see https://www.drawio.com/doc/faq/configure-diagram-editor
 *
 * @copyright 2006-2024, JGraph Holdings Ltd
 * @copyright 2006-2024, draw.io AG
 * @see bootstrap.js for load sequence
 * @see PostConfig.js for post-init configuration
 */
// Overrides of global vars need to be pre-loaded
window.DRAWIO_PUBLIC_BUILD = true;
window.EXPORT_URL = 'REPLACE_WITH_YOUR_IMAGE_SERVER';
window.PLANT_URL = 'REPLACE_WITH_YOUR_PLANTUML_SERVER';
window.DRAWIO_BASE_URL = null; // Replace with path to base of deployment, e.g. https://www.example.com/folder
window.DRAWIO_VIEWER_URL = null; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
window.DRAWIO_LIGHTBOX_URL = null; // Replace with your lightbox URL, eg. https://www.example.com
window.DRAW_MATH_URL = 'math4/es5';
window.DRAWIO_CONFIG = null; // Replace with your custom draw.io configurations. For more details, https://www.drawio.com/doc/faq/configure-diagram-editor
urlParams['sync'] = 'manual';
