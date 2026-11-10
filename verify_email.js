/**
 * Email Disposable & Domain Verification Script (Node.js)
 * Checks against local 30k blocklist and falls back to DNS MX resolution.
 */

const fs = require('fs');
const dns = require('dns').promises;

const BLOCKLIST_FILE = 'disposable_email_blocklist.conf';

function loadBlocklist(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const set = new Set();
    data.split('\n').forEach(line => {
      const clean = line.trim().toLowerCase();
      if (clean && !clean.startsWith('#')) {
        set.add(clean);
      }
    });
    return set;
  } catch (err) {
    console.warn(`[Warning] Blocklist file '${filePath}' not found.`);
    return new Set();
  }
}

function extractDomain(email) {
  const match = email.trim().toLowerCase().match(/^[^@\s]+@([^@\s]+\.[^@\s]+)$/);
  return match ? match[1] : null;
}

async function verifyEmail(email, blocklist) {
  const domain = extractDomain(email);
  if (!domain) {
    return { email, isValidFormat: false, isDisposable: false, hasMx: false, isSafe: false };
  }

  const isDisposable = blocklist.has(domain);
  let hasMx = false;

  if (!isDisposable) {
    try {
      const mxRecords = await dns.resolveMx(domain);
      hasMx = mxRecords && mxRecords.length > 0;
    } catch (e) {
      hasMx = false;
    }
  }

  return {
    email,
    domain,
    isValidFormat: true,
    isDisposable,
    hasMx,
    isSafe: !isDisposable && hasMx
  };
}

(async () => {
  const testEmail = process.argv[2] || 'test@mailinator.com';
  const blocklist = loadBlocklist(BLOCKLIST_FILE);
  const result = await verifyEmail(testEmail, blocklist);

  console.log(`\n--- Checking: ${testEmail} ---`);
  console.log(`Format Valid: ${result.isValidFormat}`);
  console.log(`Disposable:   ${result.isDisposable}`);
  console.log(`MX Active:    ${result.hasMx}`);
  console.log(`Safe to User: ${result.isSafe}\n`);
})();
