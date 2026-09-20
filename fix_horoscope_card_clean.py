with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

clean_card = """          <View style={styles.card}>
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
          </View>"""

if "ასტროლოგიური პროგნოზები" in content and "💬 კომენტარები" in content:
    parts = content.split("💬 კომენტარები")
    before_comments = parts[0]
    after_comments = parts[1]
    
    tabbar_idx = before_comments.find("styles.tabBar")
    if tabbar_idx != -1:
        map_end_idx = before_comments.find("</View>", tabbar_idx)
        if map_end_idx != -1:
            second_close_idx = before_comments.find("</View>", map_end_idx + 7)
            if second_close_idx != -1:
                keep_part = before_comments[:second_close_idx + 7]
                new_content = keep_part + "\n\n" + clean_card + "\n\n          <View style={styles.card}>\n            <Text style={styles.cardTitle}>💬 კომენტარები" + after_comments
                with open("App.js", "w", encoding="utf-8") as f:
                    f.write(new_content)
                print("✅ სტრუქტურა წარმატებით აღდგა და დაიბალანსდა!")
            else:
                print("⚠️ Tab bar closing tags not found cleanly.")
        else:
            print("⚠️ Tab bar map end not found.")
    else:
        print("⚠️ tabBar style not found.")
else:
    print("⚠️ Markers not found.")
