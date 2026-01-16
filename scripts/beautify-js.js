const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const beautify = require('js-beautify').js;
const config = require('./prettify-config');

async function beautifyFile(inputPath, outputPath) {
  const relativePath = path.relative(path.join(__dirname, '..'), inputPath);
  console.log(`\nProcessing: ${relativePath}`);

  if (!fs.existsSync(inputPath)) {
    console.log(`  File not found, skipping`);
    return false;
  }

  const content = fs.readFileSync(inputPath, 'utf8');
  const sizeMB = (content.length / 1024 / 1024).toFixed(2);
  console.log(`  Size: ${sizeMB} MB`);

  let result;

  try {
    // Try Prettier first
    console.log(`  Trying Prettier...`);
    result = await prettier.format(content, {
      ...config.prettier,
      filepath: inputPath
    });
    console.log(`  Prettier succeeded`);
  } catch (prettierError) {
    console.log(`  Prettier failed: ${prettierError.message.split('\n')[0]}`);
    console.log(`  Trying js-beautify...`);
    try {
      // Fallback to js-beautify
      result = beautify(content, config.jsBeautify);
      console.log(`  js-beautify succeeded`);
    } catch (beautifyError) {
      console.error(`  Both formatters failed!`);
      console.error(`  ${beautifyError.message}`);
      return false;
    }
  }

  // Create output directory if needed
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, result);
  const newSizeMB = (result.length / 1024 / 1024).toFixed(2);
  console.log(`  Written: ${path.basename(outputPath)}`);
  console.log(`  New size: ${newSizeMB} MB (${(result.length / content.length).toFixed(1)}x)`);
  return true;
}

async function main() {
  const WEBAPP = path.join(__dirname, '../src/main/webapp');

  // Primary targets - core application bundles (excluding third-party)
  const filesToBeautify = [
    'js/app.min.js',
    'js/viewer.min.js',
    'js/viewer-static.min.js',
    'js/integrate.min.js',
    'js/extensions.min.js',
    'js/shapes.min.js',
    'js/shapes-14-6-5.min.js',
    'js/orgchart.min.js',
    'mxgraph/mxClient.js',
  ];

  console.log('=== Beautifying JavaScript Files ===');
  console.log(`Files to process: ${filesToBeautify.length}`);
  console.log('Note: Large files may take several minutes to process...\n');

  let success = 0;
  let failed = 0;

  for (const file of filesToBeautify) {
    const inputPath = path.join(WEBAPP, file);
    let outputPath;

    if (file.endsWith('.min.js')) {
      outputPath = inputPath.replace('.min.js', '.pretty.js');
    } else {
      outputPath = inputPath.replace('.js', '.pretty.js');
    }

    const result = await beautifyFile(inputPath, outputPath);
    if (result) success++;
    else failed++;
  }

  console.log('\n=== Summary ===');
  console.log(`Successful: ${success}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
