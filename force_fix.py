with open('App.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find("<View style={styles.bottomNav}>")
end_idx = code.find("</SafeAreaView>", start_idx)

if start_idx != -1 and end_idx != -1:
    real_end_idx = code.rfind("</View>", start_idx, end_idx) + len("</View>")
    
    new_nav = """<View style={styles.bottomNav}>
      {[
        { key: 'მთავარი', label: 'მთავარი', icon: 'home-outline', lib: 'ion' },
        { key: 'ტყუპები', label: 'ტყუპები', icon: 'zodiac-gemini', lib: 'mci' },
        { key: 'პროგნოზები', label: 'პროგნოზები', icon: 'planet-outline', lib: 'ion' },
        { key: 'ნატალური', label: 'ნატალური', icon: 'compass-outline', lib: 'ion' },
        { key: 'მეტი', label: 'მეტი', icon: 'menu-outline', lib: 'ion' }
      ].map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.navItem}
          onPress={() => setActiveTab(tab.key)}
        >
          {tab.lib === 'mci' ? (
            <MaterialCommunityIcons name={tab.icon} size={22} color={activeTab === tab.key ? '#d4af37' : '#888'} />
          ) : (
            <Ionicons name={tab.icon} size={22} color={activeTab === tab.key ? '#d4af37' : '#888'} />
          )}
          <Text style={[styles.navText, activeTab === tab.key && styles.activeNavText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>"""
    
    code = code[:start_idx] + new_nav + code[real_end_idx:]
    
    with open('App.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("✅ მენიუ სრულად და უშეცდომოდ შეიცვალა!")
else:
    print("❌ კოდის სტრუქტურა ვერ ვიპოვე.")
