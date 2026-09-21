const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ modalSource სტეიტს, თუ არ არის
if (!code.includes('modalSource')) {
  code = code.replace(
    /const \[selectedDateOffset/,
    `const [modalSource, setModalSource] = useState('startup');\n  const [selectedDateOffset`
  );
}

// 2. ვცვლით გახსნის ლოგიკას ტაბიდან
code = code.replace(
  /onPress=\{\(\) => setIsShortModalVisible\(true\)\}/g,
  `onPress={() => { setModalSource('tab'); setIsShortModalVisible(true); }}`
);
code = code.replace(
  /onPress=\{\(\) => setIsLongModalVisible\(true\)\}/g,
  `onPress={() => { setModalSource('tab'); setIsLongModalVisible(true); }}`
);

// 3. ვცვლით გახსნის ლოგიკას სტარტაპ მენიუდან
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsStartupModalVisible\(false\);\s*setIsShortModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setModalSource('startup'); setIsStartupModalVisible(false); setIsShortModalVisible(true); }}`
);
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsStartupModalVisible\(false\);\s*setIsLongModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setModalSource('startup'); setIsStartupModalVisible(false); setIsLongModalVisible(true); }}`
);

// 4. ვცვლით მოკლევადიანი მოდის ღილაკების ბლოკს
code = code.replace(
  /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>\s*<TouchableOpacity[\s\S]*?უკან<\/Text>\s*<\/TouchableOpacity>\s*<TouchableOpacity[\s\S]*?დახურვა<\/Text>\s*<\/TouchableOpacity>\s*<\/View>/g,
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

// 5. ვცვლით გრძელვადიანი მოდის ღილაკების ბლოკს
code = code.replace(
  /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>\s*<TouchableOpacity[\s\S]*?უკან<\/Text>\s*<\/TouchableOpacity>\s*<TouchableOpacity[\s\S]*?დახურვა<\/Text>\s*<\/TouchableOpacity>\s*<\/View>/g,
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
console.log('✅ უსაფრთხო განახლება დასრულდა!');
