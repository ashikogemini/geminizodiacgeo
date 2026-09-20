const fs = "fs";
const fsMod = require("fs");

// 1. ვუბრუნდებით სუფთა ბექაფს
if (fsMod.existsSync("App.js.backup_before_removal")) {
  let originalCode = fsMod.readFileSync("App.js.backup_before_removal", "utf8");
  fsMod.writeFileSync("App.js", originalCode, "utf8");
  console.log("Restored clean backup successfully.");
}

let appCode = fsMod.readFileSync("App.js", "utf8");

// 2. ვამატებთ იმპორტს
if (!appCode.includes("FAMOUS_GEMINI_DATA")) {
  appCode = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + appCode;
}

// 3. ვპოულობთ და ვცვლით ზუსტად "ცნობილი ტყუპები" ბლოკს ინტერაქტიული ძებნით, ხოლო დანარჩენ 3 ძველ ბლოკს უსაფრთხოდ ვშლით
// პირველ რიგში, შევქმნათ ახალი დინამიური სექცია
const interactiveFamousSection = `
            {/* ცნობილი ტყუპების ინტერაქტიული ბლოკი */}
            <View style={{backgroundColor: '#131b2e', borderRadius: 15, padding: 15, marginVertical: 10, borderWidth: 1, borderColor: '#d4af37'}}>
              <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>🌟 ცნობილი ტყუპები (თარიღით ძებნა)</Text>
              
              <Text style={{color: '#fff', marginBottom: 5, fontSize: 13}}>აირჩიე თვე:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                <TouchableOpacity onPress={() => setSelectedMonth('5')} style={{flex: 1, padding: 8, backgroundColor: selectedMonth === '5' ? '#d4af37' : '#1f293d', marginRight: 5, alignItems: 'center', borderRadius: 6}}>
                  <Text style={{color: selectedMonth === '5' ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 12}}>მაისი</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMonth('6')} style={{flex: 1, padding: 8, backgroundColor: selectedMonth === '6' ? '#d4af37' : '#1f293d', marginLeft: 5, alignItems: 'center', borderRadius: 6}}>
                  <Text style={{color: selectedMonth === '6' ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 12}}>ივნისი</Text>
                </TouchableOpacity>
              </View>

              <Text style={{color: '#fff', marginBottom: 5, fontSize: 13}}>მიუთითე რიცხვი (1-31):</Text>
              <TextInput 
                style={{backgroundColor: '#1f293d', color: '#fff', padding: 8, borderRadius: 6, marginBottom: 10, textAlign: 'center', fontSize: 14, borderWidth: 1, borderColor: '#d4af37'}}
                keyboardType="numeric"
                maxLength={2}
                value={selectedDay}
                onChangeText={setSelectedDay}
              />

              <Text style={{color: '#d4af37', fontSize: 13, fontWeight: 'bold', marginTop: 5, marginBottom: 5}}>შედეგები:</Text>
              <ScrollView style={{maxHeight: 180, backgroundColor: '#0d1322', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}} nestedScrollEnabled={true}>
                {
                  (() => {
                    const key = \`\${selectedDay}-\${selectedMonth}\`;
                    const results = FAMOUS_GEMINI_DATA[key];
                    if (!results) {
                      return <Text style={{color: '#888', textAlign: 'center', fontSize: 12}}>ამ თარიღისთვის ჩანაწერები არ მოიძებნა. სცადე სხვა დღე (მაგ: 21-5, 22-5, 1-6, 4-6)</Text>;
                    }
                    return results.map((person, idx) => (
                      <View key={idx} style={{marginBottom: 6, borderBottomWidth: idx < results.length - 1 ? 1 : 0, borderBottomColor: '#1f293d', paddingBottom: 4}}>
                        <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 13}}>• {person.name} ({person.year})</Text>
                        <Text style={{color: '#ccc', fontSize: 11}}>{person.role}</Text>
                      </View>
                    ));
                  })()
                }
              </ScrollView>
            </View>
`;

// ვწერთ აგრეთვე სტეიტებს HomeScreen-ში, თუ არ აქვთ
if (!appCode.includes("selectedMonth")) {
  appCode = appCode.replace(
    /export default function HomeScreen\s*\(\)\s*\{/,
    `export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = React.useState('5');
  const [selectedDay, setSelectedDay] = React.useState('1');`
  );
}

// ვცვლით ძველ სტატიკურ "ცნობილი ტყუპები" ბლოკს ახალი ინტერაქტიულით
// ძველი ბლოკის სტრუქტურის მიხედვით ვეძებთ სათაურს და ვცვლით მთლიან აკორდეონს
appCode = appCode.replace(
  /<Text style=\{modalItemTitle\}>\s*🌟 ცნობილი ტყუპები\s*<\/Text>[\s\S]*?<\/View>\s*<\/View>/,
  interactiveFamousSection
);

// დანარჩენი სამი ძველი ბლოკის (✨ ტყუპები და სხვა ნიშნები, 💡 საინტერესო ფაქტები, 🔥 ეს ნამდვილად ტყუპებია) უსაფრთხოდ ამოშლა
const blocksToClean = [
  "✨ ტყუპები და სხვა ნიშნები",
  "💡 საინტერესო ფაქტები",
  "🔥 ეს ნამდვილად ტყუპებია"
];

blocksToClean.forEach(title => {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // ვეძებთ TouchableOpacity-ს სათაურით და ვშლით
  const pattern = new RegExp(`<TouchableOpacity[\\s\\S]*?{modalItemTitle}[\\s\\S]*?${escaped}[\\s\\S]*?<\\/TouchableOpacity>`, 'g');
  appCode = appCode.replace(pattern, '');
});

fsMod.writeFileSync("App.js", appCode, "utf8");
console.log("App.js successfully fixed, cleaned, and updated with interactive search!");
