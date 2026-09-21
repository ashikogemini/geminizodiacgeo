const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამოწმებთ და ვამატებთ useEffect-ს იმპორტებში
if (!code.includes('useEffect')) {
  if (code.includes('import React')) {
    code = code.replace(
      /import\s+React\s*,\s*\{([^}]*)\}\s*from\s*'react';/,
      (match, p1) => {
        if (!p1.includes('useEffect')) {
          return `import React, { ${p1.trim()}, useEffect } from 'react';`;
        }
        return match;
      }
    );
    // თუ ზოგადი იმპორტია
    code = code.replace(
      /import\s+React\s+from\s*'react';/,
      "import React, { useState, useEffect } from 'react';"
    );
  }
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ useEffect წარმატებით დაიმპორტდა!');
