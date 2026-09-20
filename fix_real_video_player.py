with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. ვამატებთ expo-av Video იმპორტს თავში, თუ არ წერია
if "from 'expo-av'" not in content:
    content = "import { Video } from 'expo-av';\n" + content

# 2. ვცვლით ფეიქ ვიზუალურ ბლოკს რეალური Video კომპონენტით
old_block = """            <View style={{ width: '100%', height: 180, backgroundColor: '#0d1322', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              <MaterialCommunityIcons name="play-circle" size5={64} color="#d4af37" />
              <Text style={{ color: '#fff', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>ვიდეო პროგნოზი მზად არის</Text>
            </View>"""

# რეგულარული გამოსახულებით ვეძებთ ზუსტად ამ ბლოკს რომ სივრცეებსა და დიზაინს არ აცდეს
import re
pattern = r'<View style=\{\{ width: \'100%\', height: 180[\s\S]*?ვიდეო პროგნოზი მზად არის[\s\S]*?</View>'

new_video_component = """            <Video
              source={require('./VID_20260918_032807_765_bsl.mp4')}
              style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />"""

content, count = re.subn(pattern, new_video_component, content)

if count > 0:
    print("✅ ვიდეო კომპონენტი წარმატებით ჩაჯდა კოდში!")
else:
    # ალტერნატიული მეთოდი თუ ტექსტში პატარა სხვაობაა
    content = content.replace(
        """<View style={{ width: '100%', height: 180, backgroundColor: '#0d1322', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' }}>""",
        new_video_component
    )
    print("✅ მეორე მეთოდით ჩაჯდა ვიდეო!")

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)
