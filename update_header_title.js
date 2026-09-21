const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით ძველ სათაურს და ქვეტექსტს ახლით
code = code.replace(
  /ტყუპების ჰიბრიდული ენციკლოპედია/g,
  'ტყუპების სამყარო'
);

code = code.replace(
  /ასტროლოგიური ტრადიცია და თანამედროვე ანალიზი/g,
  'ხასიათი, ენერგია და ასტროლოგიური პორტრეტი'
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სათაური წარმატებით განახლდა!');
