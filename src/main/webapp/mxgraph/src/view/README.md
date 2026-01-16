# mxGraph View Layer

The view layer handles the visual representation and rendering of the graph model.

## Upstream Documentation

For standard mxGraph view API, see [mxGraph](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html).

## Files

| File | Class | Purpose |
|------|-------|---------|
| `mxGraph.js` | `mxGraph` | **Main class** - Combines model, view, and handlers |
| `mxGraphView.js` | `mxGraphView` | Manages cell states and view validation |
| `mxCellRenderer.js` | `mxCellRenderer` | Renders cells to SVG/HTML |
| `mxCellState.js` | `mxCellState` | Runtime state of a rendered cell |
| `mxStylesheet.js` | `mxStylesheet` | Style definitions |
| `mxCellOverlay.js` | `mxCellOverlay` | Overlay icons on cells |
| `mxOutline.js` | `mxOutline` | Minimap/overview panel |
| `mxMultiplicity.js` | `mxMultiplicity` | Connection validation rules |
| `mxLayoutManager.js` | `mxLayoutManager` | Automatic layout execution |
| `mxSwimlaneManager.js` | `mxSwimlaneManager` | Swimlane management |
| `mxTemporaryCellStates.js` | `mxTemporaryCellStates` | Temporary states for preview |
| `mxCellEditor.js` | `mxCellEditor` | In-place label editing |
| `mxCellHighlight.js` | - | Cell highlighting (imported from handler) |
| `mxConnectionConstraint.js` | `mxConnectionConstraint` | Connection port definitions |
| `mxGraphSelectionModel.js` | `mxGraphSelectionModel` | Selection management |
| `mxPerimeter.js` | `mxPerimeter` | Perimeter point calculations |
| `mxPrintPreview.js` | `mxPrintPreview` | Print preview functionality |
| `mxEdgeStyle.js` | `mxEdgeStyle` | Edge routing styles |
| `mxStyleRegistry.js` | `mxStyleRegistry` | Style function registry |

## Key Concepts

### mxGraph
The main class that brings everything together:
- Owns the `mxGraphModel` (data)
- Owns the `mxGraphView` (rendering)
- Manages selection, editing, connections
- Fires events for all graph changes

### mxGraphView
Manages the visual state:
- Creates `mxCellState` objects for visible cells
- Handles zoom and translation
- Validates and redraws on changes

### mxCellState
Runtime rendering state:
- Computed bounds and style
- Shape instance reference
- Label bounds

### mxCellRenderer
Creates DOM elements for cells:
- Creates shape instances
- Manages labels and overlays
- Handles redraw on state changes

## Class Hierarchy in draw.io

```
mxGraph (this file)
    |
    v
js/grapheditor/Graph.js (extends mxGraph)
    |
    v
js/diagramly/ Graph extensions
```

## Key Methods (mxGraph)

| Method | Purpose |
|--------|---------|
| `insertVertex()` | Add a new vertex |
| `insertEdge()` | Add a new edge |
| `getSelectionCells()` | Get selected cells |
| `setCellStyles()` | Apply style changes |
| `refresh()` | Redraw entire graph |
| `getModel()` | Access the data model |

## draw.io Extensions

draw.io significantly extends mxGraph in `js/grapheditor/Graph.js`:
- Custom shape registration
- Extended styling options
- Additional editing capabilities
- Integration with draw.io toolbars

## See Also

- `../model/README.md` - Data structure documentation
- `../handler/README.md` - User interaction handlers
- `../shape/README.md` - Shape rendering
