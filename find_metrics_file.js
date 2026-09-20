const fs = require('fs');
fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.js')) {
    let code = fs.readFileSync(file, 'utf8');
    if (code.includes('იღბალი') || code.includes('ენერგია')) {
      let index = code.indexOf('იღბალი') !== -1 ? code.indexOf('იღბალი') : code.indexOf('ენერგია');
      console.log(`📌 ნაპოვნია ფაილში: ${file}`);
      console.log(code.substring(index - 50, index + 300));
      console.log('-----------------------------------');
    }
  }
});
