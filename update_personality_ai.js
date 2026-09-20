const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ state-ებს პიროვნებისა და ხასიათის AI ტექსტისა და Loading-ისთვის
if (!code.includes('personalityAiText')) {
  code = code.replace(
    "const [overviewAiText, setOverviewAiText] = useState('');",
    "const [overviewAiText, setOverviewAiText] = useState('');\n  const [personalityAiText, setPersonalityAiText] = useState('');\n  const [loadingPersonalityAi, setLoadingPersonalityAi] = useState(false);"
  );
}

// 2. ვწერთ AI გენერაციის ფუნქციას შენი ახალი პრომპტით
const personalityPromptCode = `
  const fetchPersonalityAi = async () => {
    if (personalityAiText || loadingPersonalityAi) return;
    setLoadingPersonalityAi(true);
    try {
      const prompt = "დაწერე დეტალური აღწერა იმისა, როგორია ტყუპების შინაგანი ბუნება და ქცევითი სტილი. უნდა მოიცავდეს მათ აზროვნებას, ინტერესებს, ემოციურ რეაქციებს, ადამიანებთან დამოკიდებულებას, ცვლილებებისადმი დამოკიდებულებას, გადაწყვეტილების მიღების სტილს, ცნობისმოყვარეობას და შინაგან წინააღმდეგობებს. აქ უნდა გამოჩნდეს ტყუპების ხასიათის როგორც გამორჩეული, ისე რთული მხარეები, მაგრამ სხვა ბლოკების — სიყვარულის, მეგობრობის, კარიერისა და კომუნიკაციის — დეტალური განხილვის გარეშე.";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "ტყუპების შინაგანი ბუნება გამოირჩევა მაღალი ინტელექტუალური დინამიკითა და დუალიზმით. მათი აზროვნება სწრაფი და ანალიტიკურია, ცნობისმოყვარეობა — დაუოკებელი. ისინი ადვილად იღებენ ცვლილებებს, თუმცა შინაგანად ხშირად ებრძვიან გადაწყვეტილებების მიღების პროცესსა და ინტერესების სწრაფ ცვლას.";
      }
      setPersonalityAiText(res);
    } catch (e) {
      setPersonalityAiText("ტყუპების შინაგანი ბუნება გამოირჩევა მაღალი ინტელექტუალური დინამიკითა და დუალიზმით.");
    } finally {
      setLoadingPersonalityAi(false);
    }
  };
`;

if (!code.includes('fetchPersonalityAi')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + personalityPromptCode);
}

// 3. ვაახლებთ toggleGeminiCard-ს, რომ personality-ს გახსნისას ავტომატურად გაუშვას AI
if (!code.includes('fetchPersonalityAi()')) {
  code = code.replace(
    "if (key === 'overview' && nextState) { fetchOverviewAi(); }",
    "if (key === 'overview' && nextState) { fetchOverviewAi(); }\n      if (key === 'personality' && nextState) { fetchPersonalityAi(); }"
  );
}

// 4. ვაახლებთ personality ბარათის რენდერს
const updatedPersonalityCard = `
            { key: 'personality', title: '🧠 პიროვნება და ხასიათი', content: 
              loadingPersonalityAi ? '✨ AI გენერირებს პიროვნების დეტალურ აღწერას...' : (personalityAiText || \`• აზროვნება: \${GEMINI_ENCYCLOPEDIA?.personality?.thinking || ''}\\ნ• საუბარი: \${GEMINI_ENCYCLOPEDIA?.personality?.talking || ''}\\ნ• ქცევა: \${GEMINI_ENCYCLOPEDIA?.personality?.behavior || ''}\`)
            },
`;

code = code.replace(/{ key: 'personality', title: '🧠 პიროვნება და ხასიათი', content:[\s\S]*?},/, updatedPersonalityCard.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ AI წარმატებით ჩაშენდა "პიროვნება და ხასიათის" ბლოკში!');
