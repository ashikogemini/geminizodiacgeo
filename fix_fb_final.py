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
              originWhitelist={['http://*', 'https://*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              setSupportMultipleWindows={false}
              injectedJavaScript={`
                // 1. ფეისბუქის აპლიკაციაში იძულებით გადაგდების ბლოკირება
                window.location.replace = function() {};
                window.location.assign = function() {};
                
                // 2. ფეისბუქის დამბლოკავი ფანჯრების (Login/App prompt) წაშლა
                setInterval(function() {
                  var dialogs = document.querySelectorAll('[role="dialog"], [data-nosnippet]');
                  for (var i = 0; i < dialogs.length; i++) {
                    dialogs[i].style.display = 'none';
                  }
                  document.body.style.overflow = 'auto'; // სქროლვის აღდგენა
                }, 500);
                true;
              `}
              onShouldStartLoadWithRequest={(request) => {
                // სასტიკად ვბლოკავთ ყველაფერს რაც არ არის HTTP/HTTPS (მაგ. fb://, intent://)
                if (!request.url.startsWith('http')) {
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
          """
    
    content = content[:start_idx] + new_webview + content[end_idx:]
    
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ WebView წარმატებით განახლდა ავტომატური ბლოკირებით!")
else:
    print("❌ კოდი ვერ მოიძებნა. გადაამოწმეთ App.js")
