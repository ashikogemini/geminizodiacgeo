const fs = require('fs');
fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.js')) {
    let code = fs.readFileSync(file, 'utf8');
    if (code.includes('სიყვარული') && code.includes('კარიერა') && (code.includes('icon') || code.includes('value'))) {
      let index = code.indexOf('სიყვარული');
      console.log(`📌 ნაპოვნია ფაილში: ${file}`);
      console.log(code.substring(index - 50, index + 400));
    }
  }
});
