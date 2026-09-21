const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ამოვშალოთ ყველა Text კომპონენტი, რომელიც შეიცავს ასპექტების აღწერებს (• სიმბოლოთი)
code = code.replace(/<Text[^>]*style=\{\{\s*color:\s*['"]#d1d5db['"][\s\S]*?<\/Text>/g, (match) => {
  if (match.includes('•') || match.includes('სექსტილი') || match.includes('ტრანზიტი') || match.includes('პოზიცია') || match.includes('გავლენა')) {
    return '';
  }
  return match;
});

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ასპექტების ტექსტები ბოლომდე წაიშალა!');
