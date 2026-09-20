const fs = require("fs");

// 1. აღვადგინოთ სუფთა ვერსია ბექაფიდან
if (fs.existsSync("App.js.backup_before_removal")) {
  let cleanCode = fs.readFileSync("App.js.backup_before_removal", "utf8");
  fs.writeFileSync("App.js", cleanCode, "utf8");
}

let c = fs.readFileSync("App.js", "utf8");

// 2. ვამატებთ იმპორტს
if (!c.includes("FAMOUS_GEMINI_DATA")) {
  c = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + c;
}

// 3. ვამატებთ სტეიტებს HomeScreen-ში
if (!c.includes("selectedMonth")) {
  c = c.replace(
    /export default function HomeScreen\s*\(\)\s*\{/,
    `export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = React.useState('5');
  const [selectedDay, setSelectedDay] = React.useState('1');`
  );
}

// 4. იმის მაგივრად, რომ შუა ნაწილები ვჭრათ, უბრალოდ ვპოულობთ პირველ ძველ ბლოკს 
// და ვცვლით მხოლოდ იმ ოთხ ძველ მოდალურ ბლოკს ერთიანად ჩვენი ახალი პანელით
const marker = "{/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */};";
const idx = c.indexOf("{/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */}");

if (idx !== -1) {
  // ვპოულობთ სად მთავრდება ეს ბლოკები (სადაც SafeAreaView ან მთავარი ScrollView იხურება ბოლოში)
  // მოდი, უბრალოდ ვნახოთ ბოლო modal-ების სექცია
  const endIdx = c.indexOf("bottomNav");
  if (endIdx !== -1) {
    const interactivePanel = `
        {/* 🌟 ცნობილი ტყუპების ახალი ინტერაქტიული პანელი */}
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

    c = c.substring(0, idx) + interactivePanel + "\n" + c.substring(endIdx);
    fs.writeFileSync("App.js", c, "utf8");
    console.log("Safe replace completed successfully!");
  }
}

