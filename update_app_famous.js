const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// აქ ვამატებთ იმპორტს ცნობილი ტყუპების ბაზიდან, თუ უკვე არ წერია
if (!appCode.includes("FAMOUS_GEMINI_DATA")) {
  appCode = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + appCode;
}

fs.writeFileSync("App.js", appCode, "utf8");
console.log("App.js updated with famousGeminiData import!");
