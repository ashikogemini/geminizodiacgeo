const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const factsCode = `
  const [factsAiText, setFactsAiText] = React.useState('');
  const [loadingFactsAi, setLoadingFactsAi] = React.useState(false);

  const fetchFactsAi = async () => {
    if (factsAiText || loadingFactsAi) return;
    setLoadingFactsAi(true);
    try {
      const prompt = "მოამზადე საინტერესო ფაქტები ტყუპების ზოდიაქოს შესახებ 'იცოდი, რომ...?' ფორმატით. შეიტანე ნაკლებად ცნობილი ასტრონომიული, მითოლოგიური, ისტორიული ან ასტროლოგიური დეტალები. თითოეული ფაქტი იყოს მოკლე და ახლდეს 1-2 წინადადიანი განმარტება.";
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setFactsAiText(data.candidates[0].content.parts[0].text.split('*').join('').trim());
      } else {
        throw new Error();
      }
    } catch (e) {
      setFactsAiText(
        "🔹 იცოდი, რომ...? კასტორი და პოლუქსი\\nმითოლოგიაში ტყუპები (Dioscuri) იყვნენ ძმები, სადაც ერთი მოკვდავი იყო, მეორე კი უკვდავი — ეს სიმბოლურად ზუსტად ასახავს ტყუპების ნიშნის შინაგან დუალიზმსა და მუდმივ ძიებას სულიერსა და მატერიალურს შორის.\\n\\n" +
        "🔹 იცოდი, რომ...? ასტრონომიული ვარსკვლავები\\nთანავარსკვლავედის ორი უმთავრესი ვარსკვლავი, კასტორი და პოლუქსი, ერთმანეთისგან სრულიად განსხვავდება ფიზიკური ბუნებითა და სიკაშკაშით, რაც კიდევ ერთხელ უსვამს ხაზს ამ ნიშნის მრავალმხრივობას.\\n\\n" +
        "🔹 იცოდი, რომ...? მერკურის განსაკუთრებული გავლენა\\nტყუპები ერთადერთი ჰაერის ნიშანია, რომელსაც მერკური მართავს, რაც მათ არა უბრალოდ ემოციურ, არამედ სუფთა ინტელექტუალურ და კომუნიკაციურ უპირატესობას ანიჭებს კოსმოსურ რგოლში."
      );
    } finally {
      setLoadingFactsAi(false);
    }
  };
`;

// ვამატებთ ფაილის ბოლო ნაწილში (ექსპორტამდე)
if (!code.includes('fetchFactsAi')) {
  const lastBraceIndex = code.lastIndexOf('}');
  code = code.substring(0, lastBraceIndex) + factsCode + "\\n}\\n";
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ საინტერესო ფაქტების ბლოკი წარმატებით დაემატა!');
} else {
  console.log('⚠️ ეს ბლოკი უკვე არსებობს კოდში.');
}
