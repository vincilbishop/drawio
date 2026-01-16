# draw.io JavaScript Source

This directory contains all JavaScript source files for the draw.io application.

## Directory Structure

```
js/
├── grapheditor/          # Base graph editor component
├── diagramly/            # draw.io application layer
│   ├── sidebar/          # Shape library sidebar panels
│   ├── vsdx/             # Visio import/export
│   ├── graphml/          # GraphML/yEd import
│   └── miro/             # Miro import
├── bootstrap.js          # Application initialization
├── main.js               # Startup trigger
├── PreConfig.js          # Pre-init configuration
├── PostConfig.js         # Post-init configuration
├── app.min.js            # Combined/minified application
├── viewer.min.js         # Diagram viewer bundle
├── viewer-static.min.js  # Static viewer (no dynamic loading)
├── integrate.min.js      # Integration support
├── extensions.min.js     # External format importers
├── shapes.min.js         # Shape stencils
├── shapes-14-6-5.min.js  # Legacy shapes (version 14.6.5)
├── orgchart.min.js       # Org chart layout
└── stencils.min.js       # Stencil registry
```

## Bootstrap Sequence

The application loads in this order:

1. **PreConfig.js** - Sets global URLs and configuration
2. **bootstrap.js** - Parses URL params, loads scripts
3. **mxGraph library** - Core graph engine
4. **grapheditor/*.js** - Base editor components
5. **diagramly/*.js** - draw.io application
6. **PostConfig.js** - Overrides after init
7. **main.js** - Triggers App.main()

## Build Bundles

### app.min.js
Complete draw.io editor including:
- All grapheditor components
- All diagramly components
- All cloud integrations
- All dialogs and menus

### viewer.min.js
Lightweight viewer for embedding:
- GraphViewer for read-only display
- Lightbox support
- Layer controls
- Zoom/pan navigation

### viewer-static.min.js
Static viewer without dynamic stencil loading:
- Faster initial load
- No network requests for stencils
- Self-contained bundle

### extensions.min.js
Format importers:
- Lucidchart paste import
- Additional format handlers

### shapes.min.js / stencils.min.js
Shape definitions:
- Custom shapes beyond mxGraph defaults
- Stencil registry population
- Shape rendering code

## Configuration

### URL Parameters

See bootstrap.js or [URL Parameters Documentation](https://www.drawio.com/doc/faq/supported-url-parameters).

Common parameters:
- `dev=1` - Development mode (loads source files)
- `offline=1` - Offline mode
- `embed=1` - Embed mode
- `ui=min` - Minimal UI
- `ui=atlas` - Atlas theme
- `lang=xx` - Language code

### Self-Hosted Deployment

Edit PreConfig.js to set:
- `EXPORT_URL` - Image export server
- `PLANT_URL` - PlantUML server
- `DRAWIO_BASE_URL` - Deployment base path

## Development Mode

Enable with `?dev=1` URL parameter:
- Loads individual source files
- Enables debug logging
- Allows eval for stencils
- Skips some optimizations

## Architecture Layers

### mxGraph (src/main/webapp/mxgraph/)
Core graph engine providing:
- Cell model (mxCell, mxGraphModel)
- View rendering (mxGraph, mxCellRenderer)
- User interactions (handlers)
- Layouts (tree, hierarchical, etc.)

### Graph Editor (js/grapheditor/)
UI components:
- Editor, EditorUi - Core editor framework
- Actions, Menus - Commands and menus
- Sidebar, Format - Panels
- Toolbar, Dialogs - UI elements

### Diagramly (js/diagramly/)
draw.io application:
- App - Main application class
- Integration with cloud services
- File management
- Collaboration features

## See Also

- [mxGraph Documentation](https://jgraph.github.io/mxgraph/)
- [draw.io Documentation](https://www.drawio.com/doc/)
- [Embedding Guide](https://www.drawio.com/doc/faq/embed-html-options)
