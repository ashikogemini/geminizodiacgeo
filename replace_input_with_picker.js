const fs = require("fs");
let c = fs.readFileSync("App.js", "utf8");

const searchRegex = /<Text[^>]*>მიუთითე რიცხვი \(1-31\):<\/Text>[\s\S]*?onChangeText=\{setSelectedDay\}\s*\/>/m;

const newDayPicker = `<Text style={{color: '#fff', marginBottom: 8, fontSize: 13}}>აირჩიე რიცხვი:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 12}}>
            {Array.from({length: 31}, (_, i) => String(i + 1)).map(day => (
              <TouchableOpacity 
                key={day} 
                onPress={() => setSelectedDay(day)}
                style={{
                  paddingVertical: 8, 
                  paddingHorizontal: 12, 
                  backgroundColor: selectedDay === day ? '#d4af37' : '#1f293d', 
                  marginRight: 6, 
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: selectedDay === day ? '#d4af37' : 'rgba(212,175,55,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 42
                }}
              >
                <Text style={{color: selectedDay === day ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 14}}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>`;

if (searchRegex.test(c)) {
  c = c.replace(searchRegex, newDayPicker);
  fs.writeFileSync("App.js", c, "utf8");
  console.log("ჩასაწერი ველი წარმატებით შეიცვალა ასარჩევი რიცხვებით!");
} else {
  console.log("ვერ ვიპოვე ძველი TextInput ბლოკი. დარწმუნდი რომ ზუსტად ის წერია.");
}
