const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვამატებთ მდგომარეობის (state) ცვლადს საწყისში, თუ არ ჯდება
if (!code.includes('modalSource')) {
  code = code.replace(
    /const \[selectedDateOffset/,
    `const [modalSource, setModalSource] = useState(null);\n  const [selectedDateOffset`
  );
}

// 2. ვანაცვლებთ პროგნოზების ტაბიდან გახსნის ღილაკებს
code = code.replace(
  /onPress=\{\(\) => setIsShortModalVisible\(true\)\}/g,
  `onPress={() => { setModalSource('tab'); setIsShortModalVisible(true); }}`
);
code = code.replace(
  /onPress=\{\(\) => setIsLongModalVisible\(true\)\}/g,
  `onPress={() => { setModalSource('tab'); setIsLongModalVisible(true); }}`
);

// 3. ვანაცვლებთ სტარტაპ მენიუდან გახსნის ღილაკებს
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsStartupModalVisible\(false\);\s*setIsShortModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setModalSource('startup'); setIsStartupModalVisible(false); setIsShortModalVisible(true); }}`
);
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsStartupModalVisible\(false\);\s*setIsLongModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setModalSource('startup'); setIsStartupModalVisible(false); setIsLongModalVisible(true); }}`
);

// 4. ვასწორებთ „უკან“ ღილაკის ქცევას მოკლევადიანი და გრძელვადიანი ასპექტების ფანჯრებში
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsShortModalVisible\(false\);\s*setIsStartupModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setIsShortModalVisible(false); if (modalSource === 'startup') setIsStartupModalVisible(true); }}`
);
code = code.replace(
  /onPress=\{\(\) => \{\s*setIsLongModalVisible\(false\);\s*setIsStartupModalVisible\(true\);\s*\}\}/g,
  `onPress={() => { setIsLongModalVisible(false); if (modalSource === 'startup') setIsStartupModalVisible(true); }}`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ნავიგაციის ლოგიკა წარმატებით განახლდა!');
