import sys

with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

start_idx = content.find("<View style={styles.webViewContainer}>")
end_idx = content.find("{/* ⚡ ინტერაქციის პანელი */}")

if start_idx != -1 and end_idx != -1:
    new_webview = """<View style={styles.webViewContainer}>
            <WebView
              key={horoscopeType}
              source={{ 
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <style>
                      body { margin: 0; padding: 0; background-color: #070913; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
                      iframe { border: none; width: 100vw; height: 100vh; }
                    </style>
                  </head>
                  <body>
                    <iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(HOROSCOPE_LINKS[horoscopeType])}&show_text=false" 
                      scrolling="no" 
                      frameborder="0" 
                      allowfullscreen="true" 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                    </iframe>
                  </body>
                  </html>
                `
              }}
              style={{ flex: 1, backgroundColor: '#070913' }}
              startInLoadingState={true}
              scrollEnabled={false}
              originWhitelist={['*']}
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
    print("✅ ვიდეო პლეერი წარმატებით ჩაშენდა!")
else:
    print("❌ კოდი ვერ მოიძებნა.")
