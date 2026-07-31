const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', 'hexo-admin', 'node_modules', 'hexo-front-matter', 'lib', 'front_matter.js');

if (!fs.existsSync(target)) {
  console.log('[patch-front-matter] Target not found, skipping.');
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf8');

if (content.includes('util.isDate')) {
  content = content.replace(
    /var isDate = util\.isDate;/,
    'var isDate = function(d) { return d instanceof Date; };'
  );
  fs.writeFileSync(target, content, 'utf8');
  console.log('[patch-front-matter] Patched hexo-front-matter: replaced util.isDate');
} else {
  console.log('[patch-front-matter] Already patched, skipping.');
}