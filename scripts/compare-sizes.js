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

function formatBytes(bytes) {
  if (bytes === 0) return '-';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

console.log('=== File Size Comparison ===\n');
console.log('File'.padEnd(35) + 'Original'.padStart(12) + 'Prettified'.padStart(12) + 'Ratio'.padStart(8));
console.log('-'.repeat(67));

let totalOriginal = 0;
let totalPretty = 0;

files.forEach(file => {
  const origPath = path.join(WEBAPP, file);
  let prettyPath;

  if (file.endsWith('.min.js')) {
    prettyPath = origPath.replace('.min.js', '.pretty.js');
  } else {
    prettyPath = origPath.replace('.js', '.pretty.js');
  }

  const origSize = fs.existsSync(origPath) ? fs.statSync(origPath).size : 0;
  const prettySize = fs.existsSync(prettyPath) ? fs.statSync(prettyPath).size : 0;

  totalOriginal += origSize;
  totalPretty += prettySize;

  const ratio = prettySize > 0 && origSize > 0 ? (prettySize / origSize).toFixed(1) + 'x' : 'N/A';

  console.log(
    file.padEnd(35) +
    formatBytes(origSize).padStart(12) +
    formatBytes(prettySize).padStart(12) +
    ratio.padStart(8)
  );
});

console.log('-'.repeat(67));
const totalRatio = totalPretty > 0 && totalOriginal > 0
  ? (totalPretty / totalOriginal).toFixed(1) + 'x'
  : 'N/A';
console.log(
  'TOTAL'.padEnd(35) +
  formatBytes(totalOriginal).padStart(12) +
  formatBytes(totalPretty).padStart(12) +
  totalRatio.padStart(8)
);
