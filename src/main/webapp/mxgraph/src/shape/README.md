# mxGraph Shapes

Shapes define the visual appearance of graph cells. Each shape class handles rendering a specific type of visual element.

## Upstream Documentation

For standard mxGraph shape API, see [mxShape](https://jgraph.github.io/mxgraph/docs/js-api/files/shape/mxShape-js.html).

## Files

### Base Classes
| File | Class | Purpose |
|------|-------|---------|
| `mxShape.js` | `mxShape` | **Base class** for all shapes |
| `mxStencil.js` | `mxStencil` | Custom shapes from XML stencil definitions |
| `mxStencilRegistry.js` | `mxStencilRegistry` | Registry for stencil shapes |
| `mxMarker.js` | `mxMarker` | Arrow/marker definitions for edge endpoints |

### Vertex Shapes
| File | Class | Purpose |
|------|-------|---------|
| `mxRectangleShape.js` | `mxRectangleShape` | Rectangles (with optional rounded corners) |
| `mxEllipse.js` | `mxEllipse` | Circles and ellipses |
| `mxDoubleEllipse.js` | `mxDoubleEllipse` | Double-bordered ellipse |
| `mxRhombus.js` | `mxRhombus` | Diamond shapes |
| `mxTriangle.js` | `mxTriangle` | Triangle shapes |
| `mxHexagon.js` | `mxHexagon` | Hexagon shapes |
| `mxCylinder.js` | `mxCylinder` | 3D cylinder (database symbol) |
| `mxCloud.js` | `mxCloud` | Cloud shape |
| `mxActor.js` | `mxActor` | Actor/person shape |
| `mxSwimlane.js` | `mxSwimlane` | Swimlane container with header |
| `mxLabel.js` | `mxLabel` | Rectangle with icon support |
| `mxImageShape.js` | `mxImageShape` | Image display |

### Edge Shapes
| File | Class | Purpose |
|------|-------|---------|
| `mxPolyline.js` | `mxPolyline` | Simple polyline (no arrows) |
| `mxConnector.js` | `mxConnector` | Standard connector with markers |
| `mxArrow.js` | `mxArrow` | Thick arrow shape |
| `mxArrowConnector.js` | `mxArrowConnector` | Arrow-shaped connector |
| `mxLine.js` | `mxLine` | Simple line |

### Text
| File | Class | Purpose |
|------|-------|---------|
| `mxText.js` | `mxText` | Text/label rendering |

## Class Hierarchy

```
mxShape
    |-- mxRectangleShape
    |   |-- mxSwimlane
    |   |-- mxLabel
    |-- mxEllipse
    |   |-- mxDoubleEllipse
    |-- mxRhombus
    |-- mxTriangle
    |-- mxHexagon
    |-- mxCylinder
    |-- mxCloud
    |-- mxActor
    |-- mxPolyline
    |   |-- mxArrow
    |   |-- mxConnector
    |       |-- mxArrowConnector
    |-- mxLine
    |-- mxText
    |-- mxImageShape
```

## Key Concepts

### mxShape
Base class providing:
- `paintVertexShape()` - Render vertex shapes
- `paintEdgeShape()` - Render edge shapes
- Style property handling
- SVG/VML abstraction via `mxAbstractCanvas2D`

### Rendering Process
1. `mxCellRenderer` creates shape instance
2. Shape reads style from `mxCellState`
3. `paint()` method called with canvas
4. Shape draws using canvas primitives

### Stencils
Custom shapes defined in XML:
- Loaded from stencil XML files
- Registered via `mxStencilRegistry`
- More flexible than coded shapes

## draw.io Extensions

draw.io adds many custom shapes in:
- `js/grapheditor/Shapes.js` - Core shape extensions
- `js/diagramly/Shapes.js` - Additional shapes
- `js/diagramly/sidebar/` - Shape library definitions

Common draw.io shape patterns:
- Custom connection ports
- Complex path-based shapes
- Shapes with embedded icons

## See Also

- `../view/mxCellRenderer.js` - Creates and manages shapes
- `../util/mxAbstractCanvas2D.js` - Canvas abstraction
- `../../js/grapheditor/Shapes.js` - draw.io shape extensions
