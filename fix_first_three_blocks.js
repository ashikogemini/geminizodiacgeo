const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const updatedBlocksCode = `
  const [generalAiText, setGeneralAiText] = React.useState('');
  const [loadingGeneralAi, setLoadingGeneralAi] = React.useState(false);

  const [personalityAiText, setPersonalityAiText] = React.useState('');
  const [loadingPersonalityAi, setLoadingPersonalityAi] = React.useState(false);

  const [strengthsAiText, setStrengthsAiText] = React.useState('');
  const [loadingStrengthsAi, setLoadingStrengthsAi] = React.useState(false);

  const fetchGeneralAi = async () => {
    if (generalAiText || loadingGeneralAi) return;
    setLoadingGeneralAi(true);
    try {
      const prompt = "დაწერე ტყუპების ზოდიაქოს ზოგადი მიმოხილვა: მოკლე და საინტერესო ტექსტი, რომელიც აჩვენებს ნიშნის ძირითად არსს, სტიქიას, მმართველი პლანეტას (მერკური), მთავარ ენერგიას, აზროვნებისა და კომუნიკაციის თავისებურებებს და იმას, რით გამოირჩევა ტყუპები სხვა ნიშნებისგან. ტექსტი იყოს თანამედროვე და ინფორმაციული.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeneralAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setGeneralAiText("ტყუპები ზოდიაქოს წრის ყველაზე დინამიკური, ცოცხალი და მრავალმხრივი ნიშანია. ჰაერის სტიქიისა და მერკურის მმართველობის ქვეშ მყოფი ტყუპები გამოირჩევიან წარმოუდგენელი გონებრივი სისწრაფით, ადაპტაციის უნარითა და ინფორმაციის ათვისების განსაკუთრებული ნიჭით. მათი მთავარი ენერგია მუდმივ მოძრაობასა და ცნობისმოყვარეობაზეა აგებული — ისინი არიან ინტელექტუალური ნოვატორები, რომლებიც ადვილად ამყარებენ კონტაქტს და ნებისმიერ გარემოში სუფთა ჰაერივით აუცილებელ ენერგიას შემოიტანენ.");
    } finally {
      setLoadingGeneralAi(false);
    }
  };

  const fetchPersonalityAi = async () => {
    if (personalityAiText || loadingPersonalityAi) return;
    setLoadingPersonalityAi(true);
    try {
      const prompt = "აღწერე ტყუპების პიროვნება და ხასიათი: დეტალური აღწერა იმისა, როგორია მათი შინაგანი ბუნება და ქცევითი სტილი, აზროვნება, ინტერესები, ემოციური რეაქციები, ცვლილებებისადმი დამოკიდებულება, ცნობისმოყვარეობა და შინაგანი წინააღმდეგობები.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setPersonalityAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setPersonalityAiText("ტყუპების შინაგანი ბუნება ორიენტებულია მუდმივ ძიებასა და ანალიზზე. მათი აზროვნება მრავალფუნქციურია — ისინი ერთდროულად რამდენიმე მიმართულებით ფიქრობენ და ადვილად იცვლიან პერსპექტივას. ტყუპების ემოციური რეაქციები დაფუძნებულია ლოგიკასა და გონებაზე, თუმცა შინაგანად ისინი საკმაოდ მგრძნობიარენი არიან მონოტონურობის მიმართ. ცვლილებები მათთვის სუნთქვის ტოლფასია, ხოლო რუტინა — მთავარი მტერი. ეს არის ხასიათი, სადაც ორმაგი ენერგია მუდმივად ქმნის ახალ იდეებსა და შინაგან დიალოგებს.");
    } finally {
      setLoadingPersonalityAi(false);
    }
  };

  const fetchStrengthsAi = async () => {
    if (strengthsAiText || loadingStrengthsAi) return;
    setLoadingStrengthsAi(true);
    try {
      const prompt = "აღწერე ტყუპების ძლიერი მხარეები: სწრაფი აზროვნება, ცნობისმოყვარეობა, მოქნილობა, ადაპტაციის უნარი, ცოდნის სწრაფად ათვისება, მრავალფეროვანი ინტერესები, იუმორი, შემოქმედებითობა და რთულ სიტუაციებში გამოსავლის პოვნა. თითოეული მოკლედ ახსენი.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setStrengthsAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setStrengthsAiText(
        "🔹 სწრაფი აზროვნება — ინფორმაციას წამებში ამუშავებს და რთულ ამოცანებზე მყისიერ პასუხებს პოულობს.\\n\\n" +
        "🔹 მოქნილობა და ადაპტაცია — იდეალურად ეგუება ნებისმიერ უცხო გარემოსა და მოულოდნელ ცვლილებას.\\n\\n" +
        "🔹 მრავალმხრივი ცნობისმოყვარეობა — აინტერესებს ყველაფერი, ადვილად ითვისებს ახალ ცოდნას და უცხო ენებს.\\n\\n" +
        "🔹 იუმორი და ნათელი ხალისი — ნებისმიერ სიტუაციაში ახერხებს განტვირთვას და სხვების ინსპირაციას.\\n\\n" +
        "🔹 გამოსავლის პოვნის უნარი — კრიზისულ მომენტებში რთული სიტუაციიდან გამოსასვლელად არასტანდარტულ გზებს იყენებს."
      );
    } finally {
      setLoadingStrengthsAi(false);
    }
  };
`;

// ვეძებთ ადგილს სადაც ფუნქციები უნდა ჩაჯდეს ან ვამატებთ კომპონენტის დასაწყისში
console.log('მზად არის ინტეგრაციისთვის');
