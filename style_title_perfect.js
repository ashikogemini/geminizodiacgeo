const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვეძებთ სათაურს და ვუწერთ მკვეთრ, დიდ ოქროსფერ სტილს
code = code.replace(/<Text([^>]*)>ტყუპების ვარსკვლავური დღე<\/Text>/g, (match, p1) => {
  if (p1.includes('style=')) {
    return `<Text${p1.replace(/style\s*=\s*\{([^}]*)\}/, 'style={{ $1, color: "#ffd700", fontSize: 20, fontWeight: "bold" }}')}>ტყუპების ვარსკვლავური დღე</Text>`;
  } else {
    return `<Text style={{ color: "#ffd700", fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>ტყუპების ვარსკვლავური დღე</Text>`;
  }
});

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ სათაურის ვიზუალი წარმატებით გამოიყო და გაიზარდა!');
