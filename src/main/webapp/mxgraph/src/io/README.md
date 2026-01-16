# mxGraph IO/Codecs

The IO layer handles serialization of graph data to and from XML format.

## Upstream Documentation

For standard mxGraph codec API, see [mxCodec](https://jgraph.github.io/mxgraph/docs/js-api/files/io/mxCodec-js.html).

## Files

### Core Codecs
| File | Class | Purpose |
|------|-------|---------|
| `mxCodec.js` | `mxCodec` | **Main codec** - Encodes/decodes objects to XML |
| `mxCodecRegistry.js` | `mxCodecRegistry` | Registry of codecs by name |
| `mxObjectCodec.js` | `mxObjectCodec` | Base codec for JavaScript objects |

### Model Codecs
| File | Class | Purpose |
|------|-------|---------|
| `mxModelCodec.js` | `mxModelCodec` | Codec for mxGraphModel |
| `mxCellCodec.js` | `mxCellCodec` | Codec for mxCell |
| `mxGraphCodec.js` | `mxGraphCodec` | Codec for mxGraph |
| `mxGraphViewCodec.js` | `mxGraphViewCodec` | Codec for mxGraphView |
| `mxStylesheetCodec.js` | `mxStylesheetCodec` | Codec for mxStylesheet |

### Change Codecs
| File | Class | Purpose |
|------|-------|---------|
| `mxChildChangeCodec.js` | `mxChildChangeCodec` | Codec for child changes |
| `mxRootChangeCodec.js` | `mxRootChangeCodec` | Codec for root changes |
| `mxTerminalChangeCodec.js` | `mxTerminalChangeCodec` | Codec for edge terminal changes |
| `mxGenericChangeCodec.js` | `mxGenericChangeCodec` | Generic change codec |

## Key Concepts

### mxCodec
The main codec class:
```javascript
// Encode graph to XML
var codec = new mxCodec();
var node = codec.encode(graph.getModel());
var xml = mxUtils.getXml(node);

// Decode XML to model
var doc = mxUtils.parseXml(xml);
var codec = new mxCodec(doc);
codec.decode(doc.documentElement, graph.getModel());
```

### mxObjectCodec
Base class for object serialization:
- Maps JavaScript objects to XML elements
- Handles references between objects
- Supports custom encoding/decoding

### Codec Registry
Codecs are registered by object constructor name:
```javascript
mxCodecRegistry.register(new mxModelCodec());
```

## XML Format

### Graph Structure
```xml
<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="Hello" vertex="1" parent="1">
      <mxGeometry x="100" y="100" width="80" height="40" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>
```

### Key Attributes
- `id` - Unique cell identifier
- `value` - Cell label/data
- `vertex="1"` - Cell is a vertex
- `edge="1"` - Cell is an edge
- `parent` - Parent cell ID
- `source`, `target` - Edge endpoints

## draw.io Extensions

draw.io extends XML format with:
- `style` attribute with draw.io-specific styles
- Custom cell data via `mxCell.value`
- Multi-page support via `<diagram>` elements
- Compression for storage efficiency

The draw.io file format wraps mxGraph XML:
```xml
<mxfile>
  <diagram name="Page-1">
    <!-- compressed mxGraphModel XML -->
  </diagram>
</mxfile>
```

## See Also

- `../model/README.md` - Model classes being serialized
- `../../js/diagramly/DrawioFile.js` - draw.io file handling
- `../../js/diagramly/Extensions.js` - Format importers
