const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. ვრწმუნდებით, რომ useEffect იმპორტირებულია რეაქტიდან
if (!code.includes('useEffect')) {
  code = code.replace(/import\s+React\s*,\s*\{([^}]*)\}\s*from\s*'react';/, "import React, { $1, useEffect } from 'react';");
  if (!code.includes('useEffect')) {
    code = code.replace(/import\s+React\s+from\s*'react';/, "import React, { useState, useEffect } from 'react';");
  }
}

// 2. ვამატებთ useEffect-ს HomeScreen-ში, რომ აპის ჩართვისას ავტომატურად გაიხსნას მოდალი
let hsIdx = code.indexOf('function HomeScreen');
if (hsIdx !== -1) {
  let openBrace = code.indexOf('{', hsIdx);
  if (openBrace !== -1) {
    let bodySnippet = code.substring(openBrace, openBrace + 400);
    if (!bodySnippet.includes('useEffect')) {
      let effectInjection = `\n  useEffect(() => {\n    setIsShortModalVisible(true);\n  }, []);`;
      code = code.substring(0, openBrace + 1) + effectInjection + code.substring(openBrace + 1);
    }
  }
}

// 3. ვცვლით მოდალის ქვედა ნაწილს ისე, რომ მარცხნივ იყოს "წაკითხვა" და მარჯვენა მხარეს "დახურვა"
const oldFooter = `<TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>`;

const newFooter = `<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <TouchableOpacity onPress={() => alert('მიმდინარე ასპექტები აქტიურია და გავლენას ახდენს თქვენს ენერგიაზე.')} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>წაკითხვა</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 8}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>`;

code = code.replace(oldFooter, newFooter);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ მოდალის ავტომატური გახსნა და ღილაკები წარმატებით დაინტეგრირდა!');
