const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ძველი მარტო "დახურვა" ღილაკები მოკლევადიანი და გრძელვადიანი მოდალებისთვის
const shortFooterOld = `<TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>`;

const longFooterOld = `<TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>`;

// ახალი ორი ღილაკი: "უკან" (რომელიც ხსნის საწყის მოდალს) და "დახურვა"
const newFooterShort = `<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <TouchableOpacity onPress={() => { setIsShortModalVisible(false); setIsStartupModalVisible(true); }} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>უკან</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 8}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>`;

const newFooterLong = `<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <TouchableOpacity onPress={() => { setIsLongModalVisible(false); setIsStartupModalVisible(true); }} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>უკან</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 8}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>`;

code = code.replace(shortFooterOld, newFooterShort);
code = code.replace(longFooterOld, newFooterLong);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ "უკან" ღილაკი წარმატებით დაემატა!');
