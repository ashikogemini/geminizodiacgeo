const fs = require('fs');

async function generateHoroscope() {
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && fs.existsSync('key.txt')) {
    apiKey = fs.readFileSync('key.txt', 'utf8').trim();
  }
  
  if (!apiKey) {
    console.error("❌ API გასაღები არ არის მითითებული!");
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];
  const options = { day: 'numeric', month: 'long' };
  const dateTitle = new Intl.DateTimeFormat('ka-GE', options).format(new Date());

  let existingData = {};
  try {
    if (fs.existsSync('dailyHoroscopeData.js')) {
      delete require.cache[require.resolve('./dailyHoroscopeData.js')];
      const imported = require('./dailyHoroscopeData.js');
      if (imported && imported.DAILY_HOROSCOPE_DATA) {
        existingData = imported.DAILY_HOROSCOPE_DATA;
      }
    }
  } catch (e) {
    console.log("⚠️ ბაზის წაკითხვის შენიშვნა, შეიქმნება ახალი.");
  }

  const prompt = `შექმენი ტყუპების (♊) ყოველდღიური ასტროლოგიური პროგნოზი თარიღისთვის: ${dateTitle}, 2026. 
  პროგნოზი უნდა იყოს კონკრეტულად დღევანდელი დღის შესახებ და იკითხებოდეს როგორც პერსონალურად ტყუპებისთვის დაწერილი ყოველდღიური პროგნოზი.
  დააბრუნე მკაცრად და მხოლოდ JSON ფორმატში შემდეგი ველებით, ყოველგვარი დამატებითი ტექსტის ან markdown ბლოკების გარეშე:
  {
    "dateTitle": "${dateTitle}",
    "mainEnergy": "...",
    "love": "...",
    "career": "...",
    "finance": "...",
    "emotion": "...",
    "opportunity": "...",
    "caution": "...",
    "advice": "...",
    "keyword": "..."
  }`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (!data.candidates || !data.candidates[0].content) {
      console.error("❌ API პასუხის შეცდომა:", data);
      process.exit(1);
    }

    const textResponse = data.candidates[0].content.parts[0].text.trim();
    const cleanJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const newHoroscope = JSON.parse(cleanJson);

    existingData[today] = newHoroscope;

    const fileContent = `export const DAILY_HOROSCOPE_DATA = ` + JSON.stringify(existingData, null, 2) + `;\n`;
    fs.writeFileSync("dailyHoroscopeData.js", fileContent, "utf8");
    
    console.log(`✅ ჰიბრიდული ბაზა წარმატებით განახლდა (${today} თარიღით)!`);
  } catch (error) {
    console.error("❌ შეცდომა გენერაციისას:", error);
    process.exit(1);
  }
}

generateHoroscope();
