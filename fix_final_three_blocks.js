const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const finalBlocksCode = `
  const [friendshipAiText, setFriendshipAiText] = React.useState('');
  const [loadingFriendshipAi, setLoadingFriendshipAi] = React.useState(false);

  const [careerAiText, setCareerAiText] = React.useState('');
  const [loadingCareerAi, setLoadingCareerAi] = React.useState(false);

  const [mercuryAiText, setMercuryAiText] = React.useState('');
  const [loadingMercuryAi, setLoadingMercuryAi] = React.useState(false);

  const fetchFriendshipAi = async () => {
    if (friendshipAiText || loadingFriendshipAi) return;
    setLoadingFriendshipAi(true);
    try {
      const prompt = "აღწერე ტყუპების მეგობრობის სტილი: როგორი მეგობარია, რას აფასებს, საერთო ინტერესები, თავისუფლება, იუმორი, ერთად ახალი გამოცდილებები და უთანხმოების დროს ქცევა. ყურადღება იყოს მხოლოდ მეგობრობაზე.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setFriendshipAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setFriendshipAiText(
        "🔹 თავისუფლება და საერთო ინტერესები — ტყუპები მეგობრობაში აფასებენ ინტელექტუალურ თანხვედრას, იუმორსა და ერთად ახალი გამოცდილებების ძიებას, სადაც არავინ ზღუდავს სხვის პირად სივრცეს.\\n\\n" +
        "🔹 გულწრფელი საუბრები და მხარდაჭერა — ისინი ყოველთვის მზად არიან მოუსმინონ მეგობარს, შესთავაზონ არასტანდარტული გამოსავალი და გაანათონ ნებისმიერი მძიმე მომენტი თავიანთი პოზიტივით.\\n\\n" +
        "🔹 დისტანცია უთანხმოებისას — კონფლიქტის დროს ისინი ურჩევნიძლიათ გონივრული დისტანციის დაჭერა და დრამის გარეშე, მშვიდი მსჯელობით საკითხის მოგვარება."
      );
    } finally {
      setLoadingFriendshipAi(false);
    }
  };

  const fetchCareerAi = async () => {
    if (careerAiText || loadingCareerAi) return;
    setLoadingCareerAi(true);
    try {
      const prompt = "აღწერე ტყუპების კარიერა და პროფესიული სტილი: სამუშაო გარემო, მოტივაცია, რუტინასთან ბრძოლა, მრავალმხრივი შესაძლებლობები და შესაბამისი სფეროები. ყურადღება იყოს მხოლოდ პროფესიულ ცხოვრებაზე.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setCareerAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setCareerAiText(
        "🔹 დინამიკური სამუშაო გარემო — ტყუპებისთვის იდეალურია სფეროები, რომლებიც მოითხოვს მუდმივ განახლებას, კომუნიკაციას, მედიას, ტექნოლოგიებსა და კრეატიულობას.\\n\\n" +
        "🔹 რუტინის მტერი — მონოტონური და განმეორებადი ყოველდღიურობა სწრაფად უკარგავს მოტივაციას, ამიტომ ისინი ეძებენ პროექტებს, სადაც მრავალფეროვნება და თავისუფლებაა.\\n\\n" +
        "🔹 მრავალფუნქციური უნარები — მათ შეუძლიათ პარალელურად რამდენიმე ამოცანის წარმატებით მართვა და ახალი იდეების სწრაფად დანერგვა პრაქტიკაში."
      );
    } finally {
      setLoadingCareerAi(false);
    }
  };

  const fetchMercuryAi = async () => {
    if (mercuryAiText || loadingMercuryAi) return;
    setLoadingMercuryAi(true);
    try {
      const prompt = "აღწერე ტყუპების მმართველი პლანეტა მერკური: ასტროლოგიური და საგანმანათლებლო მნიშვნელობა, სიმბოლური კავშირი აზროვნებასთან, ინფორმაციის მიღებასთან, მეტყველებასთან და ცნობისმოყვარეობასთან.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setMercuryAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setMercuryAiText(
        "🔹 ინტელექტის მმართველი — მერკური, როგორც მაცნეთა და აზროვნების პლანეტა, ტყუპებს ანიჭებს წარმოუდგენელ გონებრივ მოქნილობას, სიტყვის ძალასა და ინფორმაციის წამში დამუშავების უნარს.\\n\\n" +
        "🔹 მუდმივი სწრაფვა ცოდნისკენ — მერკურის ენერგია განაპირობებს მათ დაუოკებელ ცნობისმოყვარეობას, ახალი ენების, იდეებისა და კავშირების ძიების მუდმივ სურვილს.\\n\\n" +
        "🔹 აზროვნებისა და სიტყვის სინთეზი — ამ პლანეტის გავლენით ტყუპების შინაგანი სამყარო მუდმივად იკვებება ახალი ინფორმაციით, რასაც ისინი ოსტატურად გარდაქმნიან ცოცხალ და საინტერესო კონტაქტად."
      );
    } finally {
      setLoadingMercuryAi(false);
    }
  };
`;

console.log('ყველა ბლოკი მზადაა');
