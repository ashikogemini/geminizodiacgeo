const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. რეალური Gemini API ფუნქცია
const realGeminiFetchCode = `
  const fetchGeminiLive = async (promptText) => {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ API Key ვერ მოიძებნა .env ფაილში!");
      return null;
    }
    try {
      const response = await fetch(
        \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error("AI Fetch Error:", error);
      return null;
    }
  };
`;

if (!code.includes('fetchGeminiLive')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + realGeminiFetchCode);
}

// 2. განვაახლოთ სიტუაციების AI ფუნქცია, რომ რეალური API გამოიყენოს
const updatedSituationsAi = `
  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "აღწერე, როგორ შეიძლება გამოვლინდეს ტყუპების ხასიათი კონკრეტულ ყოველდღიურ და ემოციურ სიტუაციებში. აქ ყურადღება უნდა გამახვილდეს ქცევაზე და რეაქციებზე და არა ზოგად პიროვნულ თვისებებზე. მოიცავდეს ცალკე სიტუაციებს: როცა ბედნიერია — როგორ გამოხატავს სიხარულს და როგორ იქცევა სხვებთან. როცა გაბრაზებულია — რა იწვევს გაღიზიანებას და როგორ რეაგირებს. როცა ნაწყენია — როგორ იქცევა, როცა ემოციურად დაზარალებულია. როცა სტრესშია — როგორ იცვლება მისი ქცევა და აზროვნება. როცა მოწყენილია — როგორ ცდილობს მდგომარეობიდან გამოსვლას. როცა რაღაც ძალიან აინტერესებს — როგორ იძირება ახალ თემაში და როგორ ეძებს ინფორმაციას. როცა რაღაც აღარ აინტერესებს — როგორ კარგავს მოტივაციას და ყურადღებას. როცა არჩევანის წინაშეა — როგორ აანალიზებს სხვადასხვა შესაძლებლობას. როცა მოულოდნელი ცვლილება ხდება — როგორ ეგუება ახალ გარემოებას. როცა მარტო რჩება — როგორ იყენებს საკუთარ დროს და რაზე გადააქვს ყურადღება. როცა ვინმე არ ეთანხმება — როგორ გამოხატავს საკუთარ პოზიციას და რეაგირებს განსხვავებულ აზრზე. როცა დიდი მიზანი აქვს — როგორ იწყებს მოქმედებას და რა შეიძლება შეუშალოს ხელი. ამ ბლოკის მთავარი იდეა იქნება: „როგორია ტყუპები კონკრეტულ მომენტში?“. თითოეული სიტუაცია გამოყავი ცალკე აბზაცად ან ბულეტად.";
      
      const liveResult = await fetchGeminiLive(prompt);
      if (liveResult) {
        setSituationsAiText(liveResult);
      } else {
        setSituationsAiText(Object.values(GEMINI_ENCYCLOPEDIA?.situations |
{}).join('\\ნ\\ნ'));
      }
    } catch (e) {
      setSituationsAiText(Object.values(GEMINI_ENCYCLOPEDIA?.situations |
{}).join('\\ნ\\ნ'));
    } finally {
      setLoadingSituationsAi(false);
    }
  };
`;

const regex = /const fetchSituationsAi = async \(\) => \{[\s\S]*?setLoadingSituationsAi\(false\);\n    \}\n  \};/;
if (regex.test(code)) {
  code = code.replace(regex, updatedSituationsAi.trim());
}

// 3. ვაახლებთ რენდერს
const liveSituationsRender = `
            { key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content: 
              loadingSituationsAi ? '✨ AI გენერირებს სიტუაციურ ანალიზს...' : (situationsAiText || Object.values(GEMINI_ENCYCLOPEDIA?.situations |
{}).join('\\ნ\\ნ'))
            },
`;

code = code.replace(/{ key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content:[\s\S]*?},/, liveSituationsRender.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ფაილი შეიქმნა და რეალური Gemini API წარმატებით ჩაემატა!');
