const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

let reactImportRegex = /import\s+([\s\S]*?)\s+from\s+['"]react['"];?/;
let match = code.match(reactImportRegex);

if (match) {
  let importedPart = match[1];
  if (importedPart.includes('{')) {
    let newImportedPart = importedPart;
    if (!newImportedPart.includes('useEffect')) {
      newImportedPart = newImportedPart.replace('}', ', useEffect }');
    }
    if (!newImportedPart.includes('useState')) {
      newImportedPart = newImportedPart.replace('}', ', useState }');
    }
    code = code.replace(importedPart, newImportedPart);
  } else {
    code = code.replace(match[0], "import React, { useState, useEffect } from 'react';");
  }
} else {
  code = "import React, { useState, useEffect } from 'react';\n" + code;
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ useEffect წარმატებით დაემატა იმპორტებს!');
