const fs = require('fs');
const path = require('path');

const WEBAPP_DIR = path.join(__dirname, '../src/main/webapp');

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const firstLineLength = lines[0]?.length || 0;
  const avgLineLength = content.length / lines.length;

  return {
    path: path.relative(WEBAPP_DIR, filePath),
    size: content.length,
    sizeFormatted: formatBytes(content.length),
    lines: lines.length,
    firstLineLength,
    avgLineLength: Math.round(avgLineLength),
    isMinified: firstLineLength > 500 || avgLineLength > 200,
    hasSourceMap: fs.existsSync(filePath + '.map'),
    isThirdParty: filePath.includes('jquery') ||
                  filePath.includes('mermaid') ||
                  filePath.includes('jszip') ||
                  filePath.includes('pako') ||
                  filePath.includes('purify') ||
                  filePath.includes('simplepeer') ||
                  filePath.includes('math4')
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function walkDir(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, results);
    } else if (file.endsWith('.js')) {
      results.push(analyzeFile(filePath));
    }
  }
  return results;
}

const results = walkDir(WEBAPP_DIR);
const categories = {
  thirdParty: results.filter(f => f.isThirdParty),
  minifiedTargets: results.filter(f => f.isMinified && !f.isThirdParty),
  alreadyReadable: results.filter(f => !f.isMinified && !f.isThirdParty),
  withSourceMap: results.filter(f => f.hasSourceMap)
};

console.log('=== JavaScript File Analysis ===\n');
console.log(`Total files: ${results.length}`);
console.log(`Third-party libraries: ${categories.thirdParty.length}`);
console.log(`Minified (targets): ${categories.minifiedTargets.length}`);
console.log(`Already readable: ${categories.alreadyReadable.length}`);
console.log(`With source maps: ${categories.withSourceMap.length}`);

console.log('\n=== Files to Beautify ===');
categories.minifiedTargets
  .sort((a, b) => b.size - a.size)
  .forEach(f => {
    console.log(`  ${f.path} (${f.sizeFormatted})`);
  });

console.log('\n=== Files with Source Maps ===');
categories.withSourceMap.forEach(f => {
  console.log(`  ${f.path}`);
});

// Write full report to JSON
const reportPath = path.join(__dirname, '../prettify-report.json');
fs.writeFileSync(reportPath, JSON.stringify(categories, null, 2));
console.log(`\nFull report written to prettify-report.json`);
