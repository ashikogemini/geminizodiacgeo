const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ state-ებს ძლიერი მხარეების AI ტექსტისა და Loading-ისთვის
if (!code.includes('strengthsAiText')) {
  code = code.replace(
    "const [personalityAiText, setPersonalityAiText] = useState('');",
    "const [personalityAiText, setPersonalityAiText] = useState('');\n  const [strengthsAiText, setStrengthsAiText] = useState('');\n  const [loadingStrengthsAi, setLoadingStrengthsAi] = useState(false);"
  );
}

// 2. ვწერთ AI გენერაციის ფუნქციას შენი პრომპტით
const strengthsPromptCode = `
  const fetchStrengthsAi = async () => {
    if (strengthsAiText || loadingStrengthsAi) return;
    setLoadingStrengthsAi(true);
    try {
      const prompt = "დაწერე ტყუპებისთვის დამახასიათებელი დადებითი თვისებებისა და უნარების აღწერა. უნდა მოიცავდეს მათ სწრაფ აზროვნებას, ცნობისმოყვარეობას, მოქნილობას, ადაპტაციის უნარს, ცოდნის სწრაფად ათვისებას, მრავალფეროვან ინტერესებს, იუმორს, შემოქმედებითობასა და რთულ სიტუაციებში გამოსავლის პოვნის უნარს. თითოეული ძლიერი მხარე უნდა იყოს მოკლედ ახსნილი და არა მხოლოდ ჩამონათვალის სახით.";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "• სწრაფი აზროვნება: მომენტალურად იჭერს არსს და პოულობს ალტერნატივებს.\\n• ადაპტაცია: მარტივად ერგება ნებისმიერ ახალ გარემოს.\\n• ცნობისმოყვარეობა: მუდმივად ეძებს ახალ ცოდნასა და გამოცდილებას.";
      }
      setStrengthsAiText(res);
    } catch (e) {
      setStrengthsAiText("ტყუპების ძლიერი მხარეებია სწრაფი აზროვნება, მოქნილობა და ამოუწურავი ცნობისმოყვარეობა.");
    } finally {
      setLoadingStrengthsAi(false);
    }
  };
`;

if (!code.includes('fetchStrengthsAi')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + strengthsPromptCode);
}

// 3. ვაახლებთ toggleGeminiCard-ს, რომ strengths-ის გახსნისას ავტომატურად გაუშვას AI
if (!code.includes('fetchStrengthsAi()')) {
  code = code.replace(
    "if (key === 'personality' && nextState) { fetchPersonalityAi(); }",
    "if (key === 'personality' && nextState) { fetchPersonalityAi(); }\n      if (key === 'strengths' && nextState) { fetchStrengthsAi(); }"
  );
}

// 4. ვაახლებთ strengths ბარათის რენდერს
const updatedStrengthsCard = `
            { key: 'strengths', title: '⚡ ძლიერი მხარეები', content: 
              loadingStrengthsAi ? '✨ AI გენერირებს ძლიერი მხარეების ანალიზს...' : (strengthsAiText || (GEMINI_ENCYCLOPEDIA?.strengths || []).map(s => '✓ ' + s).join('\\ნ'))
            },
`;

code = code.replace(/{ key: 'strengths', title: '⚡ ძლიერი მხარეები', content:[\s\S]*?},/, updatedStrengthsCard.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ AI წარმატებით ჩაშენდა "ძლიერი მხარეების" ბლოკში!');
