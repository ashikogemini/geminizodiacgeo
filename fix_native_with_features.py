import sys

with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# დარწმუნდეთ რომ Video და useRef/useState იმპორტირებულია
if "import { Video }" not in content:
    content = content.replace("import { WebView } from 'react-native-webview';", "import { Video } from 'expo-av';")

# ვიპოვოთ ჰოროსკოპის სექცია და შევცვალოთ სრულად ინტერაქტიული ნატივ პლეერით
start_str = "{activeTab === 'ჰოროსკოპი' ? ("
start_idx = content.find(start_str)

if start_idx != -1:
    sub_content = content[start_idx:]
    end_idx = sub_content.find(") : (\n        <ScrollView")
    if end_idx != -1:
        actual_end = start_idx + end_idx + 1
        
        new_code = """{activeTab === 'ჰოროსკოპი' ? (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 35 }}>
          <Text style={styles.pageTitle}>ასტროლოგიური პროგნოზები</Text>
          
          <View style={styles.tabBar}>
            {[
              { key: 'week', label: 'კვირის პროგნოზი' },
              { key: 'month', label: 'თვის პროგნოზი' },
              { key: 'year', label: 'წლის პროგნოზი' }
            ].map(item => (
              <TouchableOpacity
                key={item.key}
                style={[styles.tabBtn, horoscopeType === item.key && styles.activeTabBtn]}
                onPress={() => setHoroscopeType(item.key)}
              >
                <Text style={[styles.tabBtnText, horoscopeType === item.key && styles.activeTabBtnText]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 🎬 ნატივი ვიდეო პლეერი */}
          <View style={styles.card}>
            <View style={{ width: '100%', height: 200, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
              <Video
                source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                useNativeControls={true}
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>
              {horoscopeType === 'week' ? '📅 კვირის ვიდეო ჰოროსკოპი ტყუპებისთვის' : horoscopeType === 'month' ? '🌙 თვის ვიდეო პროგნოზი' : '⭐ წლის ასტროლოგიური მიმოხილვა'}
            </Text>
            <Text style={styles.bodyText}>
              {horoscopeType === 'week' 
                ? 'ეს კვირა სავსეა მენტალური დინამიკითა და ახალი იდეებით. ყურადღება მიაქციეთ კომუნიკაციას და მოერიდეთ ნაჩქარევ დასკვნებს.'
                : horoscopeType === 'month'
                ? 'მიმდინარე თვე მოიტანს დიდ ცვლილებებს პერსონალურ და კარიერულ სფეროში. მზად იყავით ახალი შემოთავაზებებისთვის.'
                : 'წლის განმავლობაში ტყუპები შეძლებენ თავიანთი პოტენციულის მაქსიმალურად გამოვლენას და ახალი ჰორიზონტების დაპყრობას.'}
            </Text>

            {/* ❤️ ინტერაქცია: ლაიქები და გაზიარება */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('გული დაიწერა! ❤️')}>
                <Ionicons name="heart" size={22} color="#ff4757" />
                <Text style={{ color: '#fff', marginLeft: 6, fontWeight: 'bold' }}>248</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('გაზიარებულია!')}>
                <Ionicons name="share-social-outline" size={20} color="#d4af37" />
                <Text style={{ color: '#d4af37', marginLeft: 6, fontWeight: 'bold' }}>გაზიარება</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 💬 კომენტარების სექცია აპის შიგნით */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💬 კომენტარები</Text>
            
            <View style={{ flexDirection: 'row', marginBottom: 14, marginTop: 8 }}>
              <TextInput 
                style={[styles.input, { flex: 1, marginRight: 8, marginBottom: 0 }]} 
                placeholder="დაწერე კომენტარი..." 
                placeholderTextColor="#666" 
              />
              <TouchableOpacity style={[styles.btn, { marginTop: 0, paddingVertical: 10, paddingHorizontal: 16 }]} onPress={() => alert('კომენტარი დაემატა!')}>
                <Text style={styles.btnText}>გაგზავნა</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#070913', padding: 10, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
              <Text style={{ color: '#d4af37', fontWeight: 'bold', fontSize: 12, marginBottom: 2 }}>სალომე</Text>
              <Text style={{ color: '#fff', fontSize: 13 }}>ძალიან ზუსტი პროგნოზია, მადლობა! ❤️</Text>
            </View>
            <View style={{ backgroundColor: '#070913', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
              <Text style={{ color: '#d4af37', fontWeight: 'bold', fontSize: 12, marginBottom: 2 }}>გიორგი</Text>
              <Text style={{ color: '#fff', fontSize: 13 }}>იუმორი მართლაც გვჭირდება ამ პერიოდში 😄</Text>
            </View>
          </View>
        </ScrollView>
      ) """

        content = content[:start_idx] + new_code + content[actual_end:]
        with open("App.js", "w", encoding="utf-8") as f:
            f.write(content)
        print("✅ აპლიკაციის შიდა პლეერი და კომენტარები წარმატებით დაინსტალირდა!")
else:
    print("❌ ჰოროსკოპის სექცია ვერ მოიძებნა.")
