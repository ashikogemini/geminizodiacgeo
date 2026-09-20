const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვამოწმებთ არის თუ არა ცნობილი ტყუპების იმპორტი
if (!appCode.includes("FAMOUS_GEMINI_DATA")) {
  appCode = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + appCode;
}

// ვპოულობთ HomeScreen-ის დასაწყისს და ვამატებთ ცნობილი ტყუპების სტეიტებს
if (!appCode.includes("showFamousModal")) {
  appCode = appCode.replace(
    /export default function HomeScreen\s*\(\)\s*\{/,
    `export default function HomeScreen() {
  const [showFamousModal, setShowFamousModal] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('5'); // 5 - მაისი, 6 - ივნისი
  const [selectedDay, setSelectedDay] = React.useState('1');`
  );
}

fs.writeFileSync("App.js", appCode, "utf8");
console.log("HomeScreen states updated successfully!");
