# Shape Libraries (Sidebar)

This directory contains shape library definitions for the draw.io sidebar. Each `Sidebar-*.js` file defines a collection of related shapes that appear in the left panel.

## Common Pattern

**All sidebar files follow an identical pattern.** Instead of documenting each file individually, this README documents the common structure used across all 66+ shape library files.

### File Structure

Each `Sidebar-*.js` file:

1. **Wraps in IIFE** to avoid global namespace pollution
2. **Extends `Sidebar.prototype`** by adding a palette function
3. **Uses `addPaletteFunctions()`** to register shapes
4. **Creates vertex/edge templates** using helper methods

### Example Pattern

```javascript
/**
 * @file Sidebar-AWS.js - AWS shape library for draw.io
 * @description Defines Amazon Web Services architecture diagram shapes.
 * @see README.md for the common sidebar pattern documentation
 */
(function()
{
    // Adds AWS shapes to the sidebar
    Sidebar.prototype.addAWSPalette = function()
    {
        var s = 'shape=mxgraph.aws3.';  // Style prefix
        var gn = 'mxgraph.aws3';         // Shape group name

        this.addPaletteFunctions('aws3', 'AWS / Compute', false, [
            // Each entry creates a draggable shape in the palette
            this.createVertexTemplateEntry(
                s + 'ec2;...',           // Style string
                76.5, 93,                 // Default width, height
                '',                       // Default label
                'EC2 Instance',           // Tooltip/title
                null, null,              // Tags for search
                this.getTagsForStencil(gn, 'ec2', 'aws compute')
            ),
            // ... more shapes
        ]);
    };
})();
```

### Key Methods

#### `addPaletteFunctions(id, title, expanded, entries)`
Registers a palette section in the sidebar.
- `id` - Unique identifier for the palette
- `title` - Display name shown in sidebar
- `expanded` - Whether section is expanded by default
- `entries` - Array of shape template functions

#### `createVertexTemplateEntry(style, width, height, label, title, tags, ...)`
Creates a vertex (shape) entry for the palette.
- Returns a function that creates the drag preview and inserts the shape

#### `createEdgeTemplateEntry(style, width, height, label, title, ...)`
Creates an edge (connector) entry for the palette.

#### `getTagsForStencil(packageName, stencilName, additionalTags)`
Generates search tags for a shape based on its stencil definition.

### Style String Format

Shape styles use mxGraph's semicolon-delimited format:
```
shape=shapeName;fillColor=#ffffff;strokeColor=#000000;...
```

Common style properties:
- `shape` - Shape type (e.g., `mxgraph.aws3.ec2`)
- `fillColor`, `strokeColor` - Colors
- `strokeWidth` - Line thickness
- `aspect` - Maintain aspect ratio
- `verticalLabelPosition` - Label placement

## Shape Libraries by Category

### Cloud Providers
| File | Shapes |
|------|--------|
| `Sidebar-AWS.js`, `Sidebar-AWS3.js`, `Sidebar-AWS4.js`, `Sidebar-AWS4b.js` | Amazon Web Services |
| `Sidebar-Azure.js`, `Sidebar-Azure2.js` | Microsoft Azure |
| `Sidebar-GCP.js`, `Sidebar-GCP2.js` | Google Cloud Platform |
| `Sidebar-Alibaba.js` | Alibaba Cloud |
| `Sidebar-IBM.js` | IBM Cloud |

### Diagramming Standards
| File | Shapes |
|------|--------|
| `Sidebar-BPMN.js` | Business Process Model and Notation |
| `Sidebar-UML.js` | Unified Modeling Language |
| `Sidebar-ER.js` | Entity-Relationship diagrams |
| `Sidebar-ArchiMate.js`, `Sidebar-ArchiMate3.js` | Enterprise Architecture |
| `Sidebar-SysML.js` | Systems Modeling Language |

### Infrastructure & Network
| File | Shapes |
|------|--------|
| `Sidebar-Cisco.js`, `Sidebar-Cisco19.js` | Cisco network equipment |
| `Sidebar-Network.js` | General network diagrams |
| `Sidebar-Rack.js` | Server rack diagrams |
| `Sidebar-Veeam.js`, `Sidebar-Veeam2.js` | Veeam backup |

### UI/Mockup
| File | Shapes |
|------|--------|
| `Sidebar-Bootstrap.js` | Bootstrap components |
| `Sidebar-iOS.js`, `Sidebar-iOS7.js` | iOS UI elements |
| `Sidebar-Android.js` | Android UI elements |
| `Sidebar-Material.js` | Material Design |
| `Sidebar-Mockup.js` | General mockup shapes |

### General Purpose
| File | Shapes |
|------|--------|
| `Sidebar-Basic.js` | Basic shapes |
| `Sidebar-Flowchart.js` | Flowchart shapes |
| `Sidebar-Advanced.js` | Advanced shapes |
| `Sidebar-Arrows.js`, `Sidebar-Arrows2.js` | Arrow shapes |

## Adding a New Shape Library

1. Create `Sidebar-MyLibrary.js` following the pattern above
2. Add a palette function: `Sidebar.prototype.addMyLibraryPalette`
3. Register shapes using `addPaletteFunctions()`
4. Include the file in the build/load order

## Stencil XML vs. JavaScript Shapes

Shapes can be defined two ways:
1. **JavaScript** (this directory) - Programmatic shape definitions
2. **Stencil XML** (`stencils/` directory) - Declarative XML definitions

JavaScript shapes reference stencils via the `shape=mxgraph.package.name` style.

## See Also

- `Sidebar.js` - Base sidebar class with helper methods
- `../Sidebar.js` - Extended sidebar in diagramly
- `../../grapheditor/Sidebar.js` - Original sidebar base class
- `../../stencils/` - Stencil XML definitions
