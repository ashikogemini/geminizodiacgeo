const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვამცირებთ შრიფტის ზომას 10-მდე იმ ბლოკებში, სადაც კუბიკების ეტიკეტებია
code = code.replace(/label:\s*['"]ჯანმრთელ[^'"]*['"]/g, "label: 'ჯანმრთელობა'");
code = code.replace(/label:\s*['"]შემოქმედ[^'"]*['"]/g, "label: 'შემოქმედება'");

// შრიფტის ზომის შემცირება კუბიკების ტექსტებისთვის
code = code.replace(/fontSize:\s*1[2345](,\s*color:\s*['"]#fff['"])/g, 'fontSize: 10$1');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ განახლდა!');
