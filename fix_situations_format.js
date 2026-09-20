const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const updatedSituationsAi = `
  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "აღწერე, როგორ შეიძლება გამოვლინდეს ტყუპების ხასიათი კონკრეტულ ყოველდღიურ და ემოციურ სიტუაციებში (ქცევები და რეაქციები). აუცილებელი წესი: პასუხი დააბრუნე მკაცრად სტრუქტურირებული სახით. არავითარ შემთხვევაში არ გამოიყენო Markdown ფორმატირება (არ გამოიყენო ** ვარსკვლავები ტექსტის გასამუქებლად), რადგან აპლიკაცია ვერ აღიქვამს. ყოველი სიტუაცია აუცილებლად გამოყოფილი უნდა იყოს ცარიელი ხაზით (გამოიყენე ორმაგი Enter). თითოეული დაიწყე ემოჯით და ასეთი ფორმატით:\\n\\n🔹 როცა ბედნიერია — [აღწერა]\\n\\n🔹 როცა გაბრაზებულია — [აღწერა]\\n\\nდა ასე მიყევი 12-ვე სიტუაციას: ნაწყენია, სტრესშია, მოწყენილია, ძალიან აინტერესებს რაღაც, აღარ აინტერესებს, არჩევანის წინაშეა, მოულოდნელი ცვლილება ხდება, მარტო რჩება, ვინმე არ ეთანხმება, დიდი მიზანი აქვს.";
      
      const liveResult = await fetchGeminiLive(prompt);
      if (liveResult) {
        setSituationsAiText(liveResult);
      } else {
        setSituationsAiText(Object.values(GEMINI_ENCYCLOPEDIA?.situations || {}).join('\\n\\n'));
      }
    } catch (e) {
      setSituationsAiText(Object.values(GEMINI_ENCYCLOPEDIA?.situations || {}).join('\\n\\n'));
    } finally {
      setLoadingSituationsAi(false);
    }
  };
`;

const regex = /const fetchSituationsAi = async \(\) => \{[\s\S]*?setLoadingSituationsAi\(false\);\n    \}\n  \};/;
if (regex.test(code)) {
  code = code.replace(regex, updatedSituationsAi.trim());
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ პრომპტი განახლდა! ახლა ტექსტი სუფთად და დაყოფილად გამოჩნდება.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
