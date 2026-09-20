const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით ძველ სათაურს ახალი, უფრო მიმზიდველი ვარიანტით
code = code.replace(/ტყუპები დღეს/g, 'ტყუპების ვარსკვლავური დღე');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სათაური წარმატებით შეიცვალა!');
