const fs = require('fs');
const files = ['App.js', 'dailyHoroscopeData.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('80%') && content.includes('85%')) {
      console.log(`\n--- ვიპოვე მონაცემები ფაილში: ${file} ---`);
      let idx = content.indexOf('80%');
      console.log(content.substring(Math.max(0, idx - 200), idx + 300));
    }
  }
});
