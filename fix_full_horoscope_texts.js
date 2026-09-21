const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ გაშლილი ჰოროსკოპის ბლოკს და ვანაცვლებთ უსაფრთხო მნიშვნელობებით
const oldExpandedBlockRegex = /\{isExpanded\s*&&\s*\([\s\S]*?<\/View>\s*\)\}/;

const newExpandedBlock = `{isExpanded && (
          <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(212,175,55,0.2)' }}>
            <Text style={{ color: '#fff', fontSize: 13, marginBottom: 8 }}>
              ❤️ <Text style={{ color: '#ffa502', fontWeight: 'bold' }}>სიყვარული და ურთიერთობები:</Text> {dailyHoroscope?.love || "დღეს ურთიერთობებში ჰარმონია და ურთიერთგაგება ჭარბობს. გაუზიარეთ გრძნობები პარტნიორს."}
            </Text>
            <Text style={{ color: '#fff', fontSize: 13, marginBottom: 8 }}>
              💼 <Text style={{ color: '#ffa502', fontWeight: 'bold' }}>საქმე და კარიერა:</Text> {dailyHoroscope?.career || "პროფესიულ ასპარეზზე ახალი შესაძლებლობები იხსნება. იყავით ინიციატივიანი."}
            </Text>
            <Text style={{ color: '#fff', fontSize: 13, marginBottom: 8 }}>
              💰 <Text style={{ color: '#ffa502', fontWeight: 'bold' }}>ფინანსები:</Text> {dailyHoroscope?.finance || "ფინანსური სტაბილურობა შენარჩუნებულია, თუმცა მოერიდეთ იმპულსურ დანახარჯებს."}
            </Text>
            <Text style={{ color: '#fff', fontSize: 13, marginBottom: 8 }}>
              🧘 <Text style={{ color: '#ffa502', fontWeight: 'bold' }}>ემოციური მდგომარეობა:</Text> {dailyHoroscope?.health || dailyHoroscope?.emotion || "შინაგანი ბალანსი და სიმშვიდე დაგეხმარებათ დღის გამოწვევების გადალახვაში."}
            </Text>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 8, marginVertical: 8 }}>
              <Text style={{ color: '#fff', fontSize: 13, marginBottom: 6 }}>
                🌟 <Text style={{ color: '#2ed573', fontWeight: 'bold' }}>დღის მთავარი შესაძლებლობა:</Text> {dailyHoroscope?.opportunity || "ახალი კონტაქტების დამყარება და იდეების გაზიარება."}
              </Text>
              <Text style={{ color: '#fff', fontSize: 13, marginBottom: 6 }}>
                ⚠️ <Text style={{ color: '#ff4757', fontWeight: 'bold' }}>დღის მთავარი სიფრთხილე:</Text> {dailyHoroscope?.warning || "ნუ მიიღებთ ნაჩქარევ გადაწყვეტილებებს ემოციურ ფონზე."}
              </Text>
              <Text style={{ color: '#fff', fontSize: 13 }}>
                💡 <Text style={{ color: '#1e90ff', fontWeight: 'bold' }}>დღის რჩევა:</Text> {dailyHoroscope?.advice || "ენდეთ საკუთარ ინტუიციას და იმოქმედეთ თანმიმდევრულად."}
              </Text>
            </View>

            <Text style={{ color: '#ffd700', fontSize: 13, fontWeight: 'bold', textAlign: 'center', marginTop: 4 }}>
              🔑 დღის საკვანძო სიტყვა: {dailyHoroscope?.keyword || "გონებრივი სიცხადე"}
            </Text>
          </View>
        )}`;

code = code.replace(oldExpandedBlockRegex, newExpandedBlock);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სრული ჰოროსკოპის ტექსტები წარმატებით გასწორდა!');
