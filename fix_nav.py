with open('App.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re

new_nav = """      {/* Bottom Navigation Menu */}
      <View style={styles.bottomNav}>
        {[
          { key: 'მთავარი', label: 'მთავარი', icon: 'home-outline', lib: 'Ionicons' },
          { key: 'ტყუპები', label: 'ტყუპები', icon: 'zodiac-gemini', lib: 'MaterialCommunityIcons' },
          { key: 'პროგნოზები', label: 'პროგნოზები', icon: 'planet-outline', lib: 'Ionicons' },
          { key: 'ნატალური', label: 'ნატალური', icon: 'disc-outline', lib: 'Ionicons' },
          { key: 'მეტი', label: 'მეტი', icon: 'ellipsis-horizontal-outline', lib: 'Ionicons' }
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.navItem} onPress={() => setActiveTab(tab.key)}>
              {tab.lib === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={tab.icon} size={20} color={isActive ? '#d4af37' : '#888'} />
              ) : (
                <Ionicons name={tab.icon} size={20} color={isActive ? '#d4af37' : '#888'} />
              )}
              <Text style={[styles.navText, isActive && styles.activeNavText]} numberOfLines={1}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>"""

pattern = r'<\s*View\s+style=\{styles\.bottomNav\}>.*?</\s*View\s*>'
match = re.search(pattern, content, re.DOTALL)
if match:
    content = content[:match.start()] + new_nav + content[match.end():]
    with open('App.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("წარმატებით განახლდა მენიუ!")
else:
    print("ვერ მოიძებნა bottomNav სექცია.")
