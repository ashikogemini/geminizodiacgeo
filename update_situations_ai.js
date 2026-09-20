const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ state-ებს სიტუაციების AI ტექსტისა და Loading-ისთვის
if (!code.includes('situationsAiText')) {
  code = code.replace(
    "const [challengesAiText, setChallengesAiText] = useState('');",
    "const [challengesAiText, setChallengesAiText] = useState('');\n  const [situationsAiText, setSituationsAiText] = useState('');\n  const [loadingSituationsAi, setLoadingSituationsAi] = useState(false);"
  );
}

// 2. ვწერთ AI გენერაციის ფუნქციას შენი პრომპტით
const situationsPromptCode = `
  const fetchSituationsAi = async () => {
    if (situationsAiText || loadingSituationsAi) return;
    setLoadingSituationsAi(true);
    try {
      const prompt = "დაწერე აღწერა, როგორ შეიძლება გამოვლინდეს ტყუპების ხასიათი კონკრეტულ ყოველდღიურ და ემოციურ სიტუაციებში. აქ ყურადღება უნდა გამახვილდეს ქცევაზე და რეაქციებზე და არა ზოგად პიროვნულ თვისებებზე. მოიცავდეს შემდეგ სიტუაციებს: როცა ბედნიერია, როცა გაბრაზებულია, როცა ნაწყენია, როცა სტრესშია, როცა მოწყენილია, როცა რაღაც ძალიან აინტერესებს, როცა რაღაც აღარ აინტერესებს, როცა არჩევანის წინაშეა, როცა მოულოდნელი ცვლილება ხდება, როცა მარტო რჩება, როცა ვინმე არ ეთანხმება, როცა დიდი მიზანი აქვს. მთავარი იდეა: როგორია ტყუპები კონკრეტულ მომენტში?";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "🎉 ბედნიერი: ასხივებს ენერგიას, ხუმრობს და გარშემოყოფებს მუხტავს.\\n🔥 გაბრაზებული: იყენებს მწარე სარკაზმსა და რკინისებურ ლოგიკას.\\n🌪️ სტრესში: იწყებს ქაოტურ მოძრაობას და რამდენიმე საქმის ერთდროულად გაკონტროლებას.\\n☕ მოწყენილი: მყისიერად ეძებს ახალ შთაგონებას ან ტოვებს სივრცეს.";
      }
      setSituationsAiText(res);
    } catch (e) {
      setSituationsAiText("ტყუპების ქცევა სიტუაციების მიხედვით სწრაფად იცვლება — ბედნიერებისას ასხივებენ ენერგიას, სტრესისას გადადიან ჰიპერაქტიურობაში, ხოლო მოწყენილობისას მყისიერად ეძებენ სიახლეს.");
    } finally {
      setLoadingSituationsAi(false);
    }
  };
`;

if (!code.includes('fetchSituationsAi')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + situationsPromptCode);
}

// 3. ვაახლებთ toggleGeminiCard-ს, რომ situations-ის გახსნისას ავტომატურად გაუშვას AI
if (!code.includes('fetchSituationsAi()')) {
  code = code.replace(
    "if (key === 'challenges' && nextState) { fetchChallengesAi(); }",
    "if (key === 'challenges' && nextState) { fetchChallengesAi(); }\n      if (key === 'situations' && nextState) { fetchSituationsAi(); }"
  );
}

// 4. ვაახლებთ situations ბარათის რენდერს
const updatedSituationsCard = `
            { key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content: 
              loadingSituationsAi ? '✨ AI გენერირებს სიტუაციურ ანალიზს...' : (situationsAiText || \`🎉 ბედნიერი: \${GEMINI_ENCYCLOPEDIA?.situations?.happy || ''}\\ნ🔥 გაბრაზებული: \${GEMINI_ENCYCLOPEDIA?.situations?.angry || ''}\`)
            },
`;

code = code.replace(/{ key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content:[\s\S]*?},/, updatedSituationsCard.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ AI წარმატებით ჩაშენდა "ტყუპები სხვადასხვა სიტუაციაში" ბლოკში!');
