with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# განახლებული ჰოროსკოპის სექცია ინტერაქტიული ღილაკებით
old_horoscope_section = """      {activeTab === 'ჰოროსკოპი' ? (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
          <Text style={styles.pageTitle}>ასტროლოგიური პროგნოზები</Text>
          <View style={styles.tabBar}>
            {[
              { key: 'week', label: 'კვირის' },
              { key: 'month', label: 'თვის' },
              { key: 'year', label: 'წლის' }
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
          <View style={styles.webViewContainer}>
            <WebView
              key={horoscopeType}
              source={{ 
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style>
                      body { margin: 0; padding: 0; background-color: #070913; display: flex; justify-content: center; }
                      iframe { width: 100% !important; height: 100vh !important; border: none; }
                    </style>
                  </head>
                  <body>
                    <iframe src="https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(HOROSCOPE_LINKS[horoscopeType])}&show_text=true&width=500" 
                      style="border:none;overflow:hidden" 
                      scrolling="no" 
                      frameborder="0" 
                      allowfullscreen="true" 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                    </iframe>
                  </body>
                  </html>
                `
              }}
              style={{ flex: 1, borderRadius: 12, backgroundColor: '#070913' }}
              startInLoadingState={true}
              originWhitelist={['*']}
              onShouldStartLoadWithRequest={(request) => {
                if (request.url.startsWith('fb://') || request.url.includes('intent://')) {
                  return false;
                }
                return true;
              }}
              renderLoading={() => (
                <View style={styles.loaderCenter}>
                  <ActivityIndicator size="large" color="#d4af37" />
                </View>
              )}
            />
          </View>
        </View>
      ) : ("""

new_horoscope_section = """      {activeTab === 'ჰოროსკოპი' ? (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
          <Text style={styles.pageTitle}>ასტროლოგიური პროგნოზები</Text>
          <View style={styles.tabBar}>
            {[
              { key: 'week', label: 'კვირის' },
              { key: 'month', label: 'თვის' },
              { key: 'year', label: 'წლის' }
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
          <View style={styles.webViewContainer}>
            <WebView
              key={horoscopeType}
              source={{ uri: HOROSCOPE_LINKS[horoscopeType] }}
              style={{ flex: 1, borderRadius: 12, backgroundColor: '#070913' }}
              startInLoadingState={true}
              originWhitelist={['*']}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              renderLoading={() => (
                <View style={styles.loaderCenter}>
                  <ActivityIndicator size="large" color="#d4af37" />
                </View>
              )}
            />
          </View>
          {/* ⚡ ინტერაქციის პანელი */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#111827', paddingVertical: 10, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('რეაქციისთვის გახსენით პოსტი Facebook-ში')}>
              <Ionicons name="thumbs-up-outline" size={18} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 6, fontSize: 13, fontWeight: 'bold' }}>მოწონება</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('კომენტარისთვის გახსენით პოსტი Facebook-ში')}>
              <Ionicons name="chatbubble-outline" size={18} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 6, fontSize: 13, fontWeight: 'bold' }}>კომენტარი</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert('გაზიარებულია!')}>
              <Ionicons name="share-social-outline" size={18} color="#d4af37" />
              <Text style={{ color: '#fff', marginLeft: 6, fontSize: 13, fontWeight: 'bold' }}>გაზიარება</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : ("""

if old_horoscope_section in content:
    content = content.replace(old_horoscope_section, new_horoscope_section)
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("წარმატებით განახლდა!")
else:
    print("ძველი სექცია ვერ მოიძებნა, გთხოვთ გადაამოწმოთ")
