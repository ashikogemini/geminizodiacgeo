with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# შევამოწმოთ არის თუ არა Linking იმპორტირებული
if "import { Linking" not in content:
    content = content.replace("import { StyleSheet,", "import { Linking, StyleSheet,")

# შევცვალოთ alert ლექციაში Linking.openURL-ით
old_press = """                onPress={() => {
                  const url = HOROSCOPE_LINKS[horoscopeType];
                  alert('გადამმისამართებთ Facebook გვერდზე ვიდეოს საყურებლად: ' + url);
                }}"""

new_press = """                onPress={() => {
                  const url = HOROSCOPE_LINKS[horoscopeType];
                  Linking.openURL(url).catch(err => console.error('ვერ გაიხსნა ლინკი:', err));
                }}"""

if old_press in content:
    content = content.replace(old_press, new_press)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Linking წარმატებით დაემატა!")
