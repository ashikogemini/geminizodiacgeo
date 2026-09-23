const fs = require('fs');
let code = fs.readFileSync('DailyHoroscopeCard.js', 'utf8');

// ვუმატებთ დეფოლტ ტექსტებს თითოეულ ველს იმ შემთხვევისთვის, თუ მონაცემები ცარიელია
code = code.replace(/\{data\.love\}/g, '{data.love |"დღეს ურთიერთობებში ჰარმონია და ურთიერთგაგება ჭარბობს. გაუზიარეთ გრძნობები პარტნიორს."}');
code = code.replace(/\{data\.career\}/g, '{data.career |"პროფესიულ ასპარეზზე ახალი შესაძლებლობები იხსნება. იყავით ინიციატივიანი."}');
code = code.replace(/\{data\.finance\}/g, '{data.finance |"ფინანსური სტაბილურობა შენარჩუნებულია, თუმცა მოერიდეთ იმპულსურ დანახარჯებს."}');
code = code.replace(/\{data\.emotion\}/g, '{data.emotion |"შინაგანი ბალანსი და სიმშვიდე დაგეხმარებათ დღის გამოწვევების გადალახვაში."}');
code = code.replace(/\{data\.opportunity\}/g, '{data.opportunity |"ახალი კონტაქტების დამყარება და იდეების გაზიარება."}');
code = code.replace(/\{data\.caution\}/g, '{data.caution |"ნუ მიიღებთ ნაჩქარევ გადაწყვეტილებებს ემოციურ ფონზე."}');
code = code.replace(/\{data\.advice\}/g, '{data.advice |"ენდეთ საკუთარ ინტუიციას და იმოქმედეთ თანმიმდევრულად."}');
code = code.replace(/\{data\.keyword\}/g, '{data.keyword |"გონებრივი სიცხადე"}');

fs.writeFileSync('DailyHoroscopeCard.js', code, 'utf8');
console.log('✅ DailyHoroscopeCard წარმატებით განახლდა სათადარიგო ტექსტებით!');
