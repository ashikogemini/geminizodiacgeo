with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

import re

# 1. ვასწორებთ ზედმეტ დახურულ ტეგებს, რომლებიც ScrollView-ს ბალანსს არღვევს
content = content.replace("</View>\n          </View>\n\n          <View style={styles.card}>", "</View>\n\n          <View style={styles.card}>")
content = content.replace("</View>\n            </View>\n\n          <View style={styles.card}>", "</View>\n\n          <View style={styles.card}>")

# 2. ვიდეოს კომპონენტის ნაცვლად ვბრუნდებით საწყის მუშა ფეიქ-ჩარჩოზე
clean_placeholder = """            <View style={{ width: '100%', height: 180, backgroundColor: '#0d1322', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              <MaterialCommunityIcons name="play-circle" size={64} color="#d4af37" />
              <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>ვიდეო პროგნოზი მზად არის</Text>
            </View>"""

# ვანაცვლებთ <Video ... /> ტეგს საწყისი ჩარჩოთი
content = re.sub(r'<Video[\s\S]*?isLooping\s*/>', clean_placeholder, content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ აპლიკაციის კოდი გაწმენდილია და წარმატებით დაბალანსდა!")
