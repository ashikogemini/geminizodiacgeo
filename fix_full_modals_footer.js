const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვპოულობთ და ვცვლით მოკლევადიანი და გრძელვადიანი სრული მოდალების ფუტერებს
// ძველი ორღილაკიანი ფუტერი (flexDirection: 'row', justifyContent: 'space-between' ...)
// ვცვლით მხოლოდ სრულ მოდალებში (რომლებიც არიან isShortModalVisible და isLongModalVisible)

// მარტივი მიდგომა: მოკლევადიანი და გრძელვადიანი სრული მოდალების ბოლოში ღილაკები გავხადოთ მარტივი "დახურვა"
const targetFooterRegex = /<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\}>[\s\S]*?<\/View>\s*<\/View>\s*<\/View>\s*<\/Modal>/g;

// სანაცვლოდ ვწერთ მხოლოდ ერთ "დახურვა" ღილაკს
const singleCloseButtonShort = `<TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>`;

const singleCloseButtonLong = `<TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>`;

// ვანაცვლებთ მოკლევადიანი მოდალის ბოლოს
code = code.replace(
  /(<Modal visible=\{isShortModalVisible\}[\s\S]*?)<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\>[\s\S]*?<\/View>\s*<\/View>\s*<\/View>\s*<\/Modal>/,
  `$1${singleCloseButtonShort}`
);

// ვანაცვლებთ გრძელვადიანი მოდალის ბოლოს
code = code.replace(
  /(<Modal visible=\{isLongModalVisible\}[\s\S]*?)<View style=\{\{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15\}\>[\s\S]*?<\/View>\s*<\/View>\s*<\/View>\s*<\/Modal>/,
  `$1${singleCloseButtonLong}`
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სრული მოდალების ღილაკები წარმატებით გასწორდა!');
