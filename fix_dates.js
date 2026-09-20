const fs = require("fs");
let c = fs.readFileSync("famousGeminiData.js", "utf8");

// ვიშორებთ თამუნას და თათულის ძველი არასწორი ადგილებიდან
c = c.replace(/\s*\{\s*name:\s*"თამუნა ნიკოლაძე"[^\}]+\},?/g, "");
c = c.replace(/\s*\{\s*name:\s*"თათული ედიშერაშვილი"[^\}]+\},?/g, "");

// ვამატებთ სწორ რიცხვებში (თათული 14-ში, თამუნა 17-ში)
c = c.replace(/"14-6": \[/, '"14-6": [\n    { name: "თათული ედიშერაშვილი", year: "1981", role: "ქართველი მსახიობი" },');
c = c.replace(/"17-6": \[/, '"17-6": [\n    { name: "თამუნა ნიკოლაძე", year: "1978", role: "ქართველი მსახიობი" },');

fs.writeFileSync("famousGeminiData.js", c, "utf8");
console.log("თარიღები წარმატებით შესწორდა!");
