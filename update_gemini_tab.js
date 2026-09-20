const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვამოწმებთ არის თუ არა იმპორტი დამატებული
if (!code.includes("import { GEMINI_ENCYCLOPEDIA }")) {
  code = "import { GEMINI_ENCYCLOPEDIA } from './geminiData';\n" + code;
}

// ვეძებთ ტყუპების ჩანართის რენდერს და ვცვლით მდიდარი ენციკლოპედიური ხედით
// მარტივად რომ ვთქვათ, ვანაცვლებთ activeTab === 'ტყუპები' ბლოკს
const targetSegment = "activeTab === 'ტყუპები' && (";

if (code.includes(targetSegment)) {
  console.log('ტყუპების ჩანართი ნაპოვნია, ვანახლებთ ვიზუალს...');
}

// ვწერთ სკრიპტს რომელიც განაახლებს ეკრანს
const replacementCode = `activeTab === 'ტყუპები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>♊ ტყუპები — ზოგადი მიმოხილვა</Text>
            <Text style={styles.bodyText}>პერიოდი: {GEMINI_ENCYCLOPEDIA.overview.period}</Text>
            <Text style={styles.bodyText}>სტიქია: {GEMINI_ENCYCLOPEDIA.overview.element}</Text>
            <Text style={styles.bodyText}>მმართველი პლანეტა: {GEMINI_ENCYCLOPEDIA.overview.rulingPlanet}</Text>
            <Text style={styles.bodyText}>მოდალობა: {GEMINI_ENCYCLOPEDIA.overview.modality}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 8, lineHeight: 18 }}>{GEMINI_ENCYCLOPEDIA.overview.essence}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🧠 პიროვნება და ხასიათი</Text>
            <Text style={styles.bodyText}>• აზროვნება: {GEMINI_ENCYCLOPEDIA.personality.thinking}</Text>
            <Text style={styles.bodyText}>• საუბარი: {GEMINI_ENCYCLOPEDIA.personality.talking}</Text>
            <Text style={styles.bodyText}>• ქცევა: {GEMINI_ENCYCLOPEDIA.personality.behavior}</Text>
            <Text style={styles.bodyText}>• ადაპტაცია: {GEMINI_ENCYCLOPEDIA.personality.adaptability}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ ძლიერი მხარეები</Text>
            {GEMINI_ENCYCLOPEDIA.strengths.map((item, idx) => (
              <Text key={idx} style={{ color: '#d4af37', fontSize: 13, marginBottom: 4 }}>✓ {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚠️ გამოწვევები</Text>
            {GEMINI_ENCYCLOPEDIA.challenges.map((item, idx) => (
              <Text key={idx} style={{ color: '#ffb74d', fontSize: 13, marginBottom: 4 }}>• {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎭 ტყუპები სხვადასხვა სიტუაციაში</Text>
            <Text style={styles.bodyText}>🎉 როცა ბედნიერია: {GEMINI_ENCYCLOPEDIA.situations.happy}</Text>
            <Text style={styles.bodyText}>🔥 როცა გაბრაზებულია: {GEMINI_ENCYCLOPEDIA.situations.angry}</Text>
            <Text style={styles.bodyText}>🌪️ როცა სტრესშია: {GEMINI_ENCYCLOPEDIA.situations.stressed}</Text>
            <Text style={styles.bodyText}>☕ როცა მოწყენილია: {GEMINI_ENCYCLOPEDIA.situations.bored}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💬 კომუნიკაცია</Text>
            <Text style={styles.bodyText}>{GEMINI_ENCYCLOPEDIA.communication.style}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>არ მოსწონს: {GEMINI_ENCYCLOPEDIA.communication.petPeeves}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💖 სიყვარული და ურთიერთობები</Text>
            <Text style={styles.bodyText}>{GEMINI_ENCYCLOPEDIA.love.vibe}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>რას ელოდება: {GEMINI_ENCYCLOPEDIA.love.needs}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💼 კარიერა და სამუშაო</Text>
            <Text style={styles.bodyText}>გარემო: {GEMINI_ENCYCLOPEDIA.career.environment}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>სტილი: {GEMINI_ENCYCLOPEDIA.career.style}</Text>
          </View>
        </ScrollView>
      );`;

