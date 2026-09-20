const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const nextBlocksCode = `
  const [challengesAiText, setChallengesAiText] = React.useState('');
  const [loadingChallengesAi, setLoadingChallengesAi] = React.useState(false);

  const [communicationAiText, setCommunicationAiText] = React.useState('');
  const [loadingCommunicationAi, setLoadingCommunicationAi] = React.useState(false);

  const [loveAiText, setLoveAiText] = React.useState('');
  const [loadingLoveAi, setLoadingLoveAi] = React.useState(false);

  const fetchChallengesAi = async () => {
    if (challengesAiText || loadingChallengesAi) return;
    setLoadingChallengesAi(true);
    try {
      const prompt = "აღწერე ტყუპების პიროვნული გამოწვევები: გაფანტულობა, ინტერესის სწრაფად დაკარგვა, ზედმეტი ფიქრი, გადაწყვეტილების ხშირი შეცვლა, მოუთმენლობა, ერთდროულად ბევრი საქმის დაწყება და შინაგანი დაძაბულობის დაგროვება. თითოეული ახსენი რეალურ ქცევასთან კავშირში, პოზიტიური და დამხმარე ტონით.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setChallengesAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setChallengesAiText(
        "🔹 გაფანტულობა და ზედმეტი ფიქრი — გონებაში მიმდინარე მუდმივი პროცესების გამო, ტყუპებს ხშირად უჭირთ ერთ საქმეზე ფოკუსირება და წვრილმანებზე ზედმეტი ანალიზი იწყება.\\n\\n" +
        "🔹 ინტერესის სწრაფად დაკარგვა — თუ საქმემ ან თემამ თავდაპირველი ენთუզიაზმი დაკარგა, ტყუპები უნებლიეთ კარგავენ მოტივაციას და ბოლომდე მიყვანა უჭირთ.\\n\\n" +
        "🔹 გადაწყვეტილების ხშირი შეცვლა და მოუთმენლობა — ახალი დეტალების გაჩენასთან ერთად, მათი პოზიცია შეიძლება რადიკალურად შეიცვალოს, შედეგების მიღება კი რაც შეიძლება სწრაფად სურთ.\\n\\n" +
        "🔹 ერთდროულად ბევრი საქმის დაწყება — ჰარმონიის შენარჩუნება ზოგჯერ ირღვევა, როცა ისინი ცდილობენ ყველაფერი ერთდროულად აკონტროლონ, რაც შინაგანი დაძაბულობის დაგროვებას იწვევს."
      );
    } finally {
      setLoadingChallengesAi(false);
    }
  };

  const fetchCommunicationAi = async () => {
    if (communicationAiText || loadingCommunicationAi) return;
    setLoadingCommunicationAi(true);
    try {
      const prompt = "აღწერე ტყუპების კომუნიკაციის სტილი: როგორ ამყარებენ კონტაქტს, გადასცემენ ინფორმაციას, რა ტიპის საუბარი იზიდავთ, დისკუსიისა და კამათის მანერა, ვერბალური მოქნილობა და იუმორი. ყურადღება გამახვილდეს მხოლოდ კომუნიკაციაზე.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setCommunicationAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setCommunicationAiText(
        "🔹 ვერბალური მოქნილობა და ადაპტაცია — ტყუპები ოსტატურად ცვლიან საუბრის ტონსა და ლექსიკას მსმენელის მიხედვით, ადვილად ამყარებენ კონტაქტს ნებისმიერ ადამიანთან.\\n\\n" +
        "🔹 ინტელექტუალური დებატები — მათ იზიდავთ ცოცხალი, დინამიკური და არასტანდარტული თემები; კამათში ისინი ძლიერ არგუმენტებს და ირონიულ იუმორს იყენებენ.\\n\\n" +
        "🔹 კითხვების დასმის ხელოვნება — საუბრისას ისინი აქტიურად სვამენ კითხვებს, აგროვებენ ახალ ინფორმაციას და სხვებსაც აზრთა გაცვლისკენ უბიძგებენ."
      );
    } finally {
      setLoadingCommunicationAi(false);
    }
  };

  const fetchLoveAi = async () => {
    if (loveAiText || loadingLoveAi) return;
    setLoadingLoveAi(true);
    try {
      const prompt = "აღწერე ტყუპების ქცევა რომანტიკულ ურთიერთობაში: როგორ უყვარდებათ, რა იზიდავთ პარტნიორში, ინტელექტუალური კავშირი, პირადი სივრცე, თავისუფლება და მრავალფეროვნების საჭიროება. ყურადღება იყოს მხოლოდ რომანტიკულ ურთიერთობებზე.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setLoveAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setLoveAiText(
        "🔹 ინტელექტუალური მიზიდულობა — ტყუპებისთვის რომანტიკული ურთიერთობა იწყება გონებრივი კონტაქტიდან; მათთვის პარტნიორში მთავარი საინტერესო აზროვნება და ღრმა დიალოგებია.\\n\\n" +
        "🔹 თავისუფლება და პირადი სივრცე — სიყვარულში მათ სჭირდებათ ჰაერი და სივრცე; მესაკუთრემული მიდგომა და ზედმეტი შეზღუდვები მათ მყისიერად აფრთხობს.\\n\\n" +
        "🔹 მრავალფეროვნება და სიახლეები — ურთიერთობაში რუტინის წინააღმდეგი არიან და მუდმივად ცდილობენ ერთობლივ თავგადასავლებსა და ემოციურ დინამიკას."
      );
    } finally {
      setLoadingLoveAi(false);
    }
  };
`;

console.log('მზადაა');
