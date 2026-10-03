const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles('.');
let broken = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const dir = path.dirname(f);
  
  const linkRegex = /(?:href|src)=["']([^"'#:]+)["']/gi;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    if (link.startsWith('tel:') || link.startsWith('mailto:') || link.startsWith('http') || link.startsWith('javascript:')) continue;
    const cleanLink = link.split('?')[0];
    const resolved = path.resolve(dir, cleanLink);
    if (!fs.existsSync(resolved)) {
      console.warn('BROKEN LINK in ' + f + ' -> ' + link + ' (Resolved: ' + resolved + ')');
      broken++;
    }
  }
});

if (broken === 0) {
  console.log('SUCCESS: All local links, styles, and scripts across all HTML files are 100% valid!');
} else {
  console.log('Found ' + broken + ' broken link(s)');
}
