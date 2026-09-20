import re
with open('App.js', 'r', encoding='utf-8') as f:
    code = f.read()

new_nav = """<View style={styles.bottomNav}>
    {[
      { key: 'მთავარი', label: 'მთავარი', icon: 'home-outline', lib: 'ion' },
      { key: 'ტყუპები', label: 'ტყუპები', icon: 'zodiac-gemini', lib: 'mci' },
      { key: 'პროგნოზები', label: 'პროგნოზები', icon: 'planet-outline', lib: 'ion' },
      { key: 'ნატალური', label: 'ნატალური', icon: 'aperture-outline', lib: 'ion' },
      { key: 'მეტი', label: 'მეტი', icon: 'menu-outline', lib: 'ion' }
    ].map(tab => {
      const isActive = activeTab === tab.key;
      return (
        <TouchableOpacity key={tab.key} style={styles.navItem} onPress={() => setActiveTab(tab.key)}>
          {tab.lib === 'mci' ? (
            <MaterialCommunityIcons name={tab.icon} size={24} color={isActive ? '#d4af37' : '#888'} />
          ) : (
            <Ionicons name={tab.icon} size={24} color={isActive ? '#d4af37' : '#888'} />
          )}
          <Text style={[styles.navText, isActive && styles.activeNavText]} numberOfLines={1}>{tab.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>"""

pattern = r'<View\s+style=\{styles\.bottomNav\}>.*?</View>'
code = re.sub(pattern, new_nav, code, count=1, flags=re.DOTALL)

with open('App.js', 'w', encoding='utf-8') as f:
    f.write(code)
print("მენიუ და ხატულები სრულად გასწორდა!")
