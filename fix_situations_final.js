const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newFunc = `  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "აღწერე ტყუპების ხასიათი და ქცევა 12 კონკრეტულ სიტუაციაში. თითოეული სიტუაცია დაიწყე შესაბამისი ემოჯით და სიტუაციის დასახელებით. სიტუაციებია: 1. როცა ბედნიერია, 2. როცა გაბრაზებულია, 3. როცა ნაწყენია, 4. როცა სტრესშია, 5. როცა მოწყენილია, 6. როცა ძალიან აინტერესებს რაღაც, 7. როცა აღარ აინტერესებს, 8. არჩევანის წინაშეა, 9. მოულოდნელი ცვლილება ხდება, 10. მარტო რჩება, 11. ვინმე არ ეთანხმება, 12. როცა დიდი მიზანი აქვს. ტექსტი დაწერე ბუნებრივად, ყოველი სიტუაცია გამოყავი აბზაცით.";
      
      const liveResult = await fetchGeminiLive(prompt);
      if (liveResult && liveResult.trim().length > 10) {
        // Javascript პროგრამულად შლის ყველა ვარსკვლავს (*) და ჰეშთეგს (#) ეკრანზე გამოტანამდე
        let cleanText = liveResult.replace(/\\*/g, '').replace(/#/g, '').trim();
        setSituationsAiText(cleanText);
      } else {
        // თუ AI-მ რაიმე მიზეზით ცარიელი პასუხი დააბრუნა, ვაჩვენებთ გამართულ სარეზერვო ბაზას
        const fallback = Object.values(GEMINI_ENCYCLOPEDIA?.situations || {}).join('\\n\\n🔹 ');
        setSituationsAiText("🔹 " + fallback);
      }
    } catch (e) {
      const fallback = Object.values(GEMINI_ENCYCLOPEDIA?.situations || {}).join('\\n\\n🔹 ');
      setSituationsAiText("🔹 " + fallback);
    } finally {
      setLoadingSituationsAi(false);
    }
  };`;

const funcStart = code.indexOf('const fetchSituationsAi = async () => {');
const finallyIdx = code.indexOf('setLoadingSituationsAi(false);', funcStart);

if (funcStart !== -1 && finallyIdx !== -1) {
  const funcEnd = code.indexOf('};', finallyIdx) + 2;
  code = code.substring(0, funcStart) + newFunc + code.substring(funcEnd);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ იდეალური მიდგომა დაინერგა! ტექსტი ავტომატურად გასუფთავდება, ერორის დროს კი ბაზა ჩაიტვირთება.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
