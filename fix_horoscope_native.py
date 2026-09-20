import sys

with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# ვიპოვოთ და შევცვალოთ ჰოროსკოპის სექცია მთლიანად
start_str = "{activeTab === 'ჰოროსკოპი' ? ("
end_str = ") : ("

start_idx = content.find(start_str)
# ვპოულობთ პირველ შესაბამის ' ) : (' ბლოკს ჰოროსკოპის მერე
if start_idx != -1:
    # ვეძებთ სექციის დასასრულს
    sub_content = content[start_idx:]
    end_idx = sub_content.find(") : (\n        <ScrollView")
    if end_idx == -1:
        end_idx = sub_content.find(") : (\n        <ScrollView")
    
    if end_idx != -1:
        actual_end = start_idx + end_idx + 1
        
        new_horoscope_tab = """{activeTab === 'ჰოროსკოპი' ? (
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

          {/* ვიდეო ბარათი */}
          <View style={styles.card}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 30, backgroundColor: '#0d1322', borderRadius: 12, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              <MaterialCommunityIcons name="play-circle" size={64} color="#d4af37" style={{ marginBottom: 10 }} />
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
                {horoscopeType === 'week' ? '📅 კვირის ვიდეო ჰოროსკოპი ტყუპებისთვის' : horoscopeType === 'month' ? '🌙 თვის ვიდეო პროგნოზი' : '⭐ წლის ასტროლოგიური მიმოხილვა'}
              </Text>
              <Text style={{ color: '#8892b0', fontSize: 13, textAlign: 'center', paddingHorizontal: 20 }}>
                უყურეთ ვიდეოს ოფიციალურ Facebook გვერდზე და დატოვეთ თქვენი რეაქცია!
              </Text>

              <TouchableOpacity 
                style={[styles.btn, { marginTop: 16, backgroundColor: '#d4af37' }]}
                onPress={() => {
                  const url = HOROSCOPE_LINKS[horoscopeType];
                  // აქ შეგიძლია გამოიყენო Linking.openURL(url) თუ იმპორტირებული გაქვს, ან უბრალოდ alert
                  alert('გადამმისამართებთ Facebook გვერდზე ვიდეოს საყურებლად: ' + url);
                }}
              >
                <Text style={[styles.btnText, { color: '#0b0f19' }]}>▶ ვიდეოს გახსნა Facebook-ში</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>✨ რა გველის ამ პერიოდში?</Text>
            <Text style={styles.bodyText}>
              {horoscopeType === 'week' 
                ? 'ეს კვირა სავსეა მენტალური დინამიკითა და ახალი იდეებით. ყურადღება მიაქციეთ კომუნიკაციას და მოერიდეთ ნაჩქარევ დასკვნებს. თქვენი იუმორი და ლოგიკა იქნება მთავარი გამოსავალი.'
                : horoscopeType === 'month'
                ? 'მიმდინარე თვე მოიტანს დიდ ცვლილებებს პერსონალურ და კარიერულ სფეროში. მზად იყავით ახალი შემოთავაზებებისთვის და პარტნიორობისთვის.'
                : 'წლის განმავლობაში ტყუპები შეძლებენ თავიანთი პოტენციულის მაქსიმალურად გამოვლენას, ახალი ჰორიზონტების დაპყრობასა და ფინანსური სტაბილურობის მიღწევას.'}
            </Text>
          </View>

          {/* ინტერაქციის პანელი */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#111827', paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('მადლობა მოწონებისთვის! ❤️')}>
              <Ionicons name="thumbs-up" size={20} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: 'bold' }}>მოწონება</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('გახსენით Facebook გვერდი კომენტარის დასაწერად 💬')}>
              <Ionicons name="chatbubble" size={20} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: 'bold' }}>კომენტარი</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('პროგნოზი გაზიარებულია! 🔗')}>
              <Ionicons name="share-social" size={20} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: 'bold' }}>გაზიარება</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) """

        content = content[:start_idx] + new_horoscope_tab + content[actual_end:]
        with open("App.js", "w", encoding="utf-8") as f:
            f.write(content)
        print("✅ ჰოროსკოპის სექცია წარმატებით განახლდა ნატივ ბარათებით!")
    else:
        print("❌ ბოლო ვერ მოიძებნა.")
else:
    print("❌ საწყისი სექცია ვერ მოიძებნა.")
