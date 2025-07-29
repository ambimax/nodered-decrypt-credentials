const fs = require('fs');

if (process.argv.length < 4) {
  console.error("Usage: node fix-json.js <INPUT_JS_OBJECT_FILE> <OUTPUT_JSON_FILE>");
  process.exit(1);
}

const inputPath = process.argv[2];
const outputPath = process.argv[3];

const raw = fs.readFileSync(inputPath, 'utf8');
const fixed = JSON.stringify(eval('(' + raw + ')'), null, 2);

fs.writeFileSync(outputPath, fixed, 'utf8');
console.log("✅ JSON saved to", outputPath);
