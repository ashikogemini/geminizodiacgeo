const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვამოწმებთ, რომ ცნობილი ტყუპების მოდალური ფანჯრის JSX მზად იყოს და მივამმაგროთ ღილაკს
const famousModalCode = `
      {/* ცნობილი ტყუპების მოდალური ფანჯარა */}
      <Modal visible={showFamousModal} animationType="slide" transparent={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <View style={{width: '85%', backgroundColor: '#131b2e', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#d4af37'}}>
            <Text style={{color: '#d4af37', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15}}>🌟 ცნობილი ტყუპები</Text>
            
            <Text style={{color: '#fff', marginBottom: 5}}>აირჩიე თვე:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
              <TouchableOpacity onPress={() => setSelectedMonth('5')} style={{flex: 1, padding: 10, backgroundColor: selectedMonth === '5' ? '#d4af37' : '#1f293d', marginRight: 5, alignItems: 'center', borderRadius: 8}}>
                <Text style={{color: selectedMonth === '5' ? '#0d1322' : '#fff', fontWeight: 'bold'}}>მაისი</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedMonth('6')} style={{flex: 1, padding: 10, backgroundColor: selectedMonth === '6' ? '#d4af37' : '#1f293d', marginLeft: 5, alignItems: 'center', borderRadius: 8}}>
                <Text style={{color: selectedMonth === '6' ? '#0d1322' : '#fff', fontWeight: 'bold'}}>ივნისი</Text>
              </TouchableOpacity>
            </View>

            <Text style={{color: '#fff', marginBottom: 5}}>მიუთითე რიცხვი (1-31):</Text>
            <TextInput 
              style={{backgroundColor: '#1f293d', color: '#fff', padding: 10, borderRadius: 8, marginBottom: 15, textAlign: 'center', fontSize: 16}}
              keyboardType="numeric"
              maxLength={2}
              value={selectedDay}
              onChangeText={setSelectedDay}
            />

            <Text style={{color: '#d4af37', fontSize: 14, fontWeight: 'bold', marginTop: 10, marginBottom: 5}}>შედეგები:</Text>
            <ScrollView style={{maxHeight: 150, backgroundColor: '#0d1322', padding: 10, borderRadius: 8, marginBottom: 15}}>
              {
                (() => {
                  const key = \`\${selectedDay}-\${selectedMonth}\`;
                  const results = FAMOUS_GEMINI_DATA[key];
                  if (!results) {
                    return <Text style={{color: '#888', textAlign: 'center'}}>ამ თარიღისთვის ჩანაწერები არ მოიძებნა. სცადე სხვა დღე (მაგ: 1-6, 4-6, 31-5)</Text>;
                  }
                  return results.map((person, idx) => (
                    <View key={idx} style={{marginBottom: 8}}>
                      <Text style={{color: '#d4af37', fontWeight: 'bold'}}>• {person.name} ({person.year})</Text>
                      <Text style={{color: '#ccc', fontSize: 12}}>{person.role}</Text>
                    </View>
                  ));
                })()
              }
            </ScrollView>

            <TouchableOpacity 
              style={{backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}
              onPress={() => setShowFamousModal(false)}
            >
              <Text style={{color: '#0d1322', fontWeight: 'bold', fontSize: 16}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
`;

// თუ მოდალი უკვე არ წერია ფაილში, ვამატებთ ბოლოში
if (!appCode.includes("ცნობილი ტყუპების მოდალური ფანჯარა")) {
  appCode = appCode.replace(/<\/View>\s*$/, famousModalCode + "\n</View>");
}

fs.writeFileSync("App.js", appCode, "utf8");
console.log("Famous modal JSX successfully attached!");
