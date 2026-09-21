import { getDynamicAspects } from './astronomyCalculator';
const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ამოვშალოთ ძველი მოკლევადიანი და გრძელვადიანი მოდალური ფანჯრები, თუ ისინი არსებობს
code = code.replace(/\{\/\* მოკლევადიანი ასპექტების მოდალური ფანჯარა \*\/\}[\s\S]*?<\/Modal>/g, '');
code = code.replace(/\{\/\* გრძელვადიანი ასპექტების მოდალური ფანჯარა \*\/\}[\s\S]*?<\/Modal>/g, '');

// ახალი სრული მოდალები, რომლებიც შეიცავს როგორც სრულ ტექსტებს, ისე სწორ დახურვის/უკან ღილაკებს
const modalsJSX = `
      {/* მოკლევადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isShortModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, width: '100%', maxWidth: 380, maxHeight: '80%', borderWidth: 1, borderColor: '#d4af37'}}>
            <Text style={{color: '#d4af37', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>⚡ მოკლევადიანი ასპექტები</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{maxHeight: 400}}>
              {shortTermAspects.map((item, index) => (
                <View key={index} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                  <Text style={{color: '#d4af37', fontSize: 15, fontWeight: 'bold', marginBottom: 4}}>{item.title}</Text>
                  <Text style={{color: '#ffd700', fontSize: 13, marginBottom: 6}}>🪐 {item.planets}</Text>
                  <Text style={{color: '#fff', fontSize: 13, marginBottom: 6, lineHeight: 18}}>{item.impact}</Text>
                  <Text style={{color: '#4cd137', fontSize: 12, marginBottom: 4}}>✨ მანიფესტაცია: {item.manifestation}</Text>
                  <Text style={{color: '#00a8ff', fontSize: 12}}>💡 რჩევა: {item.advice}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              {modalSource === 'startup' && (
                <TouchableOpacity onPress={() => { setIsShortModalVisible(false); setIsStartupModalVisible(true); }} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                  <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>უკან</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: modalSource === 'startup' ? 8 : 0}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* გრძელვადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isLongModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, width: '100%', maxWidth: 380, maxHeight: '80%', borderWidth: 1, borderColor: '#d4af37'}}>
            <Text style={{color: '#d4af37', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>🪐 გრძელვადიანი ასპექტები</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{maxHeight: 400}}>
              {longTermAspects.map((item, index) => (
                <View key={index} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                  <Text style={{color: '#d4af37', fontSize: 15, fontWeight: 'bold', marginBottom: 4}}>{item.title}</Text>
                  <Text style={{color: '#ffd700', fontSize: 13, marginBottom: 6}}>🪐 {item.planets}</Text>
                  <Text style={{color: '#fff', fontSize: 13, marginBottom: 6, lineHeight: 18}}>{item.theme}</Text>
                  <Text style={{color: '#4cd137', fontSize: 12, marginBottom: 4}}>✨ მანიფესტაცია: {item.manifestation}</Text>
                  {item.cautions && <Text style={{color: '#ff4757', fontSize: 12, marginBottom: 4}}>⚠️ სიფრთხილე: {item.cautions}</Text>}
                  <Text style={{color: '#00a8ff', fontSize: 12}}>💡 რჩევა: {item.advice}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              {modalSource === 'startup' && (
                <TouchableOpacity onPress={() => { setIsLongModalVisible(false); setIsStartupModalVisible(true); }} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                  <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>უკან</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: modalSource === 'startup' ? 8 : 0}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
`;

// ვამატებთ ფაილის ბოლოში (return-ის შიგნით, ბოლო მთავარი View-ს დახურვამდე)
code = code.replace(/<\/SafeAreaView>[\s\S]*?<\/View>\s*$/, modalsJSX + "\n      </SafeAreaView>\n    </View>");

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდალური ფანჯრები და ტექსტები სრულად აღდგა და განახლდა!');
