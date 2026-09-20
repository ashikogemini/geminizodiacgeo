const fs = require('fs');

// 1. ვწერთ სრულ და გამართულ geminiData.js ფაილს
const dataContent = `export const GEMINI_ENCYCLOPEDIA = {
  overview: {
    period: "21 მაისი – 20 ივნისი",
    element: "ჰაერი",
    rulingPlanet: "მერკური",
    modality: "მცვლადი (Mutable)",
    symbol: "ტყუპები (♊)",
    polarity: "აქტიური / მამაკაცური",
    house: "III სახლი",
    keywords: "კომუნიკაცია, ცნობისმოყვარეობა, ადაპტაცია, ინტელექტი, მოძრაობა",
    essence: "ტყუპები ზოდიაქოს ყველაზე ცოცხალი, მოქნილი და გონებამახვილი ნიშანია. ისინი მუდმივად ეძებენ ახალ ცოდნას, შთაგონებას და ადამიანებს. მათი ენერგია ჰგავს მსუბუქ ნიავს, რომელიც ყველგან ასწრებს და ყველაფრით ინტერესდება."
  },
  personality: {
    thinking: "აწყობს ინფორმაციას ელვისებური სიჩქარით, აანალიზებს რამდენიმე დეტალს ერთდროულად.",
    talking: "მჭევრმეტყველი, იუმორით სავსე, საუბრობს სწრაფად და საინტერესოდ.",
    behavior: "მარტივად ამყარებს კონტაქტს, არის სულისკვეთებით ახალგაზრდა და მეგობრული.",
    adaptability: "ცვლილებები მათთვის სტიქიაა — ადვილად ერგებიან ნებისმიერ გარემოს.",
    motivation: "ამოძრავებთ ახალი იდეები, ცოდნის მიღება და ერთფეროვნებისგან თავის არიდება.",
    comfort: "თავისუფლება, მუდმივი კავშირი, საინტერესო წიგნები და აქტიური გარემო."
  },
  strengths: [
    "ბრწყინვალე და მრავალმხრივი კომუნიკაცია",
    "მყისიერი ადაპტაცია ნებისმიერ სიტუაციასთან",
    "მაღალი ინტელექტი და სწრაფი სწავლის უნარი",
    "ცოცხალი იუმორი და ხალისიანი ბუნება"
  ],
  challenges: [
    "გაფანტულობა და ბოლოში საქმის მიუყვანლობა",
    "ზედაპირული ინტერესი რაღაც პერიოდში",
    "ემოციური არასტაბილურობა და შფოთვა",
    "გადაწყვეტილებების მუდმივი ეჭვქვეშ დაყენება"
  ],
  situations: {
    happy: "ბრწყინავს, ხუმრობს, აგროვებს გარშემო ხალხს და აზიარებს ენერგიას.",
    angry: "სიტყვით უფრო მწარეა ვიდრე ქმედებით; იყენებს სარკაზმს და ლოგიკას.",
    stressed: "იწყებს ქაოტურ მოძრაობას, ცდილობს ერთდროულად ათი საქმის კეთებას.",
    bored: "მყისიერად ტოვებს გარემოს ან იგონებს ახალ გართობას.",
    alone: "ფიქრობს, კითხულობს, წერს ან ეძებს ახალ ინფორმაციას ონლაინ სივრცეში."
  },
  communication: {
    style: "ღია, დინამიური და არგუმენტირებული. უყვარს მსჯელობა და ახალი ამბების გაზიარება.",
    listening: "უსმენს ინტერესით, სანამ თემა აქტუალურია; თუ მოიწყინა, ყურადღება ეფანტება.",
    petPeeves: "ერთფეროვნება, ბიუროკრატია და დოგმატური ადამიანები."
  },
  love: {
    vibe: "რომანტიკული, ფლერტით სავსე და ინტელექტუალური მიზიდულობა.",
    needs: "ინტელექტუალური პარტნიორი, რომელიც არ შეზღუდავს მის თავისუფლებას.",
    strengths: "მრავალფეროვნება, რომანტიკული სიურპრიზები და გულწრფელი საუბრები."
  },
  friendship: {
    vibe: "ერთგული, მაგრამ თავისუფლების მოყვარული მეგობარი. ყოველთვის აქვს საინტერესო იდეები და არასდროს მოსაწყენია.",
    values: "გონებრივი სიახლოვე, იუმორი და საერთო ინტერესები."
  },
  career: {
    environment: "დინამიური, კომუნიკაციებზე დამყარებული და თავისუფალი სამუშაო სივრცე.",
    roles: "ჟურნალისტი, მედია მენეჯერი, მთარგმნელი, ივენთ-ორგანიზატორი, IT სპეციალისტები.",
    style: "მუშაობს სწრაფად, აკეთებს რამდენიმე საქმეს ერთდროულად (Multitasking)."
  },
  compatibility: [
    { sign: "ტყუპები + ვერძი", desc: "ცოცხალი, ენერგიული და სახალისო დუეტი სავსე თავგადასავლებით." },
    { sign: "ტყუპები + კურო", desc: "განსხვავებული ტემპები; საჭიროებს ბალანსსა და ერთმანეთის თავისუფლების პატივისცემას." },
    { sign: "ტყუპები + ტყუპები", desc: "იდეალური გონებრივი გაგება და წარმოუდგენელი დინამიკა, თუმცა შესაძლოა ქაოტური იყოს." },
    { sign: "ტყუპები + კირჩხიბი", desc: "ინტელექტისა და ემოციების საინტერესო კვეთა, სადაც საჭიროა გულისხმიერება." },
    { sign: "ტყუპები + ლომი", desc: "კაშკაშა, მხიარული და სოციალური წყვილი, რომელსაც ერთად არასდროს სწყინს." },
    { sign: "ტყუპები + ქალწული", desc: "საერთო მმართველი (მერკური) აერთიანებთ; ანალიტიკური და საუბრებით სავსე კავშირი." },
    { sign: "ტყუპები + სასწორი", desc: "ჰაერის სტიქიის ჰარმონია — იდეალური ესთეტიკური და მეგობრული სინერგია." },
    { sign: "ტყუპები + მორიელი", desc: "ინტენსიური კონტრასტი: ტყუპების სიმსუბუქე და მორიელის სიღრმე." },
    { sign: "ტყუპები + მშვილდოსანი", desc: "საპირისპირო ნიშნები, რომლებიც საოცრად იზიდავენ ერთმანეთს თავისუფლების სიყვარულით." },
    { sign: "ტყუპები + თხის რქა", desc: "განსხვავებული მიდგომები — თხის რქა სტრუქტურას ეძებს, ტყუპები — ცვალებადობას." },
    { sign: "ტყუპები + მერწყული", desc: "ინტელექტუალური და მეგობრული ზენიტის კავშირი, სავსე ინოვაციური იდეებით." },
    { sign: "ტყუპები + თევზები", desc: "ოცნებისა და ჰაეროვანი რეალობის შეხვედრა; საჭიროებს მუდმივ დიალოგს." }
  ],
  mercury: {
    title: "მმართველი პლანეტა: მერკური",
    desc: "მერკური მართავს გონებას, მეტყველებას და ინფორმაციის დამუშავებას. ის ტყუპებს ანიჭებს ელვისებურ აზროვნებას, მრავალენოვნების ნიჭს, სწრაფი სწავლის უნარსა და მუდმივ სურვილს, რომ იცოდნენ ყველაფერი მიმდინარე მოვლენებზე."
  },
  symbolism: {
    title: "სიმბოლიკა და მითოლოგია",
    desc: "ტყუპების სიმბოლო (♊) და მითოლოგიური არქეტიპი უკავშირდება ზევსისა და ლედას ძმებს — კასტორსა და პოლუქსს (Dioscuri). ისინი განასახიერებენ დואალურობას, სულიერ ძმობას, მუდმივ მოძრაობასა და ცვალებადობას."
  },
  famous: [
    { name: "მერილინ მონრო", field: "მსახიობი", fact: "ლეგენდარული კინოვარსკვლავი გამორჩეული ქარიზმით." },
    { name: "კილიან მერფი", field: "მსახიობი", fact: "ღრმა და ინტელექტუალური მსახიობი." },
    { name: "ანჯელინა ჯოლი", field: "მსახიობი", fact: "გლობალური გავლენის მქონე კინოქალი და ჰუმანიტარი." },
    { name: "ჯონი დეპი", field: "მსახიობი", fact: "ექსცენტრიკული და მრავალმხრივი არტისტი." }
  ],
  facts: [
    "ტყუპებს შეუძლიათ რამდენიმე საქმის ერთდროულად კეთება ყოველგვარი დაძაბულობის გარეშე.",
    "მათი მთავარი სტიმული ცნობისმოყვარეობა და ახალი ინფორმაციაა.",
    "ისინი წელიწადში ყველაზე მეტ ახალ ნაცნობსა და კონტაქტს აგროვებენ."
  ],
  relatable: [
    "როცა ცდილობ ერთდროულად უპასუხო 5 სხვადასხვა ჩათს და ყველგან აზრზე ხარ.",
    "როცა იდეა გაქვს, რომელიც წამებში უნდა განახორციელო!",
    "როცა ერთი საათის წინ რაღაც გიჟურად გინდოდა, ახლა კი სულ სხვა რამეზე ფიქრობ."
  ]
};
`;
fs.writeFileSync('geminiData.js', dataContent, 'utf8');

