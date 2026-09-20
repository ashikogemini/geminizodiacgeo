with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. ვამოწმებთ და ვამატებთ expo-av Video იმპორტს თავში
if "from 'expo-av'" not in content:
    content = "import { Video } from 'expo-av';\n" + content

# 2. ვიპოვოთ საიდან იწყება ჰოროსკოპის ტაბი
start_marker = "{activeTab === 'ჰოროსკოპი' ? ("
start_idx = content.find(start_marker)

if start_idx != -1:
    # ვეძებთ სად მთავრდება ეს სექცია (სადაც მეორე ტაბი იწყება, მაგალითად activeTab === 'მთვარე' ან მსგავსი)
    # ალტერნატიულად, ვპოვებთ კომენტარების ბარათის შემდგომ დასასრულს
    # მოდით ვიპოვოთ სად მთავრდება ScrollView ამ ტაბისთვის
    # მარტივად რომ ვთქვათ, შევცვალოთ მთლიანი ბლოკი კომენტარების ჩათვლით
    
    clean_horoscope_tab = """{activeTab === 'ჰოროსკოპი' ? (
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

            <View style={styles.card}>
              <Video
                source={require('./VID_20260918_032807_765_bsl.mp4')}
                style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
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
            </View>

          </ScrollView>
        ) :"""

    # ვეძებთ სად მთავრდება ეს პირობა (შემდეგი ტაბის ან კომპონენტის დასაწყისი)
    # მაგალითად, ვეძებთ შემდეგი აქტიური ტაბის შემოწმებას
    next_tab_marker = content.find("{activeTab === '", start_idx + len(start_marker))
    if next_tab_marker != -1:
        new_content = content[:start_idx] + clean_horoscope_tab + "\n        " + content[next_tab_marker:]
        with open("App.js", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("✅ ჰოროსკოპის სექცია სრულად და იდეალურად აეწყო თავიდან!")
    else:
        print("⚠️ მომდევნო ტაბი ვერ მოიძებნა.")
else:
    print("⚠️ ჰოროსკოპის სექცია ვერ მოიძებნა.")
