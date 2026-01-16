#!/bin/bash
set -e

echo "=== draw.io JavaScript Prettification ==="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Navigate to project root
cd "$(dirname "$0")/.."

# Create backup
echo "Step 1: Creating backup..."
if [ ! -d "src/main/webapp.backup" ]; then
    cp -r src/main/webapp src/main/webapp.backup
    echo "  Backup created: src/main/webapp.backup"
else
    echo "  Backup already exists, skipping"
fi

# Install dependencies
echo ""
echo "Step 2: Installing dependencies..."
npm install --save-dev prettier js-beautify source-map acorn

# Run categorization
echo ""
echo "Step 3: Categorizing files..."
node scripts/categorize-js.js

# Process source-mapped files
echo ""
echo "Step 4: Processing source-mapped files..."
node scripts/reconstruct-from-sourcemap.js

# Beautify application bundles
echo ""
echo "Step 5: Beautifying application bundles..."
echo "  (This may take several minutes for large files)"
node scripts/beautify-js.js

# Process special cases
echo ""
echo "Step 6: Processing special cases..."
node scripts/process-stencils.js

# Validate syntax
echo ""
echo "Step 7: Validating syntax..."
node scripts/validate-syntax.js || echo "  Some files failed validation"

# Compare sizes
echo ""
echo "Step 8: Comparing file sizes..."
node scripts/compare-sizes.js

echo ""
echo "=== Complete ==="
echo ""
echo "Review prettify-report.json for detailed analysis."
echo "To replace minified files: node scripts/replace-minified.js"
echo "To restore originals: node scripts/restore-minified.js"
echo "To test the application: make start"
