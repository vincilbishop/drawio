# draw.io Plugins

This directory contains optional plugins that extend draw.io functionality. Plugins are loaded dynamically and can add new features, menu items, shapes, and behaviors.

## Plugin Architecture

### Loading Mechanism

All plugins use the standard `Draw.loadPlugin()` function:

```javascript
Draw.loadPlugin(function(editorUi) {
    // Plugin code with access to the editor UI
    var graph = editorUi.editor.graph;

    // Add resources for i18n
    mxResources.parse('myAction=My Action...');

    // Add new actions
    editorUi.actions.addAction('myAction', function() {
        // Action implementation
    });

    // Extend existing menus
    var menu = editorUi.menus.get('extras');
    var oldFunct = menu.funct;
    menu.funct = function(menu, parent) {
        oldFunct.apply(this, arguments);
        editorUi.menus.addMenuItems(menu, ['-', 'myAction'], parent);
    };
});
```

### Plugin Capabilities

Plugins can:
- Add new menu items and actions
- Create popup windows (using `mxWindow`)
- Override graph behaviors (selection, folding, movement)
- Add keyboard shortcuts
- Inject CSS styles
- Create sidebar palettes with new shapes
- Work in both edit and chromeless (viewer) modes

## Available Plugins

### Animation & Flow

| Plugin | Description |
|--------|-------------|
| `animation.js` | Timeline-based animation editor for creating step-by-step reveal sequences |
| `flow.js` | Animated flow effect on edges using CSS keyframe animations |
| `replay.js` | Replay recorded diagram changes |

### Data Import

| Plugin | Description |
|--------|-------------|
| `sql.js` | Parse SQL CREATE TABLE statements to generate ER diagrams (MySQL/SQL Server) |
| `import.js` | Additional import format handlers |

### Diagram Organization

| Plugin | Description |
|--------|-------------|
| `tags.js` | Tag cells for filtering and selective visibility |
| `explore.js` | Navigation and exploration features |
| `page.js` | Multi-page diagram utilities |
| `props.js` | Property panel enhancements |

### Diagram Generators

| Plugin | Description |
|--------|-------------|
| `random.js` | Generate random diagrams for testing |
| `number.js` | Auto-numbering for shapes |
| `text.js` | Text manipulation utilities |

### Shape & Layout

| Plugin | Description |
|--------|-------------|
| `trees/trees.js` | Mindmap and org-chart tree structures with special behaviors |
| `webcola/webcola.js` | Constraint-based automatic layout using WebCola library |
| `rackF5.js` | F5 rack diagram support |

### Data & Export

| Plugin | Description |
|--------|-------------|
| `svgdata.js` | Enhanced SVG export with metadata |
| `tooltips.js` | Custom tooltip behaviors |
| `anonymize.js` | Anonymize diagram content for sharing |

### Integrations

| Plugin | Description |
|--------|-------------|
| `trello.js` | Trello card attachment picker |
| `nextcloud.js` | Nextcloud integration support |
| `update.js` | Auto-update functionality |

### Edge Handling

| Plugin | Description |
|--------|-------------|
| `edgeConnection.js` | Enhanced edge connection behaviors |

## Subdirectories

### trees/

Mindmap and tree diagram plugin with specialized behaviors:
- Tree-aware selection (children, siblings, subtree)
- Automatic layout on insert (Tab for child, Enter for sibling)
- Collapse/expand subtrees
- Sidebar palette with tree templates

### webcola/

WebCola constraint-based layout integration:
- `cola.min.js` - WebCola library (external)
- `mxWebColaAdaptor.js` - Adaptor connecting mxGraph to WebCola
- `mxWebColaLayout.js` - Layout implementation

## Plugin Development Guide

### Minimal Plugin Template

```javascript
/**
 * My Custom Plugin
 * Description of what this plugin does.
 */
Draw.loadPlugin(function(ui) {
    // Skip in viewer mode if not needed
    if (ui.editor.isChromelessView()) {
        return;
    }

    var graph = ui.editor.graph;

    // Add i18n resources
    mxResources.parse('myAction=My Action');

    // Register action
    ui.actions.addAction('myAction', function() {
        // Implementation
    });

    // Add to menu
    var menu = ui.menus.get('extras');
    if (menu != null) {
        var oldFunct = menu.funct;
        menu.funct = function(menu, parent) {
            oldFunct.apply(this, arguments);
            ui.menus.addMenuItems(menu, ['-', 'myAction'], parent);
        };
    }
});
```

### Creating a Plugin Window

```javascript
var MyWindow = function(editorUi, x, y, w, h) {
    var div = document.createElement('div');
    div.style.padding = '10px';

    // Add UI elements to div...

    this.window = new mxWindow('Window Title', div, x, y, w, h, true, true);
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
};
```

### Context Menu Integration

```javascript
var uiCreatePopupMenu = ui.menus.createPopupMenu;
ui.menus.createPopupMenu = function(menu, cell, evt) {
    uiCreatePopupMenu.apply(this, arguments);

    if (/* condition for showing menu item */) {
        menu.addSeparator();
        this.addMenuItems(menu, ['myAction'], null, evt);
    }
};
```

### Adding CSS Styles

```javascript
try {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.myClass { /* styles */ }';
    document.getElementsByTagName('head')[0].appendChild(style);
} catch (e) {
    // Ignore errors in environments without DOM
}
```

## Configuration

Plugins can be enabled via URL parameters or configuration:

```
?p=animation;flow;tags
```

Or in the configuration file:
```json
{
    "plugins": ["animation", "flow", "tags"]
}
```

## See Also

- `js/diagramly/App.js` - Plugin loading mechanism
- `js/diagramly/EditorUi.js` - Editor UI API for plugins
- `js/grapheditor/Actions.js` - Action system
- `js/grapheditor/Menus.js` - Menu system
