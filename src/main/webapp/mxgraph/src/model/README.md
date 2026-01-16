# mxGraph Model Layer

The model layer defines the data structure that represents a graph diagram. It is independent of the visual representation.

## Upstream Documentation

For standard mxGraph model API, see [mxGraphModel](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGraphModel-js.html).

## Files

| File | Class | Purpose |
|------|-------|---------|
| `mxGraphModel.js` | `mxGraphModel` | The root data model containing all cells |
| `mxCell.js` | `mxCell` | A single vertex or edge in the graph |
| `mxGeometry.js` | `mxGeometry` | Position, size, and control points |
| `mxCellPath.js` | `mxCellPath` | Utilities for cell path strings |

## Key Concepts

### mxGraphModel
The central data structure. Key methods:
- `beginUpdate()` / `endUpdate()` - Transaction boundaries for undo
- `add()` / `remove()` - Add/remove cells
- `getRoot()` - Get the root cell
- `getChildCount()` / `getChildAt()` - Navigate hierarchy

### mxCell
Represents a single element:
- Can be a **vertex** (shape) or **edge** (connector)
- Has an `id`, `value` (label/data), `style`, and `geometry`
- Organized in a parent-child hierarchy

### mxGeometry
Stores spatial information:
- `x`, `y`, `width`, `height` for vertices
- `sourcePoint`, `targetPoint`, `points` for edges
- `relative` flag for relative positioning

## Usage Pattern

```javascript
// Create a model
var model = new mxGraphModel();

// Begin a transaction
model.beginUpdate();
try {
    // Add cells
    var parent = model.getRoot();
    var v1 = model.add(parent, new mxCell('Hello'));
    // ... more operations
} finally {
    // End transaction (enables undo)
    model.endUpdate();
}
```

## draw.io Extensions

The draw.io application may extend these classes in:
- `js/grapheditor/Graph.js` - Extended graph model operations
- `js/diagramly/Editor.js` - Application-level model management

## See Also

- `../view/README.md` - Visual representation of the model
- `../io/README.md` - Serialization of the model to XML
