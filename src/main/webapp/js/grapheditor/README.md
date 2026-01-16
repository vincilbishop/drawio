# Graph Editor Components

This directory contains the core graph editor UI components that extend the mxGraph library to provide the draw.io editing experience. These files form the foundation layer between raw mxGraph and the full draw.io application.

## Architecture Overview

```
mxGraph (mxgraph/src/)
    |
    v
js/grapheditor/  <-- THIS LAYER
    |-- Graph.js      extends mxGraph
    |-- Editor.js     extends mxEventSource
    |-- EditorUi.js   orchestrates UI
    |
    v
js/diagramly/    (extends these further)
```

## File Overview

| File | Size | Class | Purpose |
|------|------|-------|---------|
| `Init.js` | 2KB | - | **Entry point** - Global configuration and URL parameters |
| `Editor.js` | 134KB | `Editor` | Core editor class with undo/redo and file management |
| `Graph.js` | 436KB | `Graph` | Extended mxGraph with draw.io-specific features |
| `EditorUi.js` | 177KB | `EditorUi` | UI container orchestrating toolbar, sidebar, format panel |
| `Actions.js` | 54KB | `Actions` | Command pattern implementation for all user actions |
| `Menus.js` | 57KB | `Menus` | Menu definitions and popup menu handlers |
| `Toolbar.js` | 20KB | `Toolbar` | Toolbar button definitions and state management |
| `Sidebar.js` | 170KB | `Sidebar` | Shape palette base class and drag-drop support |
| `Format.js` | 218KB | `Format` | Style/format panel for editing cell properties |
| `Shapes.js` | 237KB | - | Custom shape definitions and registration |
| `Dialogs.js` | 102KB | Various | Modal dialog components |

## Class Hierarchy

```
mxEventSource
    |-- Editor (grapheditor)
            |-- Editor (js/diagramly/, extends)

mxGraph
    |-- Graph (grapheditor)
            |-- Graph (js/diagramly/, extends)

EditorUi (standalone class)
    |-- EditorUi (js/diagramly/, extends)
```

## Key Classes

### Editor
The core editor class managing:
- Graph instance
- Undo/redo via `mxUndoManager`
- Filename and modified state
- Status bar messages
- Autosave coordination

### Graph
Extended mxGraph providing:
- Custom cell editing behavior
- Enhanced selection handling
- draw.io-specific styling
- Connection port management
- Custom shape rendering

### EditorUi
UI orchestration including:
- Toolbar creation and management
- Sidebar/shape palette
- Format panel
- Menu bar and context menus
- Dialog management
- File operations (save, open, export)

### Actions
Command pattern implementation:
```javascript
// Actions are registered by name
this.actions.get('save').funct();
this.actions.get('undo').funct();

// Add new action
this.addAction('myAction', function() { ... });
```

## Key Patterns

### Event System
Uses mxGraph event system with custom events:
```javascript
editor.addListener('statusChanged', function(sender, evt) {
    // Handle status change
});
```

Custom events include:
- `statusChanged` - Editor status updates
- `fileLoaded` - New file opened
- `autosaveChanged` - Autosave toggle
- `resetGraphView` - View reset

### Action Pattern
All user-triggered operations go through Actions:
```javascript
// In Actions.js
this.addAction('copy', function() {
    mxClipboard.copy(ui.editor.graph);
});

// Trigger from menu/toolbar
editorUi.actions.get('copy').funct();
```

### Style Application
Styles are applied through the format panel:
```javascript
// Format.js handles style changes
graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#ffffff', cells);
```

## Configuration (Init.js)

Global configuration variables:
- `EXPORT_URL` - Server endpoint for export
- `SAVE_URL` - Server endpoint for save
- `RESOURCES_PATH` - Path to resource files
- `STENCIL_PATH` - Path to stencil XML files
- `mxBasePath` - Base path for mxGraph resources
- `DOM_PURIFY_CONFIG` - HTML sanitization config

## Dependencies

- **mxGraph** (`mxgraph/`) - Core graph library
- **DOMPurify** - HTML sanitization for labels

## Extended By

This layer is extended by `js/diagramly/` to create the full draw.io application:
- `diagramly/Editor.js` extends `Editor`
- `diagramly/EditorUi.js` extends `EditorUi`
- `diagramly/Graph.js` extends `Graph` (via prototype)
- `diagramly/Menus.js` extends `Menus`

## See Also

- `../diagramly/README.md` - Application layer documentation
- `../../mxgraph/README.md` - mxGraph library documentation
- `Shapes.js` - Shape registration (see inline docs)
