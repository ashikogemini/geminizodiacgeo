with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. ვამატებთ expo-av Video იმპორტს თავში, თუ არ არის
if "from 'expo-av'" not in content:
    content = "import { Video } from 'expo-av';\n" + content

# 2. ზუსტი ძებნა იმ მთლიანი <View> ბლოკის, რომელსაც play-circle და 'ვიდეო პროგნოზი მზად არის' აქვთ
import re
target_pattern = r'<View style=\{\{ width: \'100%\', height: 180, backgroundColor: \'#0d1322\', borderRadius: 12, justifyContent: \'center\', alignItems: \'center\', marginBottom: 14, borderWidth: 1, borderColor: \'rgba\(212, 175, 55, 0\.3\)\' \}\}>[\s\S]*?</View>'

new_video_component = """<Video
              source={require('./VID_20260918_032807_765_bsl.mp4')}
              style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />"""

content, count = re.subn(target_pattern, new_video_component, content)

if count > 0:
    print(f"✅ წარმატებით ჩაჯდა! (შეიცვალა {count} ადგილი)")
else:
    print("⚠️ სრული მატჩი ვერ მოიძებნა, ვცდილობთ ალტერნატიული ჩანაცვლებით...")
    # უფრო ზოგადი მეთოდი თუ ფიგურული ფრჩხილების ფორმატირება განსხვავდება
    general_pattern = r'<View style=\{\{ width: \'100%\', height: 180[\s\S]*?ვიდეო პროგნოზი მზად არის[\s\S]*?</View>'
    content, count = re.subn(general_pattern, new_video_component, content)
    print(f"✅ ალტერნატიულით შეიცვალა: {count} ადგილი")

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)
