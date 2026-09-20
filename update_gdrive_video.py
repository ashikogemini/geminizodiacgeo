with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# ძველი სატესტო ლინკის ჩანაცვლება შენი Google Drive-ის პირდაპირი ლინკით
gdrive_url = "https://drive.google.com/uc?export=download&id=1AFtQFfmNjAPlKfFavWQi8pn3hJeRYfJt"

if "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" in content:
    content = content.replace("https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", gdrive_url)
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ შენი ვიდეო წარმატებით ჩაჯდა აპლიკაციაში!")
else:
    print("⚠️ სატესტო ლინკი ვერ მოიძებნა, მაგრამ ვასწორებთ...")
    # თუ უკვე სხვა ლინკია, ვეძებთ source={{ uri: ... }}
    import re
    content = re.sub(r'source=\{\{ uri: \'[^\']+\' \}\}', f"source={{ uri: '{gdrive_url}' }}", content)
    with open("App.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ ლინკი განახლდა!")

