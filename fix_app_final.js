const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const startIndex = code.indexOf('const fetchSituationsAi = async () => {');
if (startIndex !== -1) {
  let openBrackets = 0;
  let endIndex = -1;
  let started = false;
  
  for (let i = startIndex; i < code.length; i++) {
      if (code[i] === '{') { openBrackets++; started = true; }
      else if (code[i] === '}') {
          openBrackets--;
          if (started && openBrackets === 0) { endIndex = i + 1; break; }
      }
  }
  
  const newFunction = `const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    const prompt = "დაწერე ტყუპების ხასიათი 12 სხვადასხვა სიტუაციაში. თითოეული სიტუაცია დაიწყე ემოჯით და სათაურით. 1. როცა ბედნიერია 2. როცა გაბრაზებულია 3. როცა ნაწყენია 4. სტრესშია 5. მოწყენილია 6. ძალიან აინტერესებს 7. აღარ აინტერესებს 8. არჩევანის წინაშეა 9. მოულოდნელი ცვლილებაა 10. მარტო რჩება 11. არ ეთანხმება 12. დიდი მიზანი აქვს. თითოეულზე დაწერე ვრცლად.";
    
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setSituationsAiText("⚠️ შეცდომა: API Key არ მოიძებნა .env ფაილში.");
      setLoadingSituationsAi(false);
      return;
    }

    const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    const data = await res.json();
    
    if (data.error) {
      setSituationsAiText("⚠️ API შეცდომა: " + data.error.message);
    } else if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let rawText = data.candidates[0].content.parts[0].text;
      // აქ უკვე უსაფრთხოდ ვშლით ვარსკვლავებს
      setSituationsAiText(rawText.split('*').join('').trim());
    } else {
      setSituationsAiText("⚠️ უცნობი შეცდომა: AI-მ ცარიელი პასუხი დააბრუნა.");
    }
  } catch (e) {
    setSituationsAiText("⚠️ კავშირის პრობლემა: " + e.message);
  } finally {
    setLoadingSituationsAi(false);
  }
};`;

  code = code.substring(0, startIndex) + newFunction + code.substring(endIndex);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ სინტაქსი გასწორდა და უსაფრთხო ფუნქცია ჩაიწერა!');
} else {
  console.log('⚠️ ფუნქცია ვერ ვიპოვე.');
}
