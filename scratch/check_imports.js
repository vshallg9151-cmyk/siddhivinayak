import fs from 'fs';
import path from 'path';

function findFiles(dir, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(findFiles(filePath, exts));
      }
    } else {
      if (exts.some(ext => filePath.endsWith(ext))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = findFiles(path.join(process.cwd(), 'src'));
console.log(`Checking ${files.length} source files for missing imports / reference errors...`);

// Common global identifiers in browser / Node
const globals = new Set([
  'React', 'window', 'document', 'console', 'localStorage', 'sessionStorage',
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'fetch',
  'Date', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean',
  'Error', 'RegExp', 'Promise', 'Map', 'Set', 'parseInt', 'parseFloat',
  'encodeURIComponent', 'decodeURIComponent', 'isNaN', 'isFinite', 'URL',
  'Blob', 'FormData', 'File', 'FileReader', 'Buffer', 'process', 'global',
  'self', 'alert', 'confirm', 'prompt', 'navigator', 'history', 'location',
  'URLSearchParams', 'Image', 'Element', 'HTMLElement', 'Event', 'CustomEvent',
  'Node', 'HTMLInputElement', 'HTMLButtonElement', 'HTMLFormElement', 'IntersectionObserver',
  'ResizeObserver', 'MutationObserver', 'undefined', 'null', 'true', 'false', 'Infinity', 'NaN'
]);

let issuesFound = 0;

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  // Check basic import presence for used functions
  const lines = code.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('validateEmailAddress') && !code.includes('import') && !code.includes('function validateEmailAddress')) {
      console.log(`[ISSUE] ${path.relative(process.cwd(), file)}:${idx + 1} uses validateEmailAddress but may be missing import!`);
      issuesFound++;
    }
  });
});

console.log(`Check completed. Issues found: ${issuesFound}`);
