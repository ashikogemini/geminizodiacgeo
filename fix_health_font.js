const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ percentages-ის რენდერის ნაწილს და ვამცირებთ შრიფტის ზომას 9-მდე ან ვამატებთ adjustsFontSizeToFit
code = code.replace(/(percentages\.map\([\s\S]*?<Text[^>]*style\s*=\s*\{[^}]*fontSize:\s*)\d+/g, '$19');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ შრიფტი შემცირდა 9-მდე!');
