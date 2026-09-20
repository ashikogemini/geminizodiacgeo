const fs = require('fs');
fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.js')) {
    let text = fs.readFileSync(file, 'utf8');
    if (text.includes('სიყვარული') && text.includes('85%')) {
      console.log('მონაცემები მოიძებნა ფაილში:', file);
      // ვპოულობთ და ვაპატარავებთ შრიფტის ზომას კუბიკების ტექსტებისთვის
      let updated = text.replace(/fontSize:\s*1[2345](,\s*fontWeight)/g, 'fontSize: 10$1');
      if (updated !== text) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log('შრიფტები წარმატებით განახლდა!');
      } else {
        // ალტერნატიული ჩანაცვლება, თუ ზომა სხვა ფორმატითაა
        let altUpdated = text.replace(/fontSize:\s*1[2345]/g, 'fontSize: 10');
        fs.writeFileSync(file, altUpdated, 'utf8');
        console.log('შრიფტები წარმატებით განახლდა (ალტერნატიული მეთოდით)!');
      }
    }
  }
});
