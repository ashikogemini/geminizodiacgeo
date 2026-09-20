import sys

with open("App.js", "r", encoding="utf-8") as f:
    content = f.read()

# დავამატოთ Video იმპორტი expo-av-დან
if "import { Video }" not in content:
    content = content.replace("import { WebView } from 'react-native-webview';", "import { WebView } from 'react-native-webview';\nimport { Video } from 'expo-av';")

print("Video იმპორტი დაემატა.")
