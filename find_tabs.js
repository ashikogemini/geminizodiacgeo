const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
code.split('\n').forEach((line, i) => {
  if (line.includes('activeTab')) {
    console.log(`${i+1}: ${line}`);
  }
});
