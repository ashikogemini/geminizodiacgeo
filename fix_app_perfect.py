with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# იდეალურად დაბალანსებული ჰოროსკოპის ბარათი ვიდეოთი
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

# ვეძებთ ზუსტ საყრდენ წერტილებს: ტაბ-ბარის დასასრულსა და კომენტარების ბარათის დასაწყისს
pos_tabbar = content.find("styles.tabBar")
pos_comments = content.find("💬 კომენტარები")

if pos_tabbar != -1 and pos_comments != -1:
    pos_tabbar_close = content.find("</View>", pos_tabbar)
    # ვეძებთ კომენტარების ბარათის დამწყებ <View>-ს
    pos_card_start = content.rfind("<View style={styles.card}>", 0, pos_comments)
    
    if pos_tabbar_close != -1 and pos_card_start != -1:
        # ვანაცვლებთ შუა ნაწილს სუფთა კოდით
        new_content = content[:pos_tabbar_close + 7] + "\n\n" + clean_card + "\n\n          " + content[pos_card_start:]
        with open("App.js", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("✅ სტრუქტურა წარმატებით გასწორდა და დაიბალანსდა!")
    else:
        print("⚠️ საზღვრები ვერ მოიძებნა ზუსტად.")
else:
    print("⚠️ მარკერები ვერ მოიძებნა.")
