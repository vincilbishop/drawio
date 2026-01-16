# mxGraph Handlers

Handlers manage user interaction with the graph - selection, movement, connection creation, and editing.

## Upstream Documentation

For standard mxGraph handler API, see [mxGraphHandler](https://jgraph.github.io/mxgraph/docs/js-api/files/handler/mxGraphHandler-js.html).

## Files

| File | Class | Purpose |
|------|-------|---------|
| `mxGraphHandler.js` | `mxGraphHandler` | Handles moving/cloning cells |
| `mxConnectionHandler.js` | `mxConnectionHandler` | Creates new edges by dragging |
| `mxConstraintHandler.js` | `mxConstraintHandler` | Manages connection points |
| `mxVertexHandler.js` | `mxVertexHandler` | Selection handles for vertices |
| `mxEdgeHandler.js` | `mxEdgeHandler` | Selection handles for edges |
| `mxElbowEdgeHandler.js` | `mxElbowEdgeHandler` | Handles for elbow connectors |
| `mxEdgeSegmentHandler.js` | `mxEdgeSegmentHandler` | Handles for segmented edges |
| `mxSelectionCellsHandler.js` | `mxSelectionCellsHandler` | Manages handlers for selection |
| `mxRubberband.js` | `mxRubberband` | Rectangle selection |
| `mxHandle.js` | `mxHandle` | Custom handles for shapes |
| `mxKeyHandler.js` | `mxKeyHandler` | Keyboard shortcuts |
| `mxPanningHandler.js` | `mxPanningHandler` | Pan/scroll with mouse |
| `mxPopupMenuHandler.js` | `mxPopupMenuHandler` | Right-click context menus |
| `mxTooltipHandler.js` | `mxTooltipHandler` | Tooltip display |
| `mxCellHighlight.js` | `mxCellHighlight` | Highlight cells (drop targets, etc.) |
| `mxCellMarker.js` | `mxCellMarker` | Mark cells during operations |
| `mxCellTracker.js` | `mxCellTracker` | Track mouse over cells |

## Key Concepts

### mxGraphHandler
Handles cell movement:
- Drag to move selected cells
- Ctrl+drag to clone
- Previews during drag
- Snapping to grid

### mxConnectionHandler
Creates new connections:
- Start from source cell/port
- Preview line while dragging
- Validate target cell
- Create edge on release

### mxVertexHandler / mxEdgeHandler
Selection handles:
- Resize handles for vertices
- Bend point handles for edges
- Rotation handle (if enabled)

### mxRubberband
Rectangle selection:
- Click and drag to select area
- Selects all cells in rectangle

## Handler Lifecycle

```
1. Mouse down detected
2. Handler.start() - Begin operation
3. Mouse move events
4. Handler.mouseMove() - Update preview
5. Mouse up detected
6. Handler.mouseUp() - Complete operation
7. Handler.reset() - Clean up
```

## draw.io Modifications

draw.io customizes handlers in `js/grapheditor/`:
- Extended connection behavior
- Custom handle styles
- Additional keyboard shortcuts
- Modified drag-drop behavior

## Common Patterns

### Custom Connection Ports
```javascript
// mxConstraintHandler works with mxConnectionConstraint
// to define fixed connection points on shapes
```

### Keyboard Shortcuts
```javascript
// mxKeyHandler binds keys to actions
// draw.io extends this in Actions.js
```

## See Also

- `../view/README.md` - View layer that handlers interact with
- `../shape/README.md` - Shapes that handlers manipulate
- `../../js/grapheditor/Actions.js` - draw.io action handlers
