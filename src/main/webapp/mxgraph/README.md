# mxGraph Library

The mxGraph library is the core graph rendering and interaction engine that powers draw.io. This is a customized version of the [JGraph mxGraph library](https://github.com/jgraph/mxgraph).

## Upstream Documentation

For comprehensive API documentation of the standard mxGraph library, see:
- **API Reference:** [jgraph.github.io/mxgraph/docs/js-api/files](https://jgraph.github.io/mxgraph/docs/js-api/files)
- **User Manual:** [jgraph.github.io/mxgraph/docs/manual](https://jgraph.github.io/mxgraph/docs/manual)
- **GitHub Repository:** [github.com/jgraph/mxgraph](https://github.com/jgraph/mxgraph)

This documentation focuses on **draw.io-specific modifications** and does not duplicate upstream mxGraph documentation.

## Directory Structure

```
mxgraph/
|-- mxClient.js          # Combined/bundled mxGraph library (unminified, primary file)
|-- mxClient.js.backup   # Backup of mxClient.js
|-- css/                 # mxGraph stylesheets
|-- images/              # mxGraph UI images (handles, markers, etc.)
|-- src/                 # Individual source modules (see src/README.md)
```

## Key Files

| File | Size | Purpose |
|------|------|---------|
| `mxClient.js` | ~1MB | **Primary file** - Combined unminified mxGraph library. This is the main file loaded by draw.io. Despite the name, this is NOT minified. |
| `src/mxClient.js` | ~25KB | Bootstrap module that defines `mxClient` object with browser detection and configuration |

## Architecture Overview

mxGraph provides:
- **Graph Model** (`mxGraphModel`, `mxCell`) - Data structure representing the diagram
- **Graph View** (`mxGraph`, `mxGraphView`) - Visual representation and rendering
- **Handlers** - User interaction (selection, connection, edge editing)
- **Shapes** - Visual primitives (rectangles, ellipses, connectors)
- **Layouts** - Automatic arrangement algorithms (hierarchical, tree, organic)
- **Codecs** - XML serialization/deserialization

## draw.io Customizations

This version of mxGraph has been customized for draw.io. Key modifications include:

1. **Extended Shape Library** - Additional shapes beyond standard mxGraph
2. **Custom Handlers** - Modified interaction behaviors for draw.io UX
3. **Integration Hooks** - Connection points with `js/grapheditor/` and `js/diagramly/`
4. **Performance Optimizations** - Specific to draw.io's use cases

When reading the source, look for:
- Comments mentioning "draw.io" or "diagrams.net"
- Methods that override upstream mxGraph behavior
- Additional properties not in standard mxGraph API

## Usage in draw.io

```
mxGraph (this library)
    |
    v
js/grapheditor/Graph.js (extends mxGraph)
    |
    v
js/diagramly/Editor.js (extends Graph)
```

The draw.io application layers extend mxGraph classes to add:
- Toolbar and menu systems
- Format panels
- File operations
- Cloud storage integrations

## See Also

- `src/README.md` - Individual mxGraph source modules
- `../js/grapheditor/README.md` - Graph editor layer that extends mxGraph
- `../js/diagramly/README.md` - Main draw.io application layer
