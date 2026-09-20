const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ state-ებს ზოგადი მიმოხილვის AI ტექსტისა და Loading-ისთვის
if (!code.includes('overviewAiText')) {
  code = code.replace(
    "const [geminiOpen, setGeminiOpen] = useState({});",
    "const [geminiOpen, setGeminiOpen] = useState({});\n  const [overviewAiText, setOverviewAiText] = useState('');\n  const [loadingOverviewAi, setLoadingOverviewAi] = useState(false);"
  );
}

// 2. ვწერთ AI გენერაციის ფუნქციას შენი ზუსტი პრომპტით
const overviewPromptCode = `
  const fetchOverviewAi = async () => {
    if (overviewAiText || loadingOverviewAi) return;
    setLoadingOverviewAi(true);
    try {
      const prompt = "დაწერე მოკლე და საინტერესო ტექსტი, რომელიც მომხმარებელს ზოგადად გააცნობს ტყუპების ზოდიაქოს ნიშანს. აღწერაში უნდა ჩანდეს ნიშნის ძირითადი არსი, სტიქია, მმართველი პლანეტა, მთავარი ენერგია, აზროვნებისა და კომუნიკაციის თავისებურებები და ის, რით გამოირჩევა ტყუპები სხვა ნიშნებისგან. ტექსტი უნდა იყოს მარტივად წასაკითხი, თანამედროვე და ინფორმაციული, ზედმეტი დეტალებისა და სხვა ბლოკებში განსახილველი თემების გამეორების გარეშე.";
      
      // ვიყენებთ აპლიკაციაში უკვე არსებულ AI ფუნქციას
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "ტყუპები ზოდიაქოს ყველაზე დინამიური და ცნობისმოყვარე ჰაერის ნიშანია, რომელსაც მერკური მართავს. იგი გამოირჩევა ელვისებური აზროვნებით, კომუნიკაციის უბადლო ნიჭითა და ცვლილებებთან მყისიერი ადაპტაციით.";
      }
      setOverviewAiText(res);
    } catch (e) {
      setOverviewAiText("ტყუპები ზოდიაქოს ყველაზე დინამიური და ცნობისმოყვარე ჰაერის ნიშანია, რომელსაც მერკური მართავს.");
    } finally {
      setLoadingOverviewAi(false);
    }
  };
`;

if (!code.includes('fetchOverviewAi')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + overviewPromptCode);
}

// 3. ვაახლებთ toggleGeminiCard-ს, რომ overview-ს გახსნისას ავტომატურად გაუშვას AI
if (!code.includes('fetchOverviewAi()')) {
  code = code.replace(
    "setGeminiOpen(prev => ({ ...prev, [key]: !prev[key] }));",
    "setGeminiOpen(prev => {\n      const nextState = !prev[key];\n      if (key === 'overview' && nextState) { fetchOverviewAi(); }\n      return { ...prev, [key]: nextState };\n    });"
  );
}

// 4. ვაახლებთ overview ბარათის რენდერს
const updatedOverviewCard = `
            { key: 'overview', title: '♊ ზოგადი მიმოხილვა', content: 
              loadingOverviewAi ? '✨ AI გენერირებს ზოგად მიმოხილვას...' : (overviewAiText || \`პერიოდი: \${GEMINI_ENCYCLOPEDIA?.overview?.period || ''}\\ნსტიქია: \${GEMINI_ENCYCLOPEDIA?.overview?.element || ''}\\ნმმართველი პლანეტა: \${GEMINI_ENCYCLOPEDIA?.overview?.rulingPlanet || ''}\\ნმოდალობა: \${GEMINI_ENCYCLOPEDIA?.overview?.modality || ''}\\ნ\\ნ\${GEMINI_ENCYCLOPEDIA?.overview?.essence || ''}\`)
            },
`;

code = code.replace(/{ key: 'overview', title: '♊ ზოგადი მიმოხილვა', content:[\s\S]*?},/, updatedOverviewCard.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ AI წარმატებით ჩაშენდა ზოგად მიმოხილვაში!');
