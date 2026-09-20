with open('App.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_start = content.find('style={styles.bottomNav}')
if target_start != -1:
    tag_start = content.rfind('<View', 0, target_start)
    safe_end = content.find('</SafeAreaView>', tag_start)
    if safe_end != -1:
        last_view_end = content.rfind('</View>', tag_start, safe_end)
        if last_view_end != -1:
            end_pos = last_view_end + len('</View>')
            
            new_nav = """<View style={styles.bottomNav}>
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
            
            content = content[:tag_start] + new_nav + content[end_pos:]
            with open('App.js', 'w', encoding='utf-8') as f:
                f.write(content)
            print("BOTTOM NAV REPLACED SUCCESSFULLY!")
