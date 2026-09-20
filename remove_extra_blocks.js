const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვინახავთ ბექაფს ცვლილებამდე
fs.writeFileSync("App.js.backup_before_removal", appCode, "utf8");

// ვპოულობთ და ვშლით იმ არასაჭირო აკორდეონის ბლოკებს, რომელთა სათაურებიც სურათზეა
const blocksToRemove = [
  "✨ ტყუპები და სხვა ნიშნები",
  "🌟 ცნობილი ტყუპები",
  "💡 საინტერესო ფაქტები",
  "🔥 ეს ნამდვილად ტყუპებია"
];

// ვცდილობთ დავასუფთავოთ ეს სექციები App.js-დან
// ზოგადი მიდგომა: ვეძებთ ამ ტექსტების შემცველ View ან TouchableOpacity ბლოკებს და ვშლით
console.log("Removing specified blocks from App.js...");

// მოდი, ვიპოვოთ და წავშალოთ თითოეული მათგანის შესაბამისი კონტეინერი
blocksToRemove.forEach(title => {
  // ვძებნით სექციას სათაურით და ვშლით მის გარშემო არსებულ JSX სტრუქტურას
  // რადგან სტრუქტურა შეიძლება განსხვავდებოდეს, გამოვიყენებთ უსაფრთხო ძებნას
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(<TouchableOpacity[\\s\\S]*?>[\\s\\S]*?${escapedTitle}[\\s\\S]*?<\\/TouchableOpacity>[\\s\\S]*?(?:<View[\\s\\S]*?>[\\s\\S]*?<\\/View>)?)`, 'g');
  
  appCode = appCode.replace(regex, '');
});

// თუ ზუსტი სტრუქტურით ვერ წაიშალა, ვცადოთ უფრო ფართო ძებნა სათაურებზე
blocksToRemove.forEach(title => {
  if (appCode.includes(title)) {
    console.log(`Found remaining reference to: ${title}, cleaning up...`);
    // ვშლით კონკრეტულ სათაურთან დაკავშირებულ ხაზებს
    const lines = appCode.split('\n');
    appCode = lines.filter(line => !line.includes(title)).join('\n');
  }
});

fs.writeFileSync("App.js", appCode, "utf8");
console.log("Extra blocks successfully removed!");
