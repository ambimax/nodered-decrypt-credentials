const crypto = require('crypto');

const encryptionAlgorithm = "aes-256-ctr";

function decryptCredentials(key, cipher, raw = false) {
  let flows = cipher["$"];
  const initVector = Buffer.from(flows.substring(0, 32),'hex');
  flows = flows.substring(32);
  const decipher = crypto.createDecipheriv(encryptionAlgorithm, key, initVector);
  return decipher.update(flows, 'base64', 'utf8') + decipher.final('utf8');;
}


if(process.argv.length < 4) {
  console.error("Usage: npm run decrypt <PATH_TO_FLOWS_CRED> <SECRET>")
  process.exit(1)
}

const secret = process.argv[3];
const encrypted = require(process.argv[2])
const key = crypto.createHash('sha256').update(secret).digest();

try {
  console.log(JSON.parse(decryptCredentials(key, encrypted)));
} catch (error) {
  console.error("Invalid Secret")
}


