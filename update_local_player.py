with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

import re
# ვცვლით uri-ს ლოკალური ფაილის require-ით
local_video_code = "source={require('./VID_20260918_032807_765_bsl.mp4')}"
content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', local_video_code, content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ კოდი წარმატებით განახლდა ლოკალურ ვიდეოზე!")
