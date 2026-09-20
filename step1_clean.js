const fs = require("fs");

// 1. ვღებულობთ სუფთა ბექაფს
if (fs.existsSync("App.js.backup_before_removal")) {
  let cleanCode = fs.readFileSync("App.js.backup_before_removal", "utf8");
  fs.writeFileSync("App.js", cleanCode, "utf8");
  console.log("App.js successfully restored to clean working state!");
}
