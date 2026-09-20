const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const startIndex = code.indexOf('const fetchSituationsAi = async () => {');
if (startIndex === -1) {
    console.log('⚠️ ვერ ვიპოვე ფუნქცია App.js-ში!');
    process.exit();
}

let openBrackets = 0;
let endIndex = -1;
let started = false;

for (let i = startIndex; i < code.length; i++) {
    if (code[i] === '{') {
        openBrackets++;
        started = true;
    } else if (code[i] === '}') {
        openBrackets--;
        if (started && openBrackets === 0) {
            endIndex = i + 1;
            break;
        }
    }
}

const newFunction = `const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    const prompt = "დაწერე ტყუპების ხასიათი და ქცევა 12 კონკრეტულ სიტუაციაში. თითოეული სიტუაცია გამოყავი ცალკე აბზაცად და დაიწყე შესაბამისი ემოჯით. გამოიყენე ზუსტად ეს სათაურები:\\n1. როცა ბედნიერია\\n2. როცა გაბრაზებულია\\n3. როცა ნაწყენია\\n4. როცა სტრესშია\\n5. როცა მოწყენილია\\n6. როცა რაღაც ძალიან აინტერესებს\\n7. როცა რაღაც აღარ აინტერესებს\\n8. როცა არჩევანის წინაშეა\\n9. როცა მოულოდნელი ცვლილება ხდება\\n10. როცა მარტო რჩება\\n11. როცა ვინმე არ ეთანხმება\\n12. როცა დიდი მიზანი აქვს\\n\\nმნიშვნელოვანი წესი: დაწერე ვრცლად და სრულყოფილად თითოეულზე (არ შეკვეცო ტექსტი). არ გამოიყენო ვარსკვლავები (**). ყოველი პუნქტის წინ დატოვე 2 ცარიელი ხაზი.";
    
    const liveResult = await fetchGeminiLive(prompt);
    if (liveResult) {
      let cleanText = liveResult.replace(/\\*/g, '').trim();
      setSituationsAiText(cleanText);
    } else {
      setSituationsAiText("მონაცემები ვერ ჩაიტვირთა.");
    }
  } catch (e) {
    setSituationsAiText("შეცდომა: " + e.message);
  } finally {
    setLoadingSituationsAi(false);
  }
};`;

code = code.substring(0, startIndex) + newFunction + code.substring(endIndex);
fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ კოდი 100%-იანი სიზუსტით განახლდა!');
