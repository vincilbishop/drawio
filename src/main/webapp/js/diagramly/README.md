# Diagramly Application Layer

This directory contains the main draw.io application code that extends the grapheditor foundation. This is the largest and most feature-rich layer of the application.

## Architecture Overview

```
mxGraph (mxgraph/src/)
    |
    v
js/grapheditor/
    |-- Editor, Graph, EditorUi, etc.
    |
    v
js/diagramly/    <-- THIS LAYER
    |-- App.js (main application)
    |-- Editor.js, EditorUi.js (extended classes)
    |-- Cloud clients (Drive, Dropbox, etc.)
    |-- File abstractions (DrawioFile, etc.)
    |-- sidebar/ (shape libraries)
```

## Directory Structure

```
js/diagramly/
|-- Core Application
|   |-- Init.js              # Initialization and configuration
|   |-- App.js               # Main application class
|   |-- Editor.js            # Extended editor (311KB)
|   |-- EditorUi.js          # Extended UI (563KB)
|
|-- File System
|   |-- DrawioFile.js        # Base file abstraction
|   |-- DrawioFileSync.js    # File synchronization
|   |-- LocalFile.js         # Browser local files
|   |-- StorageFile.js       # Browser storage
|   |-- RemoteFile.js        # Remote URLs
|   |-- EmbedFile.js         # Embedded diagrams
|
|-- Cloud Integrations
|   |-- DriveClient.js       # Google Drive API
|   |-- DriveFile.js         # Drive file operations
|   |-- DropboxClient.js     # Dropbox API
|   |-- DropboxFile.js       # Dropbox file operations
|   |-- OneDriveClient.js    # Microsoft OneDrive API
|   |-- OneDriveFile.js      # OneDrive file operations
|   |-- GitHubClient.js      # GitHub API
|   |-- GitHubFile.js        # GitHub file operations
|   |-- GitLabClient.js      # GitLab API
|   |-- GitLabFile.js        # GitLab file operations
|   |-- TrelloClient.js      # Trello API
|   |-- TrelloFile.js        # Trello attachments
|   |-- NotionClient.js      # Notion API
|
|-- UI Extensions
|   |-- Dialogs.js           # Extended dialogs (362KB)
|   |-- Menus.js             # Extended menus (160KB)
|   |-- GraphViewer.js       # Lightbox/embed viewer
|   |-- Pages.js             # Multi-page support
|
|-- Collaboration
|   |-- DiffSync.js          # Differential sync
|   |-- P2PCollab.js         # Peer-to-peer collaboration
|   |-- DrawioUser.js        # User representation
|   |-- DrawioComment.js     # Comments
|
|-- Import/Export
|   |-- Extensions.js        # Format importers (648KB)
|   |-- vsdx/               # Visio import/export
|   |-- miro/               # Miro import
|   |-- graphml/            # GraphML import
|
|-- Shape Libraries
|   |-- sidebar/            # Shape palette definitions
|       |-- Sidebar.js      # Base sidebar extensions
|       |-- Sidebar-*.js    # Shape libraries (AWS, Azure, UML, etc.)
|
|-- Special Features
|   |-- Trees.js            # Tree diagram support
|   |-- mxFreehand.js       # Freehand drawing
|   |-- mxRuler.js          # Rulers
|   |-- DistanceGuides.js   # Alignment guides
|
|-- Desktop/Electron
|   |-- ElectronApp.js      # Desktop application
|   |-- DesktopLibrary.js   # Desktop library support
|
|-- Development
|   |-- Devel.js            # Development mode
|   |-- DevTools.js         # Developer tools
```

## Key Files

### Core Application

| File | Size | Purpose |
|------|------|---------|
| `Init.js` | 14KB | Application initialization and global configuration |
| `App.js` | 207KB | Main application class, startup sequence |
| `Editor.js` | 312KB | Extended editor with draw.io features |
| `EditorUi.js` | 563KB | Extended UI with full feature set |

### File System Abstraction

| File | Purpose |
|------|---------|
| `DrawioFile.js` | Base class for all file types |
| `DrawioFileSync.js` | Real-time file synchronization |
| `LocalFile.js` | Browser localStorage files |
| `StorageFile.js` | IndexedDB storage |
| `RemoteFile.js` | Files from URLs |

### Cloud Clients

Each cloud integration follows the same pattern:
- `*Client.js` - OAuth and API wrapper
- `*File.js` - File operations extending DrawioFile
- `*Library.js` - Shape library from cloud storage

## Class Hierarchy

```
Editor (grapheditor)
    |-- Editor (diagramly) - extends via prototype

EditorUi (grapheditor)
    |-- EditorUi (diagramly) - extends via prototype

DrawioFile (abstract base)
    |-- LocalFile
    |-- StorageFile
    |-- RemoteFile
    |-- EmbedFile
    |-- DriveFile
    |-- DropboxFile
    |-- OneDriveFile
    |-- GitHubFile
    |-- GitLabFile
    |-- TrelloFile
    |-- NotionFile
```

## Key Patterns

### Prototype Extension
Classes from grapheditor are extended via prototype modification:
```javascript
// In diagramly/Editor.js
(function() {
    // Save original method
    var graphEditorInit = Editor.prototype.init;

    // Override with extended version
    Editor.prototype.init = function() {
        graphEditorInit.apply(this, arguments);
        // Additional initialization
    };
})();
```

### File Abstraction
All file types extend DrawioFile and implement:
- `save()` - Save file to storage
- `saveAs()` - Save with new name
- `open()` - Open/load file
- `getMode()` - Storage mode identifier
- `isAutosave()` - Autosave support

### Cloud Client Pattern
Cloud clients implement:
- OAuth flow management
- API wrapper methods
- File listing/search
- Upload/download operations

## Event System

Extended events beyond grapheditor:
- `fileLoaded` - File opened
- `fileSaved` - File saved
- `autosave` - Autosave triggered
- `pageSelected` - Multi-page navigation
- `fileDescriptorChanged` - File metadata updated

## Dependencies

- **grapheditor/** - Base editor classes
- **mxgraph/** - Core graph library
- **Third-party:** DOMPurify, JSZip, pako, sanitize-html

## See Also

- `../grapheditor/README.md` - Base editor layer
- `sidebar/README.md` - Shape library documentation
- `vsdx/README.md` - Visio import/export
- `../../mxgraph/README.md` - Core library
