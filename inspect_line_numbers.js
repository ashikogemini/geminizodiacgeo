const fs = require('fs');
let lines = fs.readFileSync('App.js', 'utf8').split('\n');

lines.forEach((line, index) => {
  if (line.includes('მოკლევადიანი ასპექტები') || line.includes('გრძელვადიანი ასპექტები')) {
    console.log(`Line ${index + 1}: ${line}`);
    // გამოვტანოთ მიმდინარე და წინა 3 ხაზი
    for (let i = Math.max(0, index - 3); i <= Math.min(lines.length - 1, index + 2); i++) {
      console.log(`  [${i + 1}] ${lines[i]}`);
    }
    console.log('-----------------------------------');
  }
});
