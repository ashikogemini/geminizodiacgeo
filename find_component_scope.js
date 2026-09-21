const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
let lines = code.split('\n');

console.log("--- ვეძებთ სთეითის გამოყენების ადგილს (ხაზი 1444) ---");
for (let i = Math.max(0, 1435); i < Math.min(lines.length, 1455); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

// ვნახოთ რა ფუნქციები (function ან const ... =) არსებობს ფაილში
console.log("\n--- ფაილში არსებული კომპონენტები/ფუნქციები ---");
let matches = code.match(/(function\s+\w+|const\s+\w+\s*=\s*(\(|async)|class\s+\w+)/g);
if (matches) {
  matches.forEach(m => console.log(m));
}
