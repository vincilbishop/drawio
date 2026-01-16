# Hierarchical Layout

The hierarchical layout arranges directed graphs in layers, commonly used for flowcharts, organization charts, and dependency diagrams.

## Upstream Documentation

For standard mxGraph hierarchical layout API, see [mxHierarchicalLayout](https://jgraph.github.io/mxgraph/docs/js-api/files/layout/hierarchical/mxHierarchicalLayout-js.html).

## Files

### Main Layout Classes
| File | Class | Purpose |
|------|-------|---------|
| `mxHierarchicalLayout.js` | `mxHierarchicalLayout` | Main hierarchical layout |
| `mxSwimlaneLayout.js` | `mxSwimlaneLayout` | Hierarchical with swimlane support |

### Model (`model/`)
Internal graph representation for layout computation:

| File | Class | Purpose |
|------|-------|---------|
| `mxGraphHierarchyModel.js` | `mxGraphHierarchyModel` | Internal hierarchy model |
| `mxGraphAbstractHierarchyCell.js` | `mxGraphAbstractHierarchyCell` | Base class for hierarchy cells |
| `mxGraphHierarchyNode.js` | `mxGraphHierarchyNode` | Node in hierarchy |
| `mxGraphHierarchyEdge.js` | `mxGraphHierarchyEdge` | Edge in hierarchy |
| `mxSwimlaneModel.js` | `mxSwimlaneModel` | Swimlane-aware model |

### Stages (`stage/`)
Layout computation is divided into stages:

| File | Class | Purpose |
|------|-------|---------|
| `mxHierarchicalLayoutStage.js` | `mxHierarchicalLayoutStage` | Base stage class |
| `mxMinimumCycleRemover.js` | `mxMinimumCycleRemover` | Stage 1: Remove cycles |
| `mxMedianHybridCrossingReduction.js` | `mxMedianHybridCrossingReduction` | Stage 2: Reduce crossings |
| `mxCoordinateAssignment.js` | `mxCoordinateAssignment` | Stage 3: Assign coordinates |
| `mxSwimlaneOrdering.js` | `mxSwimlaneOrdering` | Swimlane-specific ordering |

## Algorithm Overview

The Sugiyama-style hierarchical layout works in stages:

### Stage 1: Cycle Removal
- Detect and reverse edges that create cycles
- Results in a DAG (directed acyclic graph)

### Stage 2: Layer Assignment
- Assign each node to a layer (rank)
- Respect edge directions (source before target)

### Stage 3: Crossing Reduction
- Order nodes within each layer
- Minimize edge crossings between layers
- Uses median/barycenter heuristics

### Stage 4: Coordinate Assignment
- Assign x,y coordinates to each node
- Space nodes evenly
- Route edges

## Configuration

```javascript
var layout = new mxHierarchicalLayout(graph);

// Direction of layout
layout.orientation = mxConstants.DIRECTION_NORTH; // or SOUTH, EAST, WEST

// Spacing
layout.interRankCellSpacing = 50;  // Between layers
layout.intraCellSpacing = 30;       // Within layers
layout.interHierarchySpacing = 60;  // Between components

// Edge routing
layout.disableEdgeStyle = true;     // Reset edge styles

// Execute
layout.execute(parent);
```

## Swimlane Layout

`mxSwimlaneLayout` extends hierarchical layout for swimlane diagrams:
- Nodes constrained to swimlane columns
- Maintains swimlane structure
- Useful for process diagrams

## See Also

- `../README.md` - Layout overview
- `../../view/mxLayoutManager.js` - Layout execution
- `../../../js/diagramly/` - draw.io layout features
