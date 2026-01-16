const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js;

const WEBAPP = path.join(__dirname, '../src/main/webapp');
const inputPath = path.join(WEBAPP, 'js/stencils.min.js');
const outputPath = path.join(WEBAPP, 'js/stencils.pretty.js');

console.log('=== Processing stencils.min.js ===\n');

if (!fs.existsSync(inputPath)) {
  console.log('File not found: js/stencils.min.js');
  process.exit(1);
}

const content = fs.readFileSync(inputPath, 'utf8');
console.log(`Original size: ${(content.length / 1024 / 1024).toFixed(2)} MB`);

// This file has a specific structure - it's JavaScript with embedded XML data
// Just beautify the JavaScript wrapper structure
const beautified = beautify(content, {
  indent_size: 2,
  preserve_newlines: true,
  max_preserve_newlines: 2,
  wrap_line_length: 0  // Don't wrap long lines (preserves base64 data)
});

fs.writeFileSync(outputPath, beautified);
console.log(`Beautified size: ${(beautified.length / 1024 / 1024).toFixed(2)} MB`);
console.log(`Written: js/stencils.pretty.js`);
