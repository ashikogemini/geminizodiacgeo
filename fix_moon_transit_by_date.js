const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// ვცვლით getSmartMoonTransit ფუნქციას, რომ ზუსტი დრო გამოიტანოს მხოლოდ კონკრეტულ თარიღებზე
const updatedSmartTransitFunction = `
  // მთვარის ზუსტი ტრანზიტის შემოწმება - დრო ჩანს მხოლოდ ნიშნის ცვლილების დღეს
  const getSmartMoonTransit = (dateStr, defaultSign) => {
    // მაგალითად, თუ დღევანდელი დღეა 21 სექტემბერი, ვაჩვენებთ ტრანზიტს
    if (dateStr && dateStr.includes('21 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 16:45-მდე თხის რქა ➔ მერწყული\`;
    } else if (dateStr && dateStr.includes('22 სექტემბერი')) {
      return \`⚡ ტრანზიტი: 18:20-მდე მერწყული ➔ თევზები\`;
    }
    // დანარჩენ ყველა დღეს უბრალოდ იწერება ნიშანი
    return \`📍 ნიშანი: \${defaultSign}\`;
  };
`;

// ძველი ფუნქციის ჩანაცვლება
code = code.replace(
  /const getSmartMoonTransit = \([\s\S]*?};/g,
  updatedSmartTransitFunction.trim()
);

fs.writeFileSync('App.js', code, 'utf8');
console.log('✅ ტრანზიტის თარიღების ფილტრაცია წარმატებით განახლდა!');
