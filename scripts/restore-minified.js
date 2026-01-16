const fs = require('fs');
const path = require('path');

const WEBAPP = path.join(__dirname, '../src/main/webapp');

const files = [
  'js/app.min.js',
  'js/viewer.min.js',
  'js/viewer-static.min.js',
  'js/integrate.min.js',
  'js/extensions.min.js',
  'js/shapes.min.js',
  'js/shapes-14-6-5.min.js',
  'js/orgchart.min.js',
  'js/stencils.min.js',
  'mxgraph/mxClient.js',
];

console.log('=== Restoring Original Minified Files ===\n');

let restored = 0;
let notFound = 0;

files.forEach(file => {
  const filePath = path.join(WEBAPP, file);
  const backupPath = filePath + '.backup';

  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    console.log(`Restored: ${file}`);
    restored++;
  } else {
    console.log(`No backup found: ${file}`);
    notFound++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`Restored: ${restored}`);
console.log(`No backup: ${notFound}`);
