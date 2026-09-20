const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// 1. შევამოწმოთ არის თუ არა იმპორტი დავამატოთ თავში
if (!appCode.includes("FAMOUS_GEMINI_DATA")) {
  appCode = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + appCode;
}

// 2. ვნახოთ სად არის ტყუპების მოდალი ან კომპონენტი, რომ ჩავამატოთ ცნობილი ადამიანების ძებნის ლოგიკა
// ვამატებთ ცნობილი ტყუპების სტეიტებს, თუ არ არსებობს
if (!appCode.includes("selectedFamousDay")) {
  // ვძებნით ერთ-ერთ მთავარ React კომპონენტის დასაწყისს (მაგ: export default function App)
  appCode = appCode.replace(
    /export default function App\s*\(\)\s*\{/,
    `export default function App() {
  const [showFamousModal, setShowFamousModal] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('5'); // 5 - მაისი, 6 - ივნისი
  const [selectedDay, setSelectedDay] = React.useState('1');`
  );
}

fs.writeFileSync("App.js", appCode, "utf8");
console.log("App.js updated successfully with famous states!");
