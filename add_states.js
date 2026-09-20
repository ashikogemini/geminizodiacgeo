const fs = require("fs");
let c = fs.readFileSync("App.js", "utf8");

const statesToAdd = `
  const [selectedMonth, setSelectedMonth] = React.useState('5');
  const [selectedDay, setSelectedDay] = React.useState('1');
`;

if (!c.includes("setSelectedMonth")) {
  // ვცდილობთ ვიპოვოთ კომპონენტის დასაწყისი (Arrow function ან ჩვეულებრივი function)
  if (c.includes("const HomeScreen = () => {")) {
    c = c.replace("const HomeScreen = () => {", "const HomeScreen = () => {" + statesToAdd);
  } else if (c.includes("function HomeScreen() {")) {
    c = c.replace("function HomeScreen() {", "function HomeScreen() {" + statesToAdd);
  } else {
    // ზოგადი ძებნა თუ ცოტა სხვანაირად წერია
    c = c.replace(/(function HomeScreen\s*\(\)\s*\{|const HomeScreen\s*=\s*\([^)]*\)\s*=>\s*\{)/, match => match + statesToAdd);
  }
  
  fs.writeFileSync("App.js", c, "utf8");
  console.log("States added successfully!");
} else {
  console.log("States already exist, nothing to add.");
}
