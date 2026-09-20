const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const newFunc = `  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const promptText = "დაწერე ტყუპების ქცევა 12 სიტუაციაში. დააბრუნე მკაცრად JSON ობიექტი, სადაც key არის სიტუაციის დასახელება (მაგ: 'როცა ბედნიერია', 'როცა გაბრაზებულია'), ხოლო value არის ამ სიტუაციაში ქცევის აღწერა (მინიმუმ 2 წინადადება). სულ ზუსტად 12 სიტუაციაა: როცა ბედნიერია, როცა გაბრაზებულია, როცა ნაწყენია, როცა სტრესშია, როცა მოწყენილია, როცა ძალიან აინტერესებს, როცა აღარ აინტერესებს, როცა არჩევანის წინაშეა, მოულოდნელი ცვლილება, მარტო რჩება, ვინმე არ ეთანხმება, დიდი მიზანი აქვს.";
      
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const response = await fetch(
        \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            // აქ ვრთავთ Native JSON რეჟიმს!
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );
      const data = await response.json();
      const jsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonString) {
        const parsed = JSON.parse(jsonString);
        let formattedText = "";
        for (const [key, value] of Object.entries(parsed)) {
          formattedText += \`🔹 \${key} — \${value}\\n\\n\`;
        }
        setSituationsAiText(formattedText.trim());
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

const regex = /const fetchSituationsAi = async \(\) => \{[\s\S]*?setLoadingSituationsAi\(false\);\s*\}\s*\};/;
if (regex.test(code)) {
  code = code.replace(regex, newFunc.trim());
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ API პირდაპირ JSON რეჟიმზე გადაერთო! ახლა შეკვეცა ფიზიკურად შეუძლებელია.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
