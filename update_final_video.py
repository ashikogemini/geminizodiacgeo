with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# შენი ზუსტი GitHub ვიდეოს ლინკი
real_video_url = "https://github.com/ashikogemini/gemini-video/raw/refs/heads/main/VID_20260918_032807_765_bsl.mp4"

import re
# ვეძებთ ძველ uri-ს და ვანაცვლებთ შენი ვიდეოს ლინკით
content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', f"source={{ uri: '{real_video_url}' }}", content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ შენი ვიდეო საბოლოოდ წარმატებით ჩაჯდა აპლიკაციაში!")
