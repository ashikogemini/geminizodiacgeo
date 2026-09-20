with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

clean_card = """          <View style={styles.card}>
            <View style={{ width: '100%', height: 180, backgroundColor: '#0d1322', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              <MaterialCommunityIcons name="play-circle" size={64} color="#d4af37" />
              <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>ვიდეო პროგნოზი მზად არის</Text>
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
          </View>"""

start_pos = content.find("ასტროლოგიური პროგნოზები")
comments_pos = content.find("💬 კომენტარები")

if start_pos != -1 and comments_pos != -1:
    card_start = content.find("<View style={styles.card}>", start_pos)
    comments_card_start = content.rfind("<View style={styles.card}>", start_pos, comments_pos)
    
    if card_start != -1 and comments_card_start != -1:
        content = content[:card_start] + clean_card + "\n\n          " + content[comments_card_start:]
        with open("App.js", "w", encoding="utf-8") as f:
            f.write(content)
        print("✅ ვიდეო პლეერი ამოღებულია და სტრუქტურა იდეალურად გასწორდა!")
    else:
        print("⚠️ Card boundaries not found.")
else:
    print("⚠️ Markers not found.")
