/**
 * @file webcola.js - WebCola Constraint Layout Plugin
 * @description Integrates WebCola library for automatic constraint-based layout.
 *
 * This plugin provides:
 * - Constraint-based automatic layout
 * - Force-directed positioning
 * - Overlap prevention
 * - Edge routing optimization
 *
 * WebCola Integration:
 * - Loads cola.min.js (WebCola library)
 * - mxWebColaAdaptor.js adapts mxGraph to WebCola format
 * - mxWebColaLayout.js implements the layout algorithm
 *
 * Layout Features:
 * - Respects edge constraints
 * - Minimizes edge crossings
 * - Prevents node overlaps
 * - Supports animated transitions
 *
 * Usage:
 * - Arrange > WebCola Layout
 * - Applies to entire diagram or selected cells
 *
 * @copyright 2020-2025, JGraph Holdings Ltd
 * @copyright 2020-2025, draw.io AG
 * @see https://ialab.it.monash.edu/webcola/ for WebCola documentation
 * @see trees/trees.js for tree-specific layout
 */
Draw.loadPlugin(function(ui)
{
	mxscript("plugins/webcola/cola.min.js", null, null, null, true);
	mxscript("plugins/webcola/mxWebColaAdaptor.js", null, null, null, true);
	mxscript("plugins/webcola/mxWebColaLayout.js", null, null, null, true);
	
	// Adds resource for action
	mxResources.parse('webColaLayout=WebCola Layout...');

	// Adds action
	ui.actions.addAction('webColaLayout', function()
	{
		// TODO: set mxWebColaAdaptor's doAnimations to the value of editorUi.allowAnimation
		// TODO: don't record all animation steps as undo states
		var graph = ui.editor.graph;
		var layout = new mxWebColaLayout(graph);
		var parent = graph.getDefaultParent(); 
		layout.execute(parent);
	});
	
	var menu = ui.menus.get('layout');
	
	if (menu != null)
	{
		var oldFunct = menu.funct;
		
		menu.funct = function(menu, parent)
		{
			oldFunct.apply(this, arguments);
			
			if (typeof window.mxWebColaLayout === 'function')
			{
				ui.menus.addMenuItems(menu, ['-', 'webColaLayout'], parent);
			}
		};
	}
});
