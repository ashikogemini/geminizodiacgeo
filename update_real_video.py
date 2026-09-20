with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# შენი ვიდეოს ზუსტი პირდაპირი ლინკი GitHub-იდან
real_video_url = "https://raw.githubusercontent.com/ashikogemini/gemini-video/main/VID_20260918_032807_765_bsl.mp4"

import re
# ვეძებთ uri-ს და ვანაცვლებთ შენი ვიდეოთი
content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', f"source={{ uri: '{real_video_url}' }}", content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ შენი ვიდეო წარმატებით ჩაჯდა აპლიკაციაში!")
