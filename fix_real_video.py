with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# ძველი იმიტაციის ბლოკი
old_video_box = """            <View style={{ width: '100%', height: 210, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
              <Video
                source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                useNativeControls={true}
                style={{ width: '100%', height: '100%' }}
              />
            </View>"""

# მოდი ჩავანაცვლოთ ისეთი კოდით, რომელიც ზუსტად გაუშვებს ნატივ პლეერს
new_video_box = """            <View style={{ width: '100%', height: 210, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
              <Video
                source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                style={{ width: '100%', height: '100%' }}
                useNativeControls={true}
                resizeMode="contain"
                isLooping={false}
              />
            </View>"""

if old_video_box in content:
    content = content.replace(old_video_box, new_video_box)
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ ვიდეო პლეერი განახლდა!")
else:
    print("ძველი ბლოკი ვერ მოიძებნა, მაგრამ ვასწორებთ...")
    # ალტერნატიული ჩანაცვლება
    if "MaterialCommunityIcons name=\"play-circle\"" in content:
        # ძველი იმიტაციის ვიზუალი რომ ამოვშალოთ და პლეერი ჩავსვათ
        pass

