const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const perfectFunc = `const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    const prompt = "აღწერე ტყუპების ხასიათი და ქცევა 12 სიტუაციაში. თითოეული სიტუაცია დაიწყე შესაბამისი ემოჯით და ზუსტი სათაურით: როცა ბედნიერია, როცა გაბრაზებულია, როცა ნაწყენია, სტრესშია, მოწყენილია, ძალიან აინტერესებს, აღარ აინტერესებს, არჩევანის წინაშეა, მოულოდნელი ცვლილებაა, მარტო რჩება, არ ეთანხმება, დიდი მიზანი აქვს. დაწერე ვრცლად.";
    
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    const data = await res.json();
    
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let rawText = data.candidates[0].content.parts[0].text;
      setSituationsAiText(rawText.split('*').join('').trim());
    } else {
      throw new Error("Fallback needed");
    }
  } catch (e) {
    // სრული და დახვეწილი სარეზერვო ტექსტი, რომელიც გარანტირებულად ავსებს 12-ვე პუნქტს
    const fullFallback = 
      "🔹 როცა ბედნიერია — ანათებს გარემოს, აზიარებს ინოვაციურ იდეებს, ბჭობს და პოზიტიური ენერგიით მუხტავს სხვებს.\\n\\n" +
      "🔹 როცა გაბრაზებულია — იყენებს მწარე სარკაზმსა და რკინისებურ ლოგიკას — მისი სიტყვა ბევრად უფრო მტკივნეულია, ვიდრე ნებისმიერი ქმედება.\\n\\n" +
      "🔹 როცა ნაწყენია — ცდილობს აჩვენოს, რომ არაფერი ხდება, მაგრამ ცივი დისტანციით და ირონიით გრძნობნინებს თავის საზღვრებს.\\n\\n" +
      "🔹 როცა სტრესშია — იწყებს ქაოტურ მოძრაობას და ცდილობს ერთდროულად ათი სხვადასხვა საქმის გაკონტროლებას.\\n\\n" +
      "🔹 როცა მოწყენილია — მყისიერად ტოვებს მოსაწყენ სივრცეს ან საკუთარ გონებაში იგონებს ახალ თავგადასავალს.\\n\\n" +
      "🔹 როცა რაღაც ძალიან აინტერესებს — პარალელურად კითხულობს რამდენიმე წიგნს, ეძებს ტრენდულ სიახლეებს ან ამუშავებს ახალ იდეებს.\\n\\n" +
      "🔹 როცა რაღაც აღარ აინტერესებს — წამში კარგავს ფოკუსს, ერთვება სხვა თემაში და ძველს ისე ივიწყებს, თითქოს არასდროს არსებობებულა.\\n\\n" +
      "🔹 როცა არჩევანის წინაშეა — აანალიზებს ყველა შესაძლო ვარიანტს, ცდილობს ორივე მხარის პოზიციის გათვალისწინებას და ხშირად ბოლო წამს იცვლის გადაწყვეტილებას.\\n\\n" +
      "🔹 როცა მოულოდნელი ცვლილება ხდება — წამში ეწყობა ახალ რეალობას, რადგან მოქნილობა მისი მთავარი სუპერძალაა.\\n\\n" +
      "🔹 როცა მარტო რჩება — იყენებს დროს თვითგანვითარებისთვის, უსმენს მუსიკას, წერს ან ერთდროულად რამდენიმე ციფრულ პროექტს მართავს.\\n\\n" +
      "🔹 როცა ვინმე არ ეთანხმება — სიამოვნებით ეჯახება დებატებში, იყენებს არგუმენტებს და ცდილობს არა იმდენად მოგებას, რამდენადაც პროცესით ტკბობას.\\n\\n" +
      "🔹 როცა დიდი მიზანი აქვს — აქტიურად იწყებს ინფორმაციის შეგროვებას და კავშირების დამყარებას, თუმცა რუტინამ შეიძლება ყურადღება გაუფანტოს.";
      
    setSituationsAiText(fullFallback);
  } finally {
    setLoadingSituationsAi(false);
  }
};`;

const startIndex = code.indexOf('const fetchSituationsAi = async () => {');
if (startIndex !== -1) {
  let openBrackets = 0;
  let endIndex = -1;
  let started = false;
  for (let i = startIndex; i < code.length; i++) {
      if (code[i] === '{') { openBrackets++; started = true; }
      else if (code[i] === '}') {
          openBrackets--;
          if (started && openBrackets === 0) { endIndex = i + 1; break; }
      }
  }
  code = code.substring(0, startIndex) + perfectFunc + code.substring(endIndex);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ სრული და დახვეწილი ბაზა წარმატებით ჩაერთო!');
} else {
  console.log('⚠️ ფუნქცია ვერ მოიძებნა.');
}
