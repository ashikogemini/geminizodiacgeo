with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# ვპოვებთ და ვასწორებთ გატეხილ სექციას ჰოროსკოპის ტაბის შიგნით
import re

# ვამოწმებთ ვიდეოსა და ბარათის სტრუქტურას და ვასწორებთ დახურვებს
old_section = """          <View style={styles.card}>
            <Video source={require('./VID_20260918_032807_765_bsl.mp4')} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }} useNativeControls resizeMode="contain" isLooping />                                                                  </View>                                     
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>"""

new_section = """          <View style={styles.card}>
            <Video
              source={require('./VID_20260918_032807_765_bsl.mp4')}
              style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>"""

if old_section in content:
    content = content.replace(old_section, new_section)
else:
    # თუ ზუსტი დამთხვევა არ არის, რეგულირებით ვსინჯავთ
    content = re.sub(r'<View style=\{styles\.card\}>\s*<Video[\s\S]*?</View>\s*</View>', r'<View style={styles.card}>\n            <Video\n              source={require(\'./VID_20260918_032807_765_bsl.mp4\')}\n              style={{ width: \'100%\', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: \'#000\' }}\n              useNativeControls\n              resizeMode="contain"\n              isLooping\n            />', content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ JSX ტეგები გასწორდა!")
