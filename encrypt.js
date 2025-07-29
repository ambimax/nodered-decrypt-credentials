const crypto = require('crypto');
const fs = require('fs');

const encryptionAlgorithm = "aes-256-ctr";

function encryptCredentials(key, dataObject) {
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(encryptionAlgorithm, key, initVector);
  const encrypted = cipher.update(JSON.stringify(dataObject), 'utf8', 'base64') + cipher.final('base64');

  return { "$": initVector.toString('hex') + encrypted };
}

if(process.argv.length < 5) {
  console.error("Usage: npm run encrypt <MODIFIED_JSON_FILE> <SECRET> <OUTPUT_FILE>");
  process.exit(1);
}

const jsonPath = process.argv[2];
const secret = process.argv[3];
const outputPath = process.argv[4];

const key = crypto.createHash('sha256').update(secret).digest();
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const encrypted = encryptCredentials(key, jsonData);

fs.writeFileSync(outputPath, JSON.stringify(encrypted, null, 2));
console.log("Encrypted file saved to", outputPath);
