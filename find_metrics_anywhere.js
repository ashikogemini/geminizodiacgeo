const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.js'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // ვეძებთ ფაილს, სადაც 85 და 88 ერთადაა
  if (content.includes('85') && content.includes('88')) {
    console.log(`\n✅ ვიპოვე მონაცემები ფაილში: ${file}`);
    let idx = content.indexOf('85');
    console.log(content.substring(Math.max(0, idx - 200), idx + 300));
  }
});
