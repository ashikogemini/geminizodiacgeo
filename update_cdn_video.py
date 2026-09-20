with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# სტაბილური CDN პირდაპირი ლინკი GitHub-იდან
cdn_video_url = "https://cdn.jsdelivr.net/gh/ashikogemini/gemini-video@main/VID_20260918_032807_765_bsl.mp4"

import re
content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', f"source={{ uri: '{cdn_video_url}' }}", content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CDN ვიდეო ლინკი წარმატებით ჩაჯდა!")
