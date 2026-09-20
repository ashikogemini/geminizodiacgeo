with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

import re
# ვეძებთ პლეერის სექციას და ვცვლით uri-ს
direct_url = "https://cdn-qa.streamable.com/video/mp4/watm5e.mp4"
content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', f"source={{ uri: '{direct_url}' }}", content)

with open("App.js", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ პირდაპირი ლინკი განახლდა!")
