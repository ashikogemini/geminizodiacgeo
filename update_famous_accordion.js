const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვპოულობთ არსებულ სტატიკურ ცნობილი ტყუპების ბლოკს და ვცვლით დინამიური ძებნის კომპონენტით
const oldStaticBlockRegex = /<Text style=\{modalItemTitle\}>\s*🌟 ცნობილი ტყუპები\s*<\/Text>[\s\S]*?<\/View>/;

const dynamicFamousBlock = `
<Text style={modalItemTitle}>🌟 ცნობილი ტყუპები (თარიღით ძებნა)</Text>
<View style={{marginTop: 10, padding: 5}}>
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
  <View style={{maxHeight: 180, backgroundColor: '#0d1322', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
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
  </View>
</View>
`;

if (appCode.includes("🌟 ცნობილი ტყუპები")) {
  // ვცვლით ძველ სტატიკურ ნაწილს ახალი დინამიური კოდით
  // ვამოწმებთ ასევე იმპორტსაც
  if (!appCode.includes("FAMOUS_GEMINI_DATA")) {
    appCode = `import { FAMOUS_GEMINI_DATA } from './famousGeminiData';\n` + appCode;
  }
  
  console.log("Replacing static block with interactive date picker...");
  // ვპოულობთ ზუსტად ამ სექციის კონტეინერს და ვანახლებთ
  appCode = appCode.replace(/<Text style=\{modalItemTitle\}>\s*🌟 ცნობილი ტყუპები\s*<\/Text>[\s\S]*?<\/View>/, dynamicFamousBlock);
  fs.writeFileSync("App.js", appCode, "utf8");
  console.log("Famous accordion successfully updated!");
} else {
  console.log("Could not find static famous block.");
}
