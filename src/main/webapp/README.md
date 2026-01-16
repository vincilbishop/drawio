# draw.io Web Application

This is the main web application source for draw.io, a free and open-source diagramming application.

## Directory Structure

```
webapp/
├── js/                    # JavaScript source code
│   ├── grapheditor/       # Base graph editor component
│   ├── diagramly/         # draw.io application layer
│   ├── bootstrap.js       # Application initialization
│   ├── app.min.js         # Combined application bundle
│   └── viewer.min.js      # Viewer-only bundle
├── mxgraph/               # mxGraph library (upstream from JGraph)
│   └── src/               # Graph engine source
├── plugins/               # Optional extension plugins
├── resources/             # UI resource files
├── styles/                # CSS stylesheets
├── templates/             # Diagram templates
├── stencils/              # Shape stencil files
├── images/                # Image assets
└── index.html             # Main entry point
```

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         draw.io Application                       │
├──────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   js/diagramly/  │  │    plugins/     │  │   Cloud APIs    │  │
│  │   App, EditorUi  │  │   Extensions    │  │  Drive, etc.    │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
├───────────┴────────────────────┴────────────────────┴────────────┤
│                      js/grapheditor/                              │
│              Editor, EditorUi, Sidebar, Format                    │
├──────────────────────────────────────────────────────────────────┤
│                         mxgraph/src/                              │
│       Model, View, Handler, Layout, Shape, IO, Util              │
├──────────────────────────────────────────────────────────────────┤
│                         Browser APIs                              │
│                    Canvas, SVG, DOM, Events                       │
└──────────────────────────────────────────────────────────────────┘
```

## Key Components

### mxGraph Library (`mxgraph/src/`)
The core graph engine providing:
- **Model**: Cell-based data model (mxCell, mxGraphModel)
- **View**: SVG/Canvas rendering (mxGraph, mxCellRenderer)
- **Handlers**: User interactions (selection, connection, resize)
- **Layouts**: Automatic positioning (hierarchical, tree, organic)
- **IO**: XML serialization (mxCodec)

See: [mxGraph Documentation](https://jgraph.github.io/mxgraph/)

### Graph Editor (`js/grapheditor/`)
Reusable editor UI components:
- **Editor.js**: Core editor state management
- **EditorUi.js**: User interface container
- **Sidebar.js**: Shape palette
- **Format.js**: Property formatting panel
- **Actions.js**: Command system
- **Menus.js**: Menu construction

### Diagramly Application (`js/diagramly/`)
draw.io-specific application layer:
- **App.js**: Main application class
- **EditorUi.js**: Extended UI with cloud integration
- **DrawioFile.js**: File abstraction base class
- **Cloud Clients**: Google Drive, Dropbox, OneDrive, GitHub, GitLab, Trello

### Plugins (`plugins/`)
Optional extensions:
- **animation.js**: Diagram animation sequences
- **sql.js**: SQL to ER diagram converter
- **tags.js**: Cell tagging and filtering
- **trees/trees.js**: Mindmap and tree diagram support
- **webcola/**: Constraint-based automatic layout

## Deployment Modes

### Web Application
Standard browser deployment via `index.html`.
- Full editor with all cloud integrations
- Multi-page diagram support
- Real-time collaboration

### Viewer Mode
Lightweight read-only mode using `viewer.min.js`.
- Embeddable in web pages
- Lightbox popup viewing
- Layer visibility controls

### Desktop (Electron)
Native desktop application via ElectronApp.js.
- Local file system access
- Offline operation
- Native menus and dialogs

### Embedded
Integration mode for third-party applications.
- iframe embedding
- PostMessage API
- Custom configuration

## Configuration

### URL Parameters
See [URL Parameters Documentation](https://www.drawio.com/doc/faq/supported-url-parameters).

### Self-Hosted Deployment
Edit `js/PreConfig.js`:
```javascript
window.EXPORT_URL = 'https://your-server/export';
window.PLANT_URL = 'https://your-server/plantuml';
window.DRAWIO_BASE_URL = 'https://your-domain/path';
```

### Custom Configuration
```javascript
window.DRAWIO_CONFIG = {
    defaultFonts: [...],
    defaultColorSchemes: [...],
    // See documentation for all options
};
```

## Development

### Dev Mode
Add `?dev=1` to URL:
- Loads individual source files
- Enables debug logging
- Allows eval in stencil registry

### File Structure
- Source files in `js/` directories
- Build output: `*.min.js` files (actually unminified for debugging)
- Resources in `resources/` (i18n strings)

## Documentation

Each major directory contains a README.md with:
- Purpose and contents of the directory
- Key files and their responsibilities
- Architecture patterns used
- Cross-references to related code

## See Also

- [draw.io Documentation](https://www.drawio.com/doc/)
- [mxGraph API Reference](https://jgraph.github.io/mxgraph/)
- [Embedding Guide](https://www.drawio.com/doc/faq/embed-html-options)
- [Self-Hosting Guide](https://www.drawio.com/blog/diagrams-docker-app)
