const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const geminiBlock = `
      {activeTab === 'ტყუპები' && (
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
            <Text style={styles.bodyText}>• მოტივაცია: {GEMINI_ENCYCLOPEDIA.personality.motivation}</Text>
            <Text style={styles.bodyText}>• კომფორტი: {GEMINI_ENCYCLOPEDIA.personality.comfort}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ ძლიერი მხარეები</Text>
            {GEMINI_ENCYCLOPEDIA.strengths.map((item, i) => (
              <Text key={i} style={{ color: '#d4af37', fontSize: 13, marginBottom: 4 }}>✓ {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚠️ გამოწვევები</Text>
            {GEMINI_ENCYCLOPEDIA.challenges.map((item, i) => (
              <Text key={i} style={{ color: '#ffb74d', fontSize: 13, marginBottom: 4 }}>• {item}</Text>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎭 ტყუპები სხვადასხვა სიტუაციაში</Text>
            <Text style={styles.bodyText}>🎉 ბედნიერი: {GEMINI_ENCYCLOPEDIA.situations.happy}</Text>
            <Text style={styles.bodyText}>🔥 გაბრაზებული: {GEMINI_ENCYCLOPEDIA.situations.angry}</Text>
            <Text style={styles.bodyText}>🌪️ სტრესში: {GEMINI_ENCYCLOPEDIA.situations.stressed}</Text>
            <Text style={styles.bodyText}>☕ მოწყენილი: {GEMINI_ENCYCLOPEDIA.situations.bored}</Text>
            <Text style={styles.bodyText}>🌙 მარტო: {GEMINI_ENCYCLOPEDIA.situations.alone}</Text>
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
            <Text style={styles.bodyText}>სტილი: {GEMINI_ENCYCLOPEDIA.career.style}</Text>
            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 4 }}>როლები: {GEMINI_ENCYCLOPEDIA.career.roles}</Text>
          </View>
        </ScrollView>
      )}
`;

const target = "{activeTab === 'ჰოროსკოპი' && (";
if (code.includes(target) && !code.includes("activeTab === 'ტყუპები'")) {
  code = code.replace(target, geminiBlock + "\n" + target);
  fs.writeFileSync('App.js', code, 'utf8');
  console.log('✅ ტყუპების ჩანართი წარმატებით დაემატა!');
} else {
  console.log('⚠️ ან უკვე არსებობს, ან სამიზნე ხაზი ვერ მოიძებნა.');
}
