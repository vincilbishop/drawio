# mxGraph Utilities

Utility classes providing common functionality used throughout mxGraph.

## Upstream Documentation

For standard mxGraph utility API, see [mxUtils](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxUtils-js.html).

## Files

### Core Utilities
| File | Class | Purpose |
|------|-------|---------|
| `mxUtils.js` | `mxUtils` | **Main utilities** - DOM, math, string helpers |
| `mxConstants.js` | `mxConstants` | Global constants and style keys |
| `mxResources.js` | `mxResources` | Internationalization/localization |
| `mxLog.js` | `mxLog` | Logging utilities |

### Event System
| File | Class | Purpose |
|------|-------|---------|
| `mxEvent.js` | `mxEvent` | Event utilities and constants |
| `mxEventSource.js` | `mxEventSource` | Event emitter base class |
| `mxEventObject.js` | `mxEventObject` | Event data container |
| `mxMouseEvent.js` | `mxMouseEvent` | Mouse event wrapper |

### Geometry
| File | Class | Purpose |
|------|-------|---------|
| `mxPoint.js` | `mxPoint` | 2D point (x, y) |
| `mxRectangle.js` | `mxRectangle` | Rectangle (x, y, width, height) |

### Canvas/Rendering
| File | Class | Purpose |
|------|-------|---------|
| `mxAbstractCanvas2D.js` | `mxAbstractCanvas2D` | Canvas abstraction base |
| `mxSvgCanvas2D.js` | `mxSvgCanvas2D` | SVG canvas implementation |
| `mxXmlCanvas2D.js` | `mxXmlCanvas2D` | XML-based canvas |
| `mxVmlCanvas2D.js` | `mxVmlCanvas2D` | VML canvas (legacy IE) |

### Data Structures
| File | Class | Purpose |
|------|-------|---------|
| `mxDictionary.js` | `mxDictionary` | Key-value dictionary |
| `mxObjectIdentity.js` | `mxObjectIdentity` | Object identity utilities |

### UI Utilities
| File | Class | Purpose |
|------|-------|---------|
| `mxWindow.js` | `mxWindow` | Floating window component |
| `mxForm.js` | `mxForm` | Form builder |
| `mxToolbar.js` | `mxToolbar` | Toolbar component |
| `mxPopupMenu.js` | `mxPopupMenu` | Context menu component |

### Drag and Drop
| File | Class | Purpose |
|------|-------|---------|
| `mxDragSource.js` | `mxDragSource` | Drag source behavior |
| `mxClipboard.js` | `mxClipboard` | Copy/paste functionality |

### Animation
| File | Class | Purpose |
|------|-------|---------|
| `mxAnimation.js` | `mxAnimation` | Animation base class |
| `mxMorphing.js` | `mxMorphing` | Smooth transitions |
| `mxEffects.js` | `mxEffects` | Visual effects |

### Layout Helpers
| File | Class | Purpose |
|------|-------|---------|
| `mxGuide.js` | `mxGuide` | Alignment guides |
| `mxDivResizer.js` | `mxDivResizer` | Resize div elements |
| `mxPanningManager.js` | `mxPanningManager` | Pan behavior |
| `mxAutoSaveManager.js` | `mxAutoSaveManager` | Auto-save functionality |

### Images
| File | Class | Purpose |
|------|-------|---------|
| `mxImage.js` | `mxImage` | Image wrapper |
| `mxImageBundle.js` | `mxImageBundle` | Image collection |
| `mxImageExport.js` | `mxImageExport` | Export to image |

### Undo
| File | Class | Purpose |
|------|-------|---------|
| `mxUndoableEdit.js` | `mxUndoableEdit` | Undoable edit container |
| `mxUndoManager.js` | `mxUndoManager` | Undo/redo management |

### XML
| File | Class | Purpose |
|------|-------|---------|
| `mxXmlRequest.js` | `mxXmlRequest` | AJAX/XML requests |

## Key Classes

### mxUtils
Most commonly used utilities:
- `mxUtils.parseXml()` - Parse XML string
- `mxUtils.getXml()` - Convert node to string
- `mxUtils.getValue()` - Safe property access
- `mxUtils.clone()` - Deep clone objects
- `mxUtils.bind()` - Bind function context

### mxConstants
Style property keys:
```javascript
mxConstants.STYLE_FILLCOLOR    // 'fillColor'
mxConstants.STYLE_STROKECOLOR  // 'strokeColor'
mxConstants.STYLE_FONTSIZE     // 'fontSize'
// ... many more
```

### mxEventSource
Event emitter pattern:
```javascript
source.addListener(mxEvent.CHANGE, function(sender, evt) {
    // Handle change
});
source.fireEvent(new mxEventObject(mxEvent.CHANGE));
```

## draw.io Extensions

draw.io adds utilities in:
- `js/diagramly/` - Application utilities
- `js/grapheditor/` - Editor utilities

## See Also

- `../view/README.md` - Classes that use these utilities
- `../shape/README.md` - Shapes using canvas classes
- `mxSvgCanvas2D.js` - Primary canvas implementation
