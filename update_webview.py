with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# ჩავანაცვლოთ WebView-ს ბლოკი შიდა ნავიგაციის კონტროლით და Embed მხარდაჭერით
old_webview = """          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: HOROSCOPE_LINKS[horoscopeType] }}
              style={{ flex: 1, borderRadius: 12 }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loaderCenter}>
                  <ActivityIndicator size="large" color="#d4af37" />
                </View>
              )}
            />
          </View>"""

new_webview = """          <View style={styles.webViewContainer}>
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
                // კრძალავს გარე Facebook აპლიკაციაში გადაყვანას
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
          </View>"""

if old_webview in content:
    content = content.replace(old_webview, new_webview)
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("WebView წარმატებით განახლდა!")
else:
    print("ძველი WebView ვერ მოიძებნა, გადაამოწმეთ App.js")
