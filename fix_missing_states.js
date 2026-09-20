const fs = require("fs");
let c = fs.readFileSync("App.js", "utf8");

const statesToAdd = `
  const [selectedMonth, setSelectedMonth] = React.useState('5');
  const [selectedDay, setSelectedDay] = React.useState('1');
`;

// ვამოწმებთ კონკრეტულად გამოცხადებას (და არა უბრალოდ გამოყენებას)
if (!c.includes("const [selectedMonth")) {
  // ვპოულობთ პირველივე useState-ს (რაც აუცილებლად კომპონენტის შიგნითაა) და ვსვამთ მის წინ
  const hookRegex = /const\s+\[[a-zA-Z0-9_]+,\s*set[a-zA-Z0-9_]+\]\s*=\s*(?:React\.)?useState/;
  const match = c.match(hookRegex);
  
  if (match) {
    c = c.replace(match[0], statesToAdd + "  " + match[0]);
    fs.writeFileSync("App.js", c, "utf8");
    console.log("მეხსიერების ცვლადები ზუსტად კომპონენტში ჩაემატა!");
  } else {
    // თუ რატომღაც ვერ იპოვა, ვძებნით კომპონენტის საწყისს
    const compRegex = /(function\s+HomeScreen\s*\([^)]*\)\s*\{|const\s+HomeScreen\s*=\s*\([^)]*\)\s*=>\s*\{)/;
    const compMatch = c.match(compRegex);
    if (compMatch) {
      c = c.replace(compMatch[0], compMatch[0] + "\n" + statesToAdd);
      fs.writeFileSync("App.js", c, "utf8");
      console.log("ცვლადები HomeScreen-ის დასაწყისში ჩაემატა!");
    }
  }
} else {
  console.log("ცვლადები უკვე არსებობს.");
}
