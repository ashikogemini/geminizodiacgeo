const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამოწმებთ არის თუ არა ტყუპების გახსნილი სექციების state (geminiExpanded) დამატებული HomeScreen-ში
if (!code.includes('geminiExpanded')) {
  code = code.replace(
    "const [showFullHoroscope, setShowFullHoroscope] = useState(false);",
    "const [showFullHoroscope, setShowFullHoroscope] = useState(false);\n  const [geminiOpen, setGeminiOpen] = useState({});"
  );
}

// აკორდეონის დამხმარე ფუნქცია
const toggleFunc = `
  const toggleGeminiCard = (key) => {
    setGeminiOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };
`;

if (!code.includes('toggleGeminiCard')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n" + toggleFunc);
}

// ინტერაქტიული ტყუპების ჩანართის რენდერი
const accordionView = `
      {activeTab === 'ტყუპები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text style={{ color: '#d4af37', fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>♊ ტყუპების ენციკლოპედია</Text>
          <Text style={{ color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>დააკლიკე სექციას ინფორმაციის სანახავად</Text>

          {[
            { key: 'overview', title: '♊ ზოგადი მიმოხილვა', content: 
              \`პერიოდი: \${GEMINI_ENCYCLOPEDIA.overview.period}\\ნსტიქია: \${GEMINI_ENCYCLOPEDIA.overview.element}\\ნმმართველი პლანეტა: \${GEMINI_ENCYCLOPEDIA.overview.rulingPlanet}\\ნმოდალობა: \${GEMINI_ENCYCLOPEDIA.overview.modality}\\ნ\\ნ\${GEMINI_ENCYCLOPEDIA.overview.essence}\` 
            },
            { key: 'personality', title: '🧠 პიროვნება და ხასიათი', content: 
              \`• აზროვნება: \${GEMINI_ENCYCLOPEDIA.personality.thinking}\\ნ• საუბარი: \${GEMINI_ENCYCLOPEDIA.personality.talking}\\ნ• ქცევა: \${GEMINI_ENCYCLOPEDIA.personality.behavior}\\ნ• ადაპტაცია: \${GEMINI_ENCYCLOPEDIA.personality.adaptability}\` 
            },
            { key: 'strengths', title: '⚡ ძლიერი მხარეები', content: GEMINI_ENCYCLOPEDIA.strengths.map(s => '✓ ' + s).join('\\ნ') },
            { key: 'challenges', title: '⚠️ გამოწვევები', content: GEMINI_ENCYCLOPEDIA.challenges.map(c => '• ' + c).join('\\ნ') },
            { key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content: 
              \`🎉 ბედნიერი: \${GEMINI_ENCYCLOPEDIA.situations.happy}\\ნ🔥 გაბრაზებული: \${GEMINI_ENCYCLOPEDIA.situations.angry}\\ნ🌪️ სტრესში: \${GEMINI_ENCYCLOPEDIA.situations.stressed}\\ნ☕ მოწყენილი: \${GEMINI_ENCYCLOPEDIA.situations.bored}\` 
            },
            { key: 'communication', title: '💬 კომუნიკაცია', content: \`\${GEMINI_ENCYCLOPEDIA.communication.style}\\ნ\\ნარ მოსწონს: \${GEMINI_ENCYCLOPEDIA.communication.petPeeves}\` },
            { key: 'love', title: '💖 სიყვარული და ურთიერთობები', content: \`\${GEMINI_ENCYCLOPEDIA.love.vibe}\\ნ\\ნრას ელოდება: \${GEMINI_ENCYCLOPEDIA.love.needs}\` },
            { key: 'friendship', title: '🤝 მეგობრობა', content: \`\${GEMINI_ENCYCLOPEDIA.friendship.vibe}\\ნ\\ნაფასებს: \${GEMINI_ENCYCLOPEDIA.friendship.values}\` },
            { key: 'career', title: '💼 კარიერა და სამუშაო', content: \`გარემო: \${GEMINI_ENCYCLOPEDIA.career.environment}\\ნსტილი: \${GEMINI_ENCYCLOPEDIA.career.style}\\ნროლები: \${GEMINI_ENCYCLOPEDIA.career.roles}\` },
            { key: 'compatibility', title: '✨ ტყუპები და სხვა ნიშნები', content: GEMINI_ENCYCLOPEDIA.compatibility.map(c => \`🔹 \${c.sign}: \${c.desc}\`).join('\\ნ\\ნ') },
            { key: 'mercury', title: '🪐 მმართველი პლანეტა: მერკური', content: GEMINI_ENCYCLOPEDIA.mercury.desc },
            { key: 'symbolism', title: '♊ სიმბოლიკა და მითოლოგია', content: GEMINI_ENCYCLOPEDIA.symbolism.desc },
            { key: 'famous', title: '🌟 ცნობილი ტყუპები', content: GEMINI_ENCYCLOPEDIA.famous.map(f => \`⭐ \${f.name} (\${f.field}): \${f.fact}\`).join('\\ნ\\ნ') },
            { key: 'facts', title: '💡 საინტერესო ფაქტები', content: GEMINI_ENCYCLOPEDIA.facts.map(f => '📌 ' + f).join('\\ნ\\ნ') },
            { key: 'relatable', title: '🔥 ეს ნამდვილად ტყუპებია', content: GEMINI_ENCYCLOPEDIA.relatable.map(r => \`✨ „\${r}“\`).join('\\ნ\\ნ') }
          ].map((item) => (
            <View key={item.key} style={styles.card}>
              <TouchableOpacity onPress={() => toggleGeminiCard(item.key)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={{ color: '#d4af37', fontSize: 16 }}>{geminiOpen[item.key] ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              {geminiOpen[item.key] && (
                <Text style={[styles.bodyText, { marginTop: 12, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 10, lineHeight: 20 }]}>
                  {item.content}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
`;

// ვცვლით ძველ ტყუპების ჩანართს ახლით
let startPos = code.indexOf("{activeTab === 'ტყუპები' &&");
let endPos = code.indexOf("{activeTab === 'მთვარე' &&");
if (startPos !== -1 && endPos !== -1) {
  code = code.substring(0, startPos) + accordionView + "\n" + code.substring(endPos);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ ტყუპების ჩანართი წარმატებით გადაკეთდა აკორდეონის სტილზე!');
} else {
  console.log('⚠️ ჩანართის საზღვრები ვერ მოიძებნა ზუსტად.');
}
