const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

function updateIconForLabel(content, label, newIcon) {
  const idx = content.indexOf(label);
  if (idx !== -1) {
    const sub = content.substring(Math.max(0, idx - 180), idx);
    const nameMatch = sub.match(/name="([^"]+)"/);
    if (nameMatch) {
      const oldName = nameMatch[1];
      return content.replace(`name="${oldName}"`, `name="${newIcon}"`);
    }
  }
  return content;
}

code = updateIconForLabel(code, 'კვირის პროგნოზი', 'today-outline');
code = updateIconForLabel(code, 'თვის პროგნოზი', 'moon-outline');
code = updateIconForLabel(code, 'წლის პროგნოზი', 'compass-outline');
code = updateIconForLabel(code, 'მოკლევადიანი ასპექტები', 'flash-outline');
code = updateIconForLabel(code, 'გრძელვადიანი ასპექტები', 'planet-outline');

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ხუთივე პროგნოზის აიქონი წარმატებით განახლდა!');
