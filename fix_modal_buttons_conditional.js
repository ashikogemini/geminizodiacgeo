const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// მექანიზმი მოკლევადიანი და გრძელვადიანი ასპექტების ფანჯრებისთვის
const buttonsReplacement = `
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              {modalSource === 'startup' && (
                <TouchableOpacity onPress={() => { setIsModalVisibleVar(false); setIsStartupModalVisible(true); }} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                  <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>უკან</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setIsModalVisibleVar(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: modalSource === 'startup' ? 8 : 0}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>
`;

// ვცვლით მოკლევადიანი მოდისთვის
code = code.replace(
  /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>[\s\S]*?setIsShortModalVisible\(false\)[^}]*?<\/View>\s*<\/View>/g,
  (match) => {
    return match.replace(/setIsShortModalVisible/g, 'setIsShortModalVisible'); // უბრალოდ ვინახავთ კონტექსტს და ვცვლით ღილაკების ბლოკს
  }
);

// უფრო ზუსტად რომ ვქნათ, უბრალოდ ვპოულობთ და ვანაცვლებთ ზუსტ სტრუქტურებს:
code = code.replace(
  /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>[\s\S]*?<Text style=\{\{color: '#d4af37', fontWeight: 'bold', fontSize: 15\}\}>უკან<\/Text>[\s\S]*?<\/View>\s*<\/View>/g,
  `
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
  `
);

code = code.replace(
  /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>[\s\S]*?<Text style=\{\{color: '#d4af37', fontWeight: 'bold', fontSize: 15\}\}>უკან<\/Text>[\s\S]*?<\/View>\s*<\/View>/g,
  `
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
  `
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ღილაკების პირობითი რენდერი წარმატებით დაინტეგრირდა!');
