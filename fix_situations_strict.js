const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const updatedSituationsAi = `
  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "აღწერე ტყუპების ქცევა 12 სხვადასხვა სიტუაციაში. უმკაცრესი წესი: არ გამოიყენო Markdown (** ვარსკვლავები). აუცილებლად დაწერე თავად სიტუაციის დასახელებაც! პასუხი დააბრუნე ზუსტად ამ შაბლონით (შეავსე მხოლოდ აღწერები და დატოვე ცარიელი ხაზები მათ შორის):\\n\\n🔹 როცა ბედნიერია — [აღწერე ქცევა]\\n\\n🔹 როცა გაბრაზებულია — [აღწერე ქცევა]\\n\\n🔹 როცა ნაწყენია — [აღწერე ქცევა]\\n\\n🔹 როცა სტრესშია — [აღწერე ქცევა]\\n\\n🔹 როცა მოწყენილია — [აღწერე ქცევა]\\n\\n🔹 როცა რაღაც ძალიან აინტერესებს — [აღწერე ქცევა]\\n\\n🔹 როცა რაღაც აღარ აინტერესებს — [აღწერე ქცევა]\\n\\n🔹 როცა არჩევანის წინაშეა — [აღწერე ქცევა]\\n\\n🔹 როცა მოულოდნელი ცვლილება ხდება — [აღწერე ქცევა]\\n\\n🔹 როცა მარტო რჩება — [აღწერე ქცევა]\\n\\n🔹 როცა ვინმე არ ეთანხმება — [აღწერე ქცევა]\\n\\n🔹 როცა დიდი მიზანი აქვს — [აღწერე ქცევა]";
      
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
  console.log('✅ პრომპტი გამკაცრდა! ახლა სიტუაციების დასახელებები აუცილებლად გამოჩნდება.');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
