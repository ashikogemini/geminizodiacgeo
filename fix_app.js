const fs = require('fs');
let content = fs.readFileSync('App.js', 'utf8');
const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"./]+geminiDecadesData(?:.js)?['"]/;
const match = content.match(importRegex);
if (match) {
    let imports = match[1].split(',').map(s => s.trim()).filter(s => s !== 'GEMINI_BY_DAY' && s !== '');
    content = content.replace(importRegex, `import { ${imports.join(', ')} } from './geminiDecadesData';`);
}
if (!content.includes("import { GEMINI_BY_DAY } from './geminiByDayData'")) {
    content = `import { GEMINI_BY_DAY } from './geminiByDayData';\n` + content;
}
fs.writeFileSync('App.js', content, 'utf8');
