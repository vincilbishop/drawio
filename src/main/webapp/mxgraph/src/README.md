# mxGraph Source Modules

This directory contains the individual source modules that make up the mxGraph library. These files are the modular source code; the combined library is in `../mxClient.js`.

## Upstream Documentation

For standard mxGraph API documentation, see [jgraph.github.io/mxgraph](https://jgraph.github.io/mxgraph/docs/js-api/files). This documentation covers **draw.io-specific modifications only**.

## Directory Structure

| Directory | Purpose | Key Classes |
|-----------|---------|-------------|
| `model/` | Graph data structure | `mxGraphModel`, `mxCell`, `mxGeometry` |
| `view/` | Rendering and display | `mxGraph`, `mxGraphView`, `mxCellRenderer` |
| `handler/` | User interaction | `mxGraphHandler`, `mxConnectionHandler`, `mxVertexHandler` |
| `shape/` | Visual primitives | `mxShape`, `mxRectangleShape`, `mxConnector` |
| `layout/` | Auto-arrangement | `mxHierarchicalLayout`, `mxCompactTreeLayout` |
| `io/` | XML serialization | `mxCodec`, `mxObjectCodec` |
| `util/` | Utilities | `mxUtils`, `mxEvent`, `mxConstants` |

## Key Files

### Bootstrap
- `mxClient.js` - Client initialization, browser detection, configuration flags

### Model Layer (`model/`)
- `mxGraphModel.js` - The data model holding all cells
- `mxCell.js` - Individual cell (vertex or edge) in the graph
- `mxGeometry.js` - Position and size information
- `mxCellPath.js` - Utilities for cell path manipulation

### View Layer (`view/`)
- `mxGraph.js` - **Core class** - Main graph component combining model and view
- `mxGraphView.js` - Manages cell states and validates display
- `mxCellRenderer.js` - Renders cells to DOM/SVG
- `mxCellState.js` - Runtime state of a cell (bounds, style, etc.)
- `mxStylesheet.js` - Style definitions and defaults

### Handlers (`handler/`)
- `mxGraphHandler.js` - Handles cell move/resize
- `mxConnectionHandler.js` - Handles creating new connections
- `mxVertexHandler.js` - Selection handles for vertices
- `mxEdgeHandler.js` - Selection handles for edges
- `mxRubberband.js` - Rectangle selection

### Shapes (`shape/`)
- `mxShape.js` - Base shape class
- `mxRectangleShape.js`, `mxEllipse.js`, `mxRhombus.js` - Basic shapes
- `mxConnector.js`, `mxPolyline.js` - Edge shapes
- `mxText.js` - Text rendering
- `mxStencil.js` - Custom stencil shapes

### Layouts (`layout/`)
- `mxGraphLayout.js` - Base layout class
- `mxHierarchicalLayout.js` - Layered graph layout
- `mxCompactTreeLayout.js` - Tree layout
- `mxFastOrganicLayout.js` - Force-directed layout

### IO/Codecs (`io/`)
- `mxCodec.js` - Main codec for encoding/decoding XML
- `mxObjectCodec.js` - Base codec for JavaScript objects
- `mxModelCodec.js` - Codec for mxGraphModel
- `mxCellCodec.js` - Codec for mxCell

### Utilities (`util/`)
- `mxUtils.js` - General utilities (DOM, math, etc.)
- `mxEvent.js` - Event handling utilities
- `mxConstants.js` - Global constants and defaults
- `mxPoint.js`, `mxRectangle.js` - Geometry primitives
- `mxEventSource.js` - Event emitter base class

## Class Hierarchy

```
mxEventSource
    |-- mxGraphModel
    |-- mxGraph
    |-- mxGraphView
    |-- mxCellRenderer

mxShape
    |-- mxRectangleShape
    |   |-- mxSwimlane
    |   |-- mxLabel
    |-- mxEllipse
    |   |-- mxDoubleEllipse
    |-- mxRhombus
    |-- mxPolyline
    |   |-- mxArrow
    |   |-- mxConnector
    |       |-- mxArrowConnector
    |-- mxText
    |-- mxImageShape

mxGraphLayout
    |-- mxHierarchicalLayout
    |-- mxCompactTreeLayout
    |-- mxRadialTreeLayout
    |-- mxFastOrganicLayout
    |-- mxCircleLayout
    |-- mxStackLayout
```

## draw.io Modifications

When working with these files, note that draw.io may have modified:

1. **mxGraph.js** - Extended with draw.io-specific methods
2. **mxCellRenderer.js** - Custom rendering behaviors
3. **Handler classes** - Modified interaction patterns
4. **mxConstants.js** - Additional style constants

Look for inline comments marked with "draw.io" or methods not present in upstream documentation.

## See Also

- `../README.md` - mxGraph library overview
- `handler/README.md` - Event handler documentation
- `layout/README.md` - Layout algorithm documentation
- `shape/README.md` - Shape rendering documentation
