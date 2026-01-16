const fs = require('fs');
const path = require('path');

const WEBAPP = path.join(__dirname, '../src/main/webapp');

const replacements = [
  { min: 'js/app.min.js', pretty: 'js/app.pretty.js' },
  { min: 'js/viewer.min.js', pretty: 'js/viewer.pretty.js' },
  { min: 'js/viewer-static.min.js', pretty: 'js/viewer-static.pretty.js' },
  { min: 'js/integrate.min.js', pretty: 'js/integrate.pretty.js' },
  { min: 'js/extensions.min.js', pretty: 'js/extensions.pretty.js' },
  { min: 'js/shapes.min.js', pretty: 'js/shapes.pretty.js' },
  { min: 'js/shapes-14-6-5.min.js', pretty: 'js/shapes-14-6-5.pretty.js' },
  { min: 'js/orgchart.min.js', pretty: 'js/orgchart.pretty.js' },
  { min: 'js/stencils.min.js', pretty: 'js/stencils.pretty.js' },
  { min: 'mxgraph/mxClient.js', pretty: 'mxgraph/mxClient.pretty.js' },
];

console.log('=== Replacing Minified Files ===\n');

let replaced = 0;
let skipped = 0;

replacements.forEach(({ min, pretty }) => {
  const minPath = path.join(WEBAPP, min);
  const prettyPath = path.join(WEBAPP, pretty);
  const backupPath = minPath + '.backup';

  if (!fs.existsSync(prettyPath)) {
    console.log(`Skip: ${pretty} does not exist`);
    skipped++;
    return;
  }

  if (!fs.existsSync(minPath)) {
    console.log(`Skip: ${min} does not exist`);
    skipped++;
    return;
  }

  // Backup original
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(minPath, backupPath);
    console.log(`Backup: ${min} -> ${min}.backup`);
  }

  // Replace with prettified
  fs.copyFileSync(prettyPath, minPath);
  console.log(`Replaced: ${min}`);
  replaced++;
});

console.log(`\n=== Summary ===`);
console.log(`Replaced: ${replaced}`);
console.log(`Skipped: ${skipped}`);
console.log('\nRun "make start" to test the application.');
