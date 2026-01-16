const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');

async function reconstructFromSourceMap(jsFile, mapFile, outputFile) {
  console.log(`Processing: ${path.basename(jsFile)}`);

  if (!fs.existsSync(mapFile)) {
    console.log(`  No source map found: ${mapFile}`);
    return false;
  }

  const mapContent = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

  return await SourceMapConsumer.with(mapContent, null, consumer => {
    // If sourcesContent is available, extract original source
    if (consumer.sourcesContent && consumer.sourcesContent.length > 0) {
      const sources = consumer.sources;
      let output = '';

      for (let i = 0; i < sources.length; i++) {
        if (consumer.sourcesContent[i]) {
          output += `// ========================================\n`;
          output += `// Source: ${sources[i]}\n`;
          output += `// ========================================\n\n`;
          output += consumer.sourcesContent[i];
          output += '\n\n';
        }
      }

      fs.writeFileSync(outputFile, output);
      console.log(`  Reconstructed: ${path.basename(outputFile)} (${sources.length} sources)`);
      return true;
    } else {
      console.log(`  No sourcesContent available`);
      return false;
    }
  });
}

async function main() {
  const WEBAPP = path.join(__dirname, '../src/main/webapp');

  // Find all .js files with corresponding .map files
  const allFiles = fs.readdirSync(WEBAPP);
  const jsFilesWithMaps = allFiles.filter(f =>
    f.endsWith('.js') && fs.existsSync(path.join(WEBAPP, f + '.map'))
  );

  console.log('=== Reconstructing from Source Maps ===\n');
  console.log(`Found ${jsFilesWithMaps.length} files with source maps\n`);

  let success = 0;
  let failed = 0;

  for (const file of jsFilesWithMaps) {
    const jsPath = path.join(WEBAPP, file);
    const mapPath = jsPath + '.map';
    const outPath = jsPath.replace('.js', '.reconstructed.js');

    const result = await reconstructFromSourceMap(jsPath, mapPath, outPath);
    if (result) success++;
    else failed++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Successful: ${success}`);
  console.log(`Failed/Skipped: ${failed}`);
}

main().catch(console.error);
