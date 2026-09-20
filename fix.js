const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes('renderFormattedHoroscope')) {
  const helper = `
const renderFormattedHoroscope = (rawText) => {
  if (!rawText) return null;
  let cleaned = rawText.replace(/#/g, '');
  let paragraphs = cleaned.split('\\n').filter(p => p.trim() !== '');
  let advice = paragraphs.length > 4 ? paragraphs.pop() : null;
  return (
    <View>
      {paragraphs.map((para, index) => {
        let isSec = para.startsWith('სიყვარული') || para.startsWith('კარიერა') || para.startsWith('ფინანსები') || para.startsWith('კეთილდღეობა');
        return (
          <Text key={index} style={[styles.bodyText, isSec && { color: '#d4af37', fontWeight: 'bold', marginTop: 8 }]}>
            {para}
          </Text>
        );
      })}
      {advice && (
        <View style={{ marginTop: 12, padding: 12, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#d4af37' }}>
          <Text style={{ color: '#d4af37', fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>💡 დღის რჩევა:</Text>
          <Text style={{ color: '#ddd', fontSize: 13, lineHeight: 18 }}>{advice}</Text>
        </View>
      )}
    </View>
  );
};
`;
  code = helper + '\n' + code;
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ ფორმატირების ფუნქცია წარმატებით დაემატა!');
} else {
  console.log('✅ ფუნქცია უკვე არის კოდში!');
}
