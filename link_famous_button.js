const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვცდილობთ ვიპოვოთ სადაც "ცნობილი ტყუპები" წერია და ვუმატებთ onPress ფუნქციას
if (appCode.includes("ცნობილი ტყუპები") && !appCode.includes("onPress={() => setShowFamousModal(true)}")) {
  // ვცვლით ღილაკის ველს, რომ დაჭერისას გაიხსნას მოდალი
  appCode = appCode.replace(
    /(<TouchableOpacity[^>]*>[\s\S]*?ცნობილი ტყუპები[\s\S]*?<\/TouchableOpacity>)/,
    (match) => {
      if (!match.includes("onPress")) {
        return match.replace("<TouchableOpacity", "<TouchableOpacity onPress={() => setShowFamousModal(true)}");
      }
      return match;
    }
  );
  fs.writeFileSync("App.js", appCode, "utf8");
  console.log("Famous button successfully linked to modal!");
} else {
  console.log("Could not find exact match or already linked.");
}
