const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const hybridFunc = `const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    // ვითხოვთ, რომ AI-მ ბაზაზე დაყრდნობით ააწყოს ვრცელი და დახვეწილი ტექსტი
    const baseData = JSON.stringify(GEMINI_ENCYCLOPEDIA?.situations || {});
    const prompt = \`შენ ხარ პროფესიონალი ასტროლოგი. მოცემულია ტყუპების ხასიათის ბაზა სხვადასხვა სიტუაციაში: \${baseData}. გთხოვ, ამ მონაცემებზე დაყრდნობით დაწერე ძალიან ვრცელი, ემოციური და დეტალური ანალიზი 12-ვე სიტუაციაზე. ყოველი სიტუაცია დაიწყე შესაბამისი ემოჯით და ზუსტი სათაურით (როცა ბედნიერია, როცა გაბრაზებულია, როცა ნაწყენია, სტრესშია, მოწყენილია, ძალიან აინტერესებს, აღარ აინტერესებს, არჩევანის წინაშეა, მოულოდნელი ცვლილებაა, მარტო რჩება, არ ეთანხმება, დიდი მიზანი აქვს). თითოეულს შორის დატოვე ცარიელი ხაზი.\`;
    
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    const data = await res.json();
    
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let rawText = data.candidates[0].content.parts[0].text;
      // ვასუფთავებთ ვარსკვლავებისგან
      setSituationsAiText(rawText.split('*').join('').trim());
    } else {
      // ჰიბრიდული სარეზერვო: თუ AI დაკავებულია, ბაზიდან ავაწყობთ იდეალურ ტექსტს
      const fallbackObj = GEMINI_ENCYCLOPEDIA?.situations || {};
      const formatted = 
        "🔹 როცა ბედნიერია — " + (fallbackObj.happy || "") + "\\n\\n" +
        "🔹 როცა გაბრაზებულია — " + (fallbackObj.angry || "") + "\\n\\n" +
        "🔹 როცა ნაწყენია — " + (fallbackObj.hurt || "") + "\\n\\n" +
        "🔹 როცა სტრესშია — " + (fallbackObj.stressed || "") + "\\n\\n" +
        "🔹 როცა მოწყენილია — " + (fallbackObj.bored || "") + "\\n\\n" +
        "🔹 როცა რაღაც ძალიან აინტერესებს — " + (fallbackObj.interested || "") + "\\n\\n" +
        "🔹 როცა რაღაც აღარ აინტერესებს — " + (fallbackObj.uninterested || "") + "\\n\\n" +
        "🔹 როცა არჩევანის წინაშეა — " + (fallbackObj.choosing || "") + "\\n\\n" +
        "🔹 როცა მოულოდნელი ცვლილება ხდება — " + (fallbackObj.changing || "") + "\\n\\n" +
        "🔹 როცა მარტო რჩება — " + (fallbackObj.alone || "") + "\\n\\n" +
        "🔹 როცა ვინმე არ ეთანხმება — " + (fallbackObj.disagreeing || "") + "\\n\\n" +
        "🔹 როცა დიდი მიზანი აქვს — " + (fallbackObj.goals || "");
      setSituationsAiText(formatted);
    }
  } catch (e) {
    // სრული დაცვა შეცდომებისგან
    const fallbackObj = GEMINI_ENCYCLOPEDIA?.situations || {};
    const formatted = 
      "🔹 როცა ბედნიერია — " + (fallbackObj.happy || "") + "\\n\\n" +
      "🔹 როცა გაბრაზებულია — " + (fallbackObj.angry || "") + "\\n\\n" +
      "🔹 როცა ნაწყენია — " + (fallbackObj.hurt || "") + "\\n\\n" +
      "🔹 როცა სტრესშია — " + (fallbackObj.stressed || "") + "\\n\\n" +
      "🔹 როცა მოწყენილია — " + (fallbackObj.bored || "") + "\\n\\n" +
      "🔹 როცა რაღაც ძალიან აინტერესებს — " + (fallbackObj.interested || "") + "\\n\\n" +
      "🔹 როცა რაღაც აღარ აინტერესებს — " + (fallbackObj.uninterested || "") + "\\n\\n" +
      "🔹 როცა არჩევანის წინაშეა — " + (fallbackObj.choosing || "") + "\\n\\n" +
      "🔹 როცა მოულოდნელი ცვლილება ხდება — " + (fallbackObj.changing || "") + "\\n\\n" +
      "🔹 როცა მარტო რჩება — " + (fallbackObj.alone || "") + "\\n\\n" +
      "🔹 როცა ვინმე არ ეთანხმება — " + (fallbackObj.disagreeing || "") + "\\n\\n" +
      "🔹 როცა დიდი მიზანი აქვს — " + (fallbackObj.goals || "");
    setSituationsAiText(formatted);
  } finally {
    setLoadingSituationsAi(false);
  }
};`;

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
  code = code.substring(0, startIndex) + hybridFunc + code.substring(endIndex);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ ჰიბრიდული არქიტექტურა წარმატებით ჩაერთო!');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
