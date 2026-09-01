import fs from 'fs';
import path from 'path';

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git' && file !== 'scratch') {
        results = results.concat(findFiles(filePath));
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = findFiles(path.join(process.cwd(), 'src'));
console.log(`Analyzing JSX elements across ${files.length} source files...`);

let totalErrors = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract all import statements
  const importBlocks = [];
  const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"];?/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    importBlocks.push(match[0]);
  }
  const fullImportText = importBlocks.join('\n');

  // Extract JSX component usages: <ComponentName ... or <ComponentName>
  const jsxTagRegex = /<([A-Z][a-zA-Z0-9]+)[\s\/>]/g;
  const usedTags = new Set();
  let tagMatch;
  while ((tagMatch = jsxTagRegex.exec(content)) !== null) {
    const tag = tagMatch[1];
    if (!['React', 'Fragment'].includes(tag)) {
      usedTags.add(tag);
    }
  }

  usedTags.forEach(tag => {
    const isImported = fullImportText.includes(tag);
    const isDefinedLocally = new RegExp(`(function|const|let|var|class)\\s+${tag}\\b`).test(content);
    
    if (!isImported && !isDefinedLocally) {
      console.log(`❌ [MISSING JSX COMPONENT/ICON] Component '<${tag}>' used in ${path.relative(process.cwd(), file)} but NOT imported or defined!`);
      totalErrors++;
    }
  });
});

console.log(`\nScan complete. Total missing JSX imports/components: ${totalErrors}`);
