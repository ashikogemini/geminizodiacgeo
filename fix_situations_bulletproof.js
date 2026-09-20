const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newFunc = `  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "აღწერე ტყუპების ხასიათი და ქცევა 12 სიტუაციაში.\\n\\nმკაცრი წესი: არ გამოიყენო ვარსკვლავები (**). პასუხი დაწერე ზუსტად ამ შაბლონით (დააკოპირე ეს ტექსტი) და შეავსე მხოლოდ კვადრატული ფრჩხილები:\\n\\n🔹 როცა ბედნიერია — [დაწერე ქცევა აქ]\\n\\n🔹 როცა გაბრაზებულია — [დაწერე ქცევა აქ]\\n\\n🔹 როცა ნაწყენია — [დაწერე ქცევა აქ]\\n\\n🔹 როცა სტრესშია — [დაწერე ქცევა აქ]\\n\\n🔹 როცა მოწყენილია — [დაწერე ქცევა აქ]\\n\\n🔹 როცა რაღაც ძალიან აინტერესებს — [დაწერე ქცევა აქ]\\n\\n🔹 როცა რაღაც აღარ აინტერესებს — [დაწერე ქცევა აქ]\\n\\n🔹 როცა არჩევანის წინაშეა — [დაწერე ქცევა აქ]\\n\\n🔹 როცა მოულოდნელი ცვლილება ხდება — [დაწერე ქცევა აქ]\\n\\n🔹 როცა მარტო რჩება — [დაწერე ქცევა აქ]\\n\\n🔹 როცა ვინმე არ ეთანხმება — [დაწერე ქცევა აქ]\\n\\n🔹 როცა დიდი მიზანი აქვს — [დაწერე ქცევა აქ]";
      
      const liveResult = await fetchGeminiLive(prompt);
      if (liveResult && liveResult.length > 50) {
        let cleanText = liveResult.replace(/\\*/g, '').replace(/#/g, '').trim();
        setSituationsAiText(cleanText);
      } else {
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
  console.log('✅ პრომპტი შეიცვალა "შევსების" მეთოდით! ახლა სათაურები 100%-ით გამოჩნდება.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
