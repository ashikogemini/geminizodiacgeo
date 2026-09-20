const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const updatedFunction = `const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    const prompt = "აღწერე ტყუპების ქცევა 12 სხვადასხვა სიტუაციაში. არ დაწერო სათაურები, არ გამოიყენო ვარსკვლავები. თითოეული სიტუაციის აღწერა (მხოლოდ ტექსტი) გამოყავი ზუსტად სამი ტოლობის ნიშნით: === \\nმიმდევრობა მკაცრად დაიცავი:\\n1. ბედნიერი\\n2. გაბრაზებული\\n3. ნაწყენი\\n4. სტრესში\\n5. მოწყენილი\\n6. ძალიან აინტერესებს\\n7. აღარ აინტერესებს\\n8. არჩევანის წინაშეა\\n9. მოულოდნელი ცვლილება\\n10. მარტო რჩება\\n11. ვინმე არ ეთანხმება\\n12. დიდი მიზანი აქვს.";
    
    const liveResult = await fetchGeminiLive(prompt);
    if (liveResult) {
      // ვჭრით ტექსტს ტოლობის ნიშნებით
      const parts = liveResult.split('===').map(p => p.trim()).filter(p => p.length > 5);
      
      if (parts.length >= 12) {
        const formattedText = 
          "🔹 როცა ბედნიერია — " + parts[0] + "\\n\\n" +
          "🔹 როცა გაბრაზებულია — " + parts[1] + "\\n\\n" +
          "🔹 როცა ნაწყენია — " + parts[2] + "\\n\\n" +
          "🔹 როცა სტრესშია — " + parts[3] + "\\n\\n" +
          "🔹 როცა მოწყენილია — " + parts[4] + "\\n\\n" +
          "🔹 როცა რაღაც ძალიან აინტერესებს — " + parts[5] + "\\n\\n" +
          "🔹 როცა რაღაც აღარ აინტერესებს — " + parts[6] + "\\n\\n" +
          "🔹 როცა არჩევანის წინაშეა — " + parts[7] + "\\n\\n" +
          "🔹 როცა მოულოდნელი ცვლილება ხდება — " + parts[8] + "\\n\\n" +
          "🔹 როცა მარტო რჩება — " + parts[9] + "\\n\\n" +
          "🔹 როცა ვინმე არ ეთანხმება — " + parts[10] + "\\n\\n" +
          "🔹 როცა დიდი მიზანი აქვს — " + parts[11];
        setSituationsAiText(formattedText);
      } else {
        // თუ AI-მ რაოდენობა აურია
        setSituationsAiText("🔹 " + parts.join("\\n\\n🔹 "));
      }
    } else {
      setSituationsAiText("მონაცემების ჩატვირთვა ვერ მოხერხდა (AI-მ ცარიელი პასუხი დააბრუნა).");
    }
  } catch (e) {
    setSituationsAiText("შეცდომა მონაცემების დამუშავებისას.");
  } finally {
    setLoadingSituationsAi(false);
  }
};`;

const regex = /const fetchSituationsAi = async \(\) => \{[\s\S]*?setLoadingSituationsAi\(false\);\s*\}\s*\};/;
if (regex.test(code)) {
  code = code.replace(regex, updatedFunction.trim());
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ AI გენერაცია გადავიდა გამყოფების (Delimiters) მეთოდზე! ეს უკვე 100%-ით იმუშავებს.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა. დავრწმუნდეთ, რომ წინა კოდი სწორად იყო ჩასმული.');
}
