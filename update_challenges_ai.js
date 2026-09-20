const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ state-ებს გამოწვევების AI ტექსტისა და Loading-ისთვის
if (!code.includes('challengesAiText')) {
  code = code.replace(
    "const [strengthsAiText, setStrengthsAiText] = useState('');",
    "const [strengthsAiText, setStrengthsAiText] = useState('');\n  const [challengesAiText, setChallengesAiText] = useState('');\n  const [loadingChallengesAi, setLoadingChallengesAi] = useState(false);"
  );
}

// 2. ვწერთ AI გენერაციის ფუნქციას შენი პრომპტით
const challengesPromptCode = `
  const fetchChallengesAi = async () => {
    if (challengesAiText || loadingChallengesAi) return;
    setLoadingChallengesAi(true);
    try {
      const prompt = "დაწერე ტყუპებისთვის დამახასიათებელი სირთულეებისა და პიროვნული გამოწვევების აღწერა. უნდა მოიცავდეს გაფანტულობას, ინტერესის სწრაფად დაკარგვას, ზედმეტ ფიქრს, გადაწყვეტილების ხშირ შეცვლას, მოუთმენლობას, ერთდროულად ბევრი საქმის დაწყებას და შინაგანი დაძაბულობის დაგროვებას. თითოეული გამოწვევა უნდა იყოს ახსნილი რეალურ ქცევასთან კავშირში, ისე რომ ტექსტი არ ჟღერდეს როგორც უარყოფითი შეფასება, არამედ აჩვენებდეს, რისი მართვა შეიძლება ტყუპებისთვის განსაკუთრებით მნიშვნელოვანი იყოს.";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "• გაფანტულობა და Overthinking: მენტალური გადატვირთვა ხშირად იწვევს ყურადღების გაფანტვას.\\n• ინტერესის ცვლა: როცა სიახლის ეფექტი ქრება, რუტინასთან შეგუება უჭირთ.\\n• გადაწყვეტილებების გადახედვა: დუალიზმის გამო მუდმივად ეძებენ უკეთეს ალტერნატივას.";
      }
      setChallengesAiText(res);
    } catch (e) {
      setChallengesAiText("ტყუპების მთავარი გამოწვევები უკავშირდება ენერგიის გაფანტვას, ზედმეტ ფიქრს და ინტერესის სწრაფ ცვლას.");
    } finally {
      setLoadingChallengesAi(false);
    }
  };
`;

if (!code.includes('fetchChallengesAi')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + challengesPromptCode);
}

// 3. ვაახლებთ toggleGeminiCard-ს, რომ challenges-ის გახსნისას ავტომატურად გაუშვას AI
if (!code.includes('fetchChallengesAi()')) {
  code = code.replace(
    "if (key === 'strengths' && nextState) { fetchStrengthsAi(); }",
    "if (key === 'strengths' && nextState) { fetchStrengthsAi(); }\n      if (key === 'challenges' && nextState) { fetchChallengesAi(); }"
  );
}

// 4. ვაახლებთ challenges ბარათის რენდერს
const updatedChallengesCard = `
            { key: 'challenges', title: '⚠️ გამოწვევები', content: 
              loadingChallengesAi ? '✨ AI გენერირებს გამოწვევების ანალიზს...' : (challengesAiText || (GEMINI_ENCYCLOPEDIA?.challenges || []).map(c => '• ' + c).join('\\ნ'))
            },
`;

code = code.replace(/{ key: 'challenges', title: '⚠️ გამოწვევები', content:[\s\S]*?},/, updatedChallengesCard.trim());

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ AI წარმატებით ჩაშენდა "გამოწვევების" ბლოკში!');
