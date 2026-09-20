const fs = require("fs");
let code = fs.readFileSync("App.js", "utf8");
let lines = code.split("\n");

// 1. ვამატებთ იმპორტს და სტეიტებს თავში, თუ არ არის
if (!code.includes("FAMOUS_GEMINI_DATA")) {
  code = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + code;
}

if (!code.includes("selectedMonth")) {
  code = code.replace(
    /export default function HomeScreen\s*\(\)\s*\{/,
    `export default function HomeScreen() {
  const [selectedMonth, setSelectedMonth] = React.useState('5');
  const [selectedDay, setSelectedDay] = React.useState('1');`
  );
  lines = code.split("\n");
}

// 2. ვპოულობთ ზუსტად სიდან იწყება 1043-ე ხაზის გარშემო კომენტარი "{/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */}"
let startIndex = -1;
lines.forEach((l, idx) => {
  if (l.includes("ტყუპები და სხვა ნიშნები ღილაკი")) {
    startIndex = idx;
  }
});

// 3. ვპოულობთ სად მთავრდება ეს ბლოკები (სადაც მთავარი ნავიგაცია ან ბოლო სექცია იწყება, მაგალითად ბოლო მოდალის დახურვა)
let endIndex = -1;
if (startIndex !== -1) {
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes("bottomNav") || lines[i].includes("🧭 მთავარი ნავიგაცია")) {
      endIndex = i - 1;
      break;
    }
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  const interactivePanel = `
        {/* 🌟 ცნობილი ტყუპების ინტერაქტიული პანელი */}
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

  // ვჭრით ძველ ხაზებს და ვუერთებთ ახალ პანელს
  const newLines = [
    ...lines.slice(0, startIndex),
    interactivePanel,
    ...lines.slice(endIndex)
  ];

  fs.writeFileSync("App.js", newLines.join("\n"), "utf8");
  console.log("Old blocks removed by line index and new panel added successfully!");
} else {
  console.log("Could not determine exact line boundaries.");
}
