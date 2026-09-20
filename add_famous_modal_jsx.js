const fs = require("fs");
let appCode = fs.readFileSync("App.js", "utf8");

// ვნახოთ სად მთავრდება ტყუპების მოდალური ფანჯრის სექციები (მაგ: სადაც თავსებადობის სიებია)
// და იქვე ვამატებთ ღილაკს "🌟 ცნობილი ტყუპები"
const targetSnippet = `</ScrollView>`;

// თუ უკვე არ გვაქვს ეს ღილაკი დამატებული, ვამატებთ
if (!appCode.includes("შესავალი: ცნობილი ტყუპები") && appCode.includes("FAMOUS_GEMINI_DATA")) {
  
  // ვამატებთ ღილაკს ტყუპების მოდალში და თავად ფანჯრის JSX-ს ფაილის ბოლოში (export default-ის წინ)
  const famousButtonCode = `
          {/* ცნობილი ტყუპების ღილაკი */}
          <TouchableOpacity 
            style={{backgroundColor: '#d4af37', padding: 14, borderRadius: 12, alignItems: 'center', marginVertical: 15}}
            onPress={() => setShowFamousModal(true)}
          >
            <Text style={{color: '#0d1322', fontWeight: 'bold', fontSize: 16}}>🌟 ცნობილი ტყუპები (თარიღით ძებნა)</Text>
          </TouchableOpacity>
  `;

  // ვძებნებთ სად ჩავსვათ ღილაკი (მაგალითად, ტყუპების ტექსტური მოდალის შიგნით)
  appCode = appCode.replace(
    /<Text style={modalItemText}>/,
    famousButtonCode + "\n          <Text style={modalItemText}>"
  );
}

fs.writeFileSync("App.js", appCode, "utf8");
console.log("Famous button JSX added!");
