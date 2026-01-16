# Miro Import Converter

Miro board import functionality.

## Overview

This directory contains the Miro importer for converting Miro boards to draw.io diagrams.

## Files

### MiroImporter.js - Miro Board Import
**Purpose**: Converts Miro board JSON data to draw.io diagram format.

**Key features**:
- Maps Miro shapes to draw.io equivalents
- Converts flowchart shapes
- Handles AWS architecture icons
- Processes cards, stickers, and text
- Preserves connections/relationships
- Maps Miro styles to mxGraph styles

**Supported Miro shapes**:
- Flowchart: process, decision, data, document, etc.
- Basic shapes: rectangles, ellipses, triangles
- AWS architecture icons
- Cards and sticky notes
- Text elements
- Connectors

**Implementation details**:
- `stencilsMap`: Maps Miro stencil names to mxGraph shapes
- `typeStylesMap`: Custom handlers for specific Miro types
- Processes Miro JSON board export format
- Calculates positions and dimensions
- Handles text and label formatting

## Miro Shape Mapping

```javascript
// Example mappings from Miro to draw.io
'flowchart-process' → 'shape=mxgraph.flowchart.process;'
'flowchart-decision' → 'shape=mxgraph.flowchart.decision;'
'flowchart-document' → 'shape=mxgraph.flowchart.document;'
'card' → Custom handler with partial rectangle
'sticker' → 'rect;shadow=1;strokeColor=none;'
```

## Usage

```javascript
var importer = new MiroImporter();
var xml = importer.import(miroJsonData);
// xml contains converted draw.io diagram
```

## See Also

- `Extensions.js` - Other format importers (Lucidchart)
- `EditorUi.js` - Import orchestration
- `shapes/` - Target shape definitions
