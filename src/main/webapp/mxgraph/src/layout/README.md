# mxGraph Layouts

Layout algorithms automatically arrange graph elements. Each layout implements a specific arrangement strategy.

## Upstream Documentation

For standard mxGraph layout API, see [mxGraphLayout](https://jgraph.github.io/mxgraph/docs/js-api/files/layout/mxGraphLayout-js.html).

## Files

### Base Class
| File | Class | Purpose |
|------|-------|---------|
| `mxGraphLayout.js` | `mxGraphLayout` | **Base class** for all layouts |
| `mxCompositeLayout.js` | `mxCompositeLayout` | Combines multiple layouts |

### Tree Layouts
| File | Class | Purpose |
|------|-------|---------|
| `mxCompactTreeLayout.js` | `mxCompactTreeLayout` | Compact tree arrangement |
| `mxRadialTreeLayout.js` | `mxRadialTreeLayout` | Radial/circular tree |

### Hierarchical Layouts
| File | Class | Purpose |
|------|-------|---------|
| `hierarchical/mxHierarchicalLayout.js` | `mxHierarchicalLayout` | Layered directed graph layout |
| `hierarchical/mxSwimlaneLayout.js` | `mxSwimlaneLayout` | Hierarchical with swimlanes |

### Other Layouts
| File | Class | Purpose |
|------|-------|---------|
| `mxFastOrganicLayout.js` | `mxFastOrganicLayout` | Force-directed (spring) layout |
| `mxCircleLayout.js` | `mxCircleLayout` | Arrange in circle |
| `mxStackLayout.js` | `mxStackLayout` | Stack horizontally/vertically |
| `mxPartitionLayout.js` | `mxPartitionLayout` | Partition into columns/rows |
| `mxParallelEdgeLayout.js` | `mxParallelEdgeLayout` | Space parallel edges |
| `mxEdgeLabelLayout.js` | `mxEdgeLabelLayout` | Position edge labels |

### Hierarchical Layout Internals (`hierarchical/`)
| Subdirectory | Purpose |
|--------------|---------|
| `model/` | Graph hierarchy representation |
| `stage/` | Layout computation stages |

## Key Concepts

### mxGraphLayout
Base class providing:
- `execute(parent)` - Run the layout on cells under parent
- `moveCell()` - Position a cell
- `setEdgePoints()` - Set edge bend points

### Layout Execution
```javascript
var layout = new mxHierarchicalLayout(graph);
layout.execute(graph.getDefaultParent());
```

### Hierarchical Layout
The most complex layout, works in stages:
1. **Cycle Removal** - Remove cycles for layering
2. **Layering** - Assign nodes to layers
3. **Crossing Reduction** - Minimize edge crossings
4. **Coordinate Assignment** - Calculate positions

### Force-Directed Layout
Simulates physical forces:
- Nodes repel each other
- Edges act as springs
- Iterates until stable

## Layout Parameters

### mxHierarchicalLayout
```javascript
layout.interRankCellSpacing = 50;  // Space between layers
layout.interHierarchySpacing = 60; // Space between components
layout.orientation = mxConstants.DIRECTION_NORTH; // Direction
```

### mxCompactTreeLayout
```javascript
layout.horizontal = true;   // Horizontal or vertical
layout.levelDistance = 30;  // Distance between levels
layout.nodeDistance = 20;   // Distance between siblings
```

### mxFastOrganicLayout
```javascript
layout.forceConstant = 50;  // Spring strength
layout.maxIterations = 100; // Iteration limit
```

## draw.io Usage

draw.io provides layout access via:
- Format menu > Arrange > Layout
- `js/diagramly/Trees.js` - Tree-specific layouts
- Plugins for additional layouts

## See Also

- `../view/mxLayoutManager.js` - Automatic layout execution
- `hierarchical/README.md` - Hierarchical layout details
- `../../js/diagramly/Trees.js` - draw.io tree features
