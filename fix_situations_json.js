const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const updatedSituationsAi = `const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "დაწერე ტყუპების ქცევა 12 სხვადასხვა სიტუაციაში. დააბრუნე მხოლოდ ვალიდური JSON ობიექტი შემდეგი გასაღებებით (keys): happy, angry, hurt, stressed, bored, interested, uninterested, choosing, changing, alone, disagreeing, goals. თითოეული გასაღების მნიშვნელობა (value) უნდა იყოს ტყუპების ქცევის მოკლე აღწერა ქართულად ამ კონკრეტულ სიტუაციაში (მაგ: 'ასხივებს პოზიტიურ ენერგიას...'). არ გამოიყენო Markdown, არ ჩასვა \`\`\`json ბლოკში. დააბრუნე პირდაპირ სუფთა JSON ობიექტი.";
      
      const liveResult = await fetchGeminiLive(prompt);
      if (liveResult) {
        // ვასუფთავებთ პასუხს, რომ მხოლოდ სუფთა JSON დარჩეს
        let cleanJson = liveResult.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
        let parsed = JSON.parse(cleanJson);
        
        // აქ აპლიკაცია თავად აწყობს დიზაინს და სათაურებს
        let formattedText = 
          "🔹 როცა ბედნიერია — " + (parsed.happy || "") + "\\n\\n" +
          "🔹 როცა გაბრაზებულია — " + (parsed.angry || "") + "\\n\\n" +
          "🔹 როცა ნაწყენია — " + (parsed.hurt || "") + "\\n\\n" +
          "🔹 როცა სტრესშია — " + (parsed.stressed || "") + "\\n\\n" +
          "🔹 როცა მოწყენილია — " + (parsed.bored || "") + "\\n\\n" +
          "🔹 როცა რაღაც ძალიან აინტერესებს — " + (parsed.interested || "") + "\\n\\n" +
          "🔹 როცა რაღაც აღარ აინტერესებს — " + (parsed.uninterested || "") + "\\n\\n" +
          "🔹 როცა არჩევანის წინაშეა — " + (parsed.choosing || "") + "\\n\\n" +
          "🔹 როცა მოულოდნელი ცვლილება ხდება — " + (parsed.changing || "") + "\\n\\n" +
          "🔹 როცა მარტო რჩება — " + (parsed.alone || "") + "\\n\\n" +
          "🔹 როცა ვინმე არ ეთანხმება — " + (parsed.disagreeing || "") + "\\n\\n" +
          "🔹 როცა დიდი მიზანი აქვს — " + (parsed.goals || "");
          
        setSituationsAiText(formattedText);
      } else {
        setSituationsAiText("მონაცემების ჩატვირთვა ვერ მოხერხდა.");
      }
    } catch (e) {
      console.error("JSON Parse Error:", e);
      setSituationsAiText("შეცდომა მონაცემების დამუშავებისას. სცადეთ თავიდან.");
    } finally {
      setLoadingSituationsAi(false);
    }
  };`;

const funcStart = code.indexOf('const fetchSituationsAi = async () => {');
const finallyIdx = code.indexOf('setLoadingSituationsAi(false);', funcStart);

if (funcStart !== -1 && finallyIdx !== -1) {
    const funcEnd = code.indexOf('};', finallyIdx) + 2;
    code = code.substring(0, funcStart) + updatedSituationsAi + code.substring(funcEnd);
    fs.writeFileSync('App.js', code, 'utf8');
    console.log('✅ AI გენერაცია გადავიდა დაცულ JSON ფორმატზე! დიზაინი იდეალური იქნება.');
} else {
    console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
