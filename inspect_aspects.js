const fs = require('fs');
if (fs.existsSync('dailyHoroscopeData.js')) {
  console.log(fs.readFileSync('dailyHoroscopeData.js', 'utf8'));
} else {
  console.log('dailyHoroscopeData.js ფაილი ვერ მოიძებნა, ვეძებთ App.js-ში...');
  let code = fs.readFileSync('App.js', 'utf8');
  let idx = code.indexOf('shortTermAspects');
  if (idx !== -1) {
    console.log(code.substring(idx, idx + 1000));
  }
}
