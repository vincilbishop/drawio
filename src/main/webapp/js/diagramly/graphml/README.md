# GraphML Format Converter

GraphML import functionality for yEd and other GraphML-compatible applications.

## Overview

This directory contains the GraphML codec for importing diagrams from yEd and other applications that export GraphML format.

## Files

### mxGraphMlCodec.js - GraphML Import
**Purpose**: Parses GraphML XML files and converts them to draw.io diagrams.

**Key features**:
- Parses standard GraphML structure
- Handles yEd-specific extensions (y:* namespace)
- Maps GraphML node/edge attributes to mxGraph
- Preserves graph hierarchy and grouping
- Supports multi-graph documents

**Implementation details**:
- Processes `<graph>`, `<node>`, and `<edge>` elements
- Maps `<key>` definitions to cell attributes
- Handles yEd shape types and styles
- Resolves GraphML references (`y:GraphMLReference`)
- Processes static references (`x:Static`)

## GraphML Format Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <key id="d0" for="node" attr.name="label" attr.type="string"/>
  <key id="d1" for="edge" attr.name="weight" attr.type="double"/>
  <graph id="G" edgedefault="directed">
    <node id="n0">
      <data key="d0">Node Label</data>
    </node>
    <edge id="e0" source="n0" target="n1">
      <data key="d1">1.0</data>
    </edge>
  </graph>
</graphml>
```

## yEd Extensions

The codec handles yEd-specific extensions including:
- Shape definitions (y:ShapeNode, y:GenericNode)
- Edge routing (y:PolyLineEdge, y:BezierEdge)
- Labels and label placement
- Group nodes (y:GroupNode)
- Style definitions (y:Fill, y:BorderStyle)

## Usage

```javascript
var codec = new mxGraphMlCodec();
codec.decode(xmlString, function(mxFileXml) {
    // Import the converted diagram
    editorUi.openLocalFile(mxFileXml);
}, function(error) {
    console.error('GraphML import failed:', error);
});
```

## See Also

- `EditorUi.js` - Import orchestration
- `mxGraph` - Target graph model
