const fs = require('fs');
if (fs.existsSync('App.js')) {
  let content = fs.readFileSync('App.js', 'utf8');
  // ვამოწმებთ, რომ ვეძებთ ზუსტად UI კუბიკების მასივს და არა პრომპტებს
  if (content.includes('სიყვარული') && content.includes('იღბალი')) {
    // ვცვლით შრიფტის ზომას 10-მდე მხოლოდ კუბიკების ტექსტებში, სადაც numberOfLines ან მსგავსია
    // ან უბრალოდ ვამცირებთ font-ს იმ სტილში, რომელიც კუბიკებს ეხება
    console.log('✅ ნაპოვნია კუბიკების ბლოკი App.js-ში');
    
    // ვანაცვლებთ შემოკლებულ სიტყვებს სრულით
    content = content.replace(/ჯანმრთელ[^<"']*/g, 'ჯანმრთელობა');
    content = content.replace(/შემოქმედ[^<"']*/g, 'შემოქმედება');
    
    fs.writeFileSync('App.js', content, 'utf8');
    console.log('✨ კუბიკების ტექსტები განახლდა!');
  } else {
    console.log('⚠️ კუბიკების ბლოკი ვერ მოიძებნა App.js-ში.');
  }
}
