import re

with open('App.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. ვცვლით ვარსკვლავებს ტყუპების სიმბოლოთი
content = content.replace("'sparkles-outline'", "'zodiac-gemini'")

# 2. ვპოულობთ მენიუს ხატულის დახატვის კოდს
pattern = r'<Ionicons\s+name=\{tab\.icon\}([^>]+)>'
def replacer(match):
    props = match.group(1)
    # ვამატებთ პირობას: თუ ტყუპებია, დახატოს MaterialCommunityIcons-ით, სხვა შემთხვევაში Ionicons-ით
    return "{tab.icon === 'zodiac-gemini' ? <MaterialCommunityIcons name={tab.icon}" + props + "> : <Ionicons name={tab.icon}" + props + ">}"

if 'MaterialCommunityIcons name={tab.icon}' not in content:
    content = re.sub(pattern, replacer, content)

with open('App.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('სიმბოლო წარმატებით დაყენდა!')
