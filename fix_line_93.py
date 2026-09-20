with open("App.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# ვამოწმებთ არის თუ არა expo-av იმპორტი თავში
content = "".join(lines)
if "from 'expo-av'" not in content:
    content = "import { Video } from 'expo-av';\n" + content
    lines = content.splitlines(keepends=True)

# ვიპოვოთ და ჩავანაცვლოთ 93-ე ხაზის გარშემო არსებული ბლოკი (დაახლოებით 90-96 ხაზები)
new_lines = []
skip = False
for i, line in enumerate(lines):
    # ხაზების ნომრები იწყება 0-დან, ე.ი. 93-ე ხაზი არის ინდექსით 92
    if 89 <= i <= 96:
        if i == 89:
            new_lines.append("            <Video\n")
            new_lines.append("              source={require('./VID_20260918_032807_765_bsl.mp4')}\n")
            new_lines.append("              style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 14, backgroundColor: '#000' }}\n")
            new_lines.append("              useNativeControls\n")
            new_lines.append("              resizeMode=\"contain\"\n")
            new_lines.append("              isLooping\n")
            new_lines.append("            />\n")
        continue
    new_lines.append(line)

with open("App.js", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("✅ 93-ე ხაზის ვიდეო ბლოკი წარმატებით განახლდა!")
