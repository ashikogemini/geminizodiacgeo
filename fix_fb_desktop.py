import sys

with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

start_str = "<View style={styles.webViewContainer}>"
end_str = "{/* ⚡ ინტერაქციის პანელი */}"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_webview = """<View style={styles.webViewContainer}>
            <WebView
              key={horoscopeType}
              source={{ uri: HOROSCOPE_LINKS[horoscopeType] }}
              style={{ flex: 1, backgroundColor: '#070913' }}
              userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
              originWhitelist={['*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              injectedJavaScript={`
                var meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                document.getElementsByTagName('head')[0].appendChild(meta);
                
                setTimeout(function() {
                  var loginBanners = document.querySelectorAll('[role="dialog"], #pagelet_bluebar, #headerArea');
                  loginBanners.forEach(b => b.style.display = 'none');
                  document.body.style.overflow = 'auto';
                }, 1500);
                true;
              `}
              renderLoading={() => (
                <View style={styles.loaderCenter}>
                  <ActivityIndicator size="large" color="#d4af37" />
                </View>
              )}
            />
          </View>
          """
    
    content = content[:start_idx] + new_webview + content[end_idx:]
    
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ Desktop ხრიკი წარმატებით დაყენდა!")
else:
    print("❌ კოდი ვერ მოიძებნა. გადაამოწმეთ App.js")
