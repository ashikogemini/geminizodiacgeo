const fs = require('fs');

fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.js')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('85%') && content.includes('სიყვარული')) {
      console.log('📌 იპოვა ფაილი:', file);
      
      // ვასწორებთ შემოკლებულ სიტყვებს სრულ რედაქციამდე
      content = content.replace(/"ჯანმრთელობა<>]*["']/g, '""ჯანმრთელობა<>]*["']/g, '""შემოქმედება<]*</g, 'ჯანმრთელობა<');
      content = content.replace(/შემოქმედება<]*</g, 'შემოქმედება<');

      // ვაპატარავებთ შრიფტს 10-მდე, რომ ჩარჩოებში იდეალურად ჩაეტიოს
      content = content.replace(/fontSize:\s*1[12345]/g, 'fontSize: 10');

      fs.writeFileSync(file, content, 'utf8');
      console.log('✅ ფაილი წარმატებით განახლდა და გაასწორა ზომები!');
    }
  }
});