// ვცდილობთ ჩავანაცვლოთ ძველი ტყუპების ჩანართი
const startIdx = code.indexOf("activeTab === 'ტყუპები'");
if (startIdx !== -1) {
  // ვპოულობთ ბლოკის დასაწყისს და დასასრულს
  const bracketOpen = code.indexOf('(', startIdx);
  // ვპოულობთ შესაბამის დამხურ ფრჩხილს ან ScrollView-ს ბოლოს
  // უსაფრთხოებისთვის ვანაცვლებთ მთლიან სეგმენტს
  console.log('მზად არის ჩანაცვლებისთვის');
}

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ტყუპების ბაზა წარმატებით მიერთდა!');
"
npx expo start --clear --port 8082
cat << 'EOF' > force_update_tab.js
const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes("import { GEMINI_ENCYCLOPEDIA }")) {
  code = "import { GEMINI_ENCYCLOPEDIA } from './geminiData';\n" + code;
}

const richContent = `activeTab === 'ტყუპები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>♊ ტყუპები — ზოგადი მიმოხილვა</Text>
            <Text style={styles.bodyText}>პერიოდი: {GEMINI_ENCYCLOPEDIA.overview.period}</Text>
            <Text style={styles.bodyText}>სტიქია: {GEMINI_ENCYCLOPEDIA.overview.element}</Text>
            <Text style={styles.bodyText}>მმართველი პლანეტა: {GEMINI_ENCYCLOPEDIA.overview.rulingPlanet}</Text>
            <Text style={styles.bodyText}>მოდალობა: {GEMINI_ENCYCLOPEDIA.overview.modality}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 8, lineHeight: 18 }}>{GEMINI_ENCYCLOPEDIA.overview.essence}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🧠 პიროვნება და ხასიათი</Text>
            <Text style={styles.bodyText}>• აზროვნება: {GEMINI_ENCYCLOPEDIA.personality.thinking}</Text>
            <Text style={styles.bodyText}>• საუბარი: {GEMINI_ENCYCLOPEDIA.personality.talking}</Text>
            <Text style={styles.bodyText}>• ქცევა: {GEMINI_ENCYCLOPEDIA.personality.behavior}</Text>
            <Text style={styles.bodyText}>• ადაპტაცია: {GEMINI_ENCYCLOPEDIA.personality.adaptability}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ ძლიერი მხარეები</Text>
            {GEMINI_ENCYCLOPEDIA.strengths.map((item, idx) => (
              <Text key={idx} style={{ color: '#d4af37', fontSize: 13, marginBottom: 4 }}>✓ {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚠️ გამოწვევები</Text>
            {GEMINI_ENCYCLOPEDIA.challenges.map((item, idx) => (
              <Text key={idx} style={{ color: '#ffb74d', fontSize: 13, marginBottom: 4 }}>• {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎭 ტყუპები სხვადასხვა სიტუაციაში</Text>
            <Text style={styles.bodyText}>🎉 როცა ბედნიერია: {GEMINI_ENCYCLOPEDIA.situations.happy}</Text>
            <Text style={styles.bodyText}>🔥 როცა გაბრაზებულია: {GEMINI_ENCYCLOPEDIA.situations.angry}</Text>
            <Text style={styles.bodyText}>🌪️ როცა სტრესშია: {GEMINI_ENCYCLOPEDIA.situations.stressed}</Text>
            <Text style={styles.bodyText}>☕ როცა მოწყენილია: {GEMINI_ENCYCLOPEDIA.situations.bored}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💬 კომუნიკაცია</Text>
            <Text style={styles.bodyText}>{GEMINI_ENCYCLOPEDIA.communication.style}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>არ მოსწონს: {GEMINI_ENCYCLOPEDIA.communication.petPeeves}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💖 სიყვარული და ურთიერთობები</Text>
            <Text style={styles.bodyText}>{GEMINI_ENCYCLOPEDIA.love.vibe}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>რას ელოდება: {GEMINI_ENCYCLOPEDIA.love.needs}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💼 კარიერა და სამუშაო</Text>
            <Text style={styles.bodyText}>გარემო: {GEMINI_ENCYCLOPEDIA.career.environment}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>სტილი: {GEMINI_ENCYCLOPEDIA.career.style}</Text>
          </View>
        </ScrollView>
      )`;

const idx = code.indexOf("activeTab === 'ტყუპები'");
if (idx !== -1) {
  let lineStart = code.lastIndexOf('\n', idx);
  let nextTabIdx = code.indexOf("activeTab ===", idx + 20);
  if (nextTabIdx === -1) nextTabIdx = code.indexOf("activeTab===", idx + 20);
  
  if (nextTabIdx !== -1) {
    code = code.substring(0, lineStart) + "\n      " + richContent + "\n      " + code.substring(nextTabIdx);
    fs.writeFileSync('App.js', code, 'utf8');
    console.log('✅ ტყუპების ჩანართი წარმატებით განახლდა!');
  } else {
    console.log('⚠️ შემდეგი ჩანართი ვერ მოიძებნა.');
  }
} else {
  console.log('❌ activeTab ვერ მოიძებნა.');
}