// 2. განვანახლებთ App.js-ს უსაფრთხო ლოგიკით
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes('geminiOpen')) {
  code = code.replace(
    "const [showFullHoroscope, setShowFullHoroscope] = useState(false);",
    "const [showFullHoroscope, setShowFullHoroscope] = useState(false);\n  const [geminiOpen, setGeminiOpen] = useState({});"
  );
}

if (!code.includes('toggleGeminiCard')) {
  code = code.replace("export default function HomeScreen() {", "export default function HomeScreen() {\n  const toggleGeminiCard = (key) => {\n    setGeminiOpen(prev => ({ ...prev, [key]: !prev[key] }));\n  };\n");
}

const safeAccordionView = `
      {activeTab === 'ტყუპები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text style={{ color: '#d4af37', fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>♊ ტყუპების ენციკლოპედია</Text>
          <Text style={{ color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>დააკლიკე სექციას ინფორმაციის სანახავად</Text>

          {[
            { key: 'overview', title: '♊ ზოგადი მიმოხილვა', content: 
              \`პერიოდი: \${GEMINI_ENCYCLOPEDIA?.overview?.period || ''}\\ნსტიქია: \${GEMINI_ENCYCLOPEDIA?.overview?.element || ''}\\ნმმართველი პლანეტა: \${GEMINI_ENCYCLOPEDIA?.overview?.rulingPlanet || ''}\\ნმოდალობა: \${GEMINI_ENCYCLOPEDIA?.overview?.modality || ''}\\ნ\\ნ\${GEMINI_ENCYCLOPEDIA?.overview?.essence || ''}\` 
            },
            { key: 'personality', title: '🧠 პიროვნება და ხასიათი', content: 
              \`• აზროვნება: \${GEMINI_ENCYCLOPEDIA?.personality?.thinking || ''}\\ნ• საუბარი: \${GEMINI_ENCYCLOPEDIA?.personality?.talking || ''}\\ნ• ქცევა: \${GEMINI_ENCYCLOPEDIA?.personality?.behavior || ''}\\ნ• ადაპტაცია: \${GEMINI_ENCYCLOPEDIA?.personality?.adaptability || ''}\` 
            },
            { key: 'strengths', title: '⚡ ძლიერი მხარეები', content: (GEMINI_ENCYCLOPEDIA?.strengths || []).map(s => '✓ ' + s).join('\\ნ') },
            { key: 'challenges', title: '⚠️ გამოწვევები', content: (GEMINI_ENCYCLOPEDIA?.challenges || []).map(c => '• ' + c).join('\\ნ') },
            { key: 'situations', title: '🎭 ტყუპები სხვადასხვა სიტუაციაში', content: 
              \`🎉 ბედნიერი: \${GEMINI_ENCYCLOPEDIA?.situations?.happy || ''}\\ნ🔥 გაბრაზებული: \${GEMINI_ENCYCLOPEDIA?.situations?.angry || ''}\\ნ🌪️ სტრესში: \${GEMINI_ENCYCLOPEDIA?.situations?.stressed || ''}\\ნ☕ მოწყენილი: \${GEMINI_ENCYCLOPEDIA?.situations?.bored || ''}\` 
            },
            { key: 'communication', title: '💬 კომუნიკაცია', content: \`\${GEMINI_ENCYCLOPEDIA?.communication?.style || ''}\\ნ\\ნარ მოსწონს: \${GEMINI_ENCYCLOPEDIA?.communication?.petPeeves || ''}\` },
            { key: 'love', title: '💖 სიყვარული და ურთიერთობები', content: \`\${GEMINI_ENCYCLOPEDIA?.love?.vibe || ''}\\ნ\\ნრას ელოდება: \${GEMINI_ENCYCLOPEDIA?.love?.needs || ''}\` },
            { key: 'friendship', title: '🤝 მეგობრობა', content: \`\${GEMINI_ENCYCLOPEDIA?.friendship?.vibe || ''}\\ნ\\ნაფასებს: \${GEMINI_ENCYCLOPEDIA?.friendship?.values || ''}\` },
            { key: 'career', title: '💼 კარიერა და სამუშაო', content: \`გარემო: \${GEMINI_ENCYCLOPEDIA?.career?.environment || ''}\\ნსტილი: \${GEMINI_ENCYCLOPEDIA?.career?.style || ''}\\ნროლები: \${GEMINI_ENCYCLOPEDIA?.career?.roles || ''}\` },
            { key: 'compatibility', title: '✨ ტყუპები და სხვა ნიშნები', content: (GEMINI_ENCYCLOPEDIA?.compatibility || []).map(c => \`🔹 \${c.sign}: \${c.desc}\`).join('\\ნ\\ნ') },
            { key: 'mercury', title: '🪐 მმართველი პლანეტა: მერკური', content: GEMINI_ENCYCLOPEDIA?.mercury?.desc || '' },
            { key: 'symbolism', title: '♊ სიმბოლიკა და მითოლოგია', content: GEMINI_ENCYCLOPEDIA?.symbolism?.desc || '' },
            { key: 'famous', title: '🌟 ცნობილი ტყუპები', content: (GEMINI_ENCYCLOPEDIA?.famous || []).map(f => \`⭐ \${f.name} (\${f.field}): \${f.fact}\`).join('\\ნ\\ნ') },
            { key: 'facts', title: '💡 საინტერესო ფაქტები', content: (GEMINI_ENCYCLOPEDIA?.facts || []).map(f => '📌 ' + f).join('\\ნ\\ნ') },
            { key: 'relatable', title: '🔥 ეს ნამდვილად ტყუპებია', content: (GEMINI_ENCYCLOPEDIA?.relatable || []).map(r => \`✨ „\${r}“\`).join('\\ნ\\ნ') }
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

let startPos = code.indexOf("{activeTab === 'ტყუპები' &&");
let endPos = code.indexOf("{activeTab === 'მთვარე' &&");

if (startPos !== -1 && endPos !== -1) {
  code = code.substring(0, startPos) + safeAccordionView + "\n" + code.substring(endPos);
} else if (endPos !== -1) {
  code = code.substring(0, endPos) + safeAccordionView + "\n" + code.substring(endPos);
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ პროექტი წარმატებით განახლდა და გასწორდა!');
