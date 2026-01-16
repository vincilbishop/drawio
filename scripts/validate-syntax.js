const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const WEBAPP = path.join(__dirname, '../src/main/webapp');

function validateJS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    acorn.parse(content, {
      ecmaVersion: 2022,
      sourceType: 'script'
    });
    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      error: e.message,
      line: e.loc?.line,
      column: e.loc?.column
    };
  }
}

// Find all .pretty.js files
function findPrettyFiles(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findPrettyFiles(filePath, results);
    } else if (file.endsWith('.pretty.js')) {
      results.push(filePath);
    }
  }
  return results;
}

console.log('=== Validating Prettified JavaScript Files ===\n');

const files = findPrettyFiles(WEBAPP);

if (files.length === 0) {
  console.log('No .pretty.js files found. Run beautify-js.js first.');
  process.exit(0);
}

let valid = 0;
let invalid = 0;

files.forEach(file => {
  const result = validateJS(file);
  const relativePath = path.relative(WEBAPP, file);

  if (result.valid) {
    console.log(`  VALID: ${relativePath}`);
    valid++;
  } else {
    console.log(`  INVALID: ${relativePath}`);
    console.log(`    Error: ${result.error}`);
    if (result.line) {
      console.log(`    Line: ${result.line}, Column: ${result.column}`);
    }
    invalid++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`Valid: ${valid}`);
console.log(`Invalid: ${invalid}`);

process.exit(invalid > 0 ? 1 : 0);
