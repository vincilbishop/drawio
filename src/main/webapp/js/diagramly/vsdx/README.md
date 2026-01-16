# VSDX Format Converter

Microsoft Visio (.vsdx) import and export functionality.

## Overview

This directory contains converters for Microsoft Visio's VSDX format, enabling draw.io to read and write Visio files natively.

## Files

### importer.js - VSDX Import (mxVsdxCodec)
**Purpose**: Parses VSDX files and converts them to draw.io diagrams.

**Key features**:
- Parses VSDX zip archive structure
- Maps Visio shapes to draw.io equivalents
- Converts master shapes and stencils
- Handles page layouts and multi-page documents
- Preserves connections between shapes
- Maps Visio styles to mxGraph styles

**Implementation details**:
- Generated from Java using JSweet transpiler
- Reads OOXML package structure
- Processes pages/pages.xml, masters/masters.xml
- Maps Visio ShapeSheet cells to mxGraph styles

### VsdxExport.js - VSDX Export
**Purpose**: Exports draw.io diagrams to VSDX format.

**Key features**:
- Creates valid VSDX zip archive
- Generates required OOXML structure
- Maps draw.io shapes to Visio equivalents
- Supports multi-page export
- Handles embedded images

**Implementation details**:
- Uses JSZip for archive creation
- Generates Content_Types.xml, document.xml, pages/
- Creates master shapes for common elements
- Handles style translation to ShapeSheet format

### bmpDecoder.js - BMP Image Decoder
**Purpose**: Decodes BMP images embedded in VSDX files.

**Key features**:
- Parses BMP file header
- Extracts image dimensions
- Converts to web-compatible format

## VSDX Format Structure

```
.vsdx (ZIP archive)
├── [Content_Types].xml
├── _rels/
│   └── .rels
├── docProps/
│   ├── app.xml
│   ├── core.xml
│   └── custom.xml
└── visio/
    ├── document.xml
    ├── windows.xml
    ├── pages/
    │   ├── pages.xml
    │   └── page1.xml, page2.xml, ...
    └── masters/
        ├── masters.xml
        └── master1.xml, ...
```

## Usage

Import:
```javascript
// VSDX import is handled by server-side processing
// or via EditorUi.importVisio()
editorUi.importVisio(file, function(xml) {
    // xml contains converted diagram
});
```

Export:
```javascript
var exporter = new VsdxExport(editorUi);
exporter.exportCurrentDiagrams();
```

## See Also

- `EditorUi.js` - Import/export orchestration
- `Extensions.js` - LucidImporter for Lucidchart paste
