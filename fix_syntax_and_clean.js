const fs = require("fs");

// 1. ვღებულობთ სუფთა ბექაფს
if (fs.existsSync("App.js.backup_before_removal")) {
  let cleanCode = fs.readFileSync("App.js.backup_before_removal", "utf8");
  fs.writeFileSync("App.js", cleanCode, "utf8");
}

let c = fs.readFileSync("App.js", "utf8");

// 2. ვპოულობთ პირველი ბლოკის კომენტარს და ვშლით იმ სექციას უსაფრთხოდ
const startIndex = c.indexOf("{/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */}");
const endIndex = c.indexOf("{/* 🧭 მთავარი ნავიგაცია */}"); // ან bottomNav-მდე

if (startIndex !== -1 && endIndex !== -1) {
  // ვინარჩუნებთ ყველაფერს დასაწყისიდანstartIndex-მდე და ვუერთებთ ბოლო ნაწილს endIndex-დან
  c = c.substring(0, startIndex) + "\n" + c.substring(endIndex);
  fs.writeFileSync("App.js", c, "utf8");
  console.log("Old blocks removed cleanly with correct syntax!");
}
