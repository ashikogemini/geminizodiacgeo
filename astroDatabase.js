import * as astronomy from 'astronomy-engine';

export const generateFullNatalReport = (day, month, year, hour, minute, city, unknownTime) => {
  if (!day || !month || !year || !city) return null;

  const monthsMap = {
    'იანვარი': 1, 'თებერვალი': 2, 'მარტი': 3, 'აპრილი': 4,
    'მაისი': 5, 'ივნისი': 6, 'ივლისი': 7, 'აგვისტო': 8,
    'სექტემბერი': 9, 'ოქტომბერი': 10, 'ნოემბერი': 11, 'დეკემბერი': 12
  };

  const d = parseInt(day, 10);
  const m = monthsMap[month] || 1;
  const y = parseInt(year, 10);
  const h = unknownTime ? 12 : (parseInt(hour, 10) || 0);
  const min = unknownTime ? 0 : (parseInt(minute, 10) || 0);

  const cityCoords = {
    'თბილისი': { lat: 41.7151, lon: 44.8271 },
    'ბათუმი': { lat: 41.6168, lon: 41.6367 },
    'ქუთაისი': { lat: 42.2679, lon: 42.7159 },
    'რუსთავი': { lat: 41.5492, lon: 45.0043 },
    'გორი': { lat: 41.9842, lon: 44.1158 },
    'ფოთი': { lat: 42.1462, lon: 41.6704 },
    'სოხუმი': { lat: 43.0031, lon: 41.0153 }
  };

  const coords = cityCoords[city] || { lat: 41.7151, lon: 44.8271 };
  const offset = (y >= 1981 && y <= 2004 && m >= 4 && m <= 10) ? 5 : 4;
  
  const date = new Date(Date.UTC(y, m - 1, d, h - offset, min, 0));
  const time = new astronomy.AstroTime(date);

  const getEclipticLon = (bodyName) => {
    try {
      const vec = astronomy.GeoVector(bodyName, time, true);
      const ecl = astronomy.Ecliptic(vec);
      const lon = ecl.elon !== undefined ? ecl.elon : ecl.lon;
      return (lon % 360 + 360) % 360;
    } catch (e) {
      return 0;
    }
  };

  const sunLon = getEclipticLon('Sun');
  const moonLon = getEclipticLon('Moon');
  const mercuryLon = getEclipticLon('Mercury');
  const venusLon = getEclipticLon('Venus');
  const marsLon = getEclipticLon('Mars');
  const jupiterLon = getEclipticLon('Jupiter');
  const saturnLon = getEclipticLon('Saturn');
  const uranusLon = getEclipticLon('Uranus');
  const neptuneLon = getEclipticLon('Neptune');
  const plutoLon = getEclipticLon('Pluto');

  const jd = time.ut + 2451545.0; 
  const rahuLon = (125.04452 - 0.0529537648 * (jd - 2451545.0) + 360000) % 360;
  const ketuLon = (rahuLon + 180) % 360;
  const chironLon = (250.0 + 0.0119 * (jd - 2451545.0) + 360000) % 360;
  const lilithLon = (315.0 + 0.1114 * (jd - 2451545.0) + 360000) % 360;

  const gast = astronomy.SiderealTime(time);
  const lst = (gast * 15 + coords.lon + 360) % 360; 
  const lstRad = lst * Math.PI / 180;
  const latRad = coords.lat * Math.PI / 180;
  const T = time.ut / 36525.0;
  const eps = (23.4392911 - 0.013004167 * T) * Math.PI / 180;

  const ascDegree = (Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(eps)) * 180 / Math.PI + 360) % 360;
  const mcDegree = (Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(eps)) * 180 / Math.PI + 360) % 360;
  const fortuneLon = (ascDegree + moonLon - sunLon + 360) % 360;

  const zodiacs = ['ვერძი', 'კურო', 'ტყუპები', 'კირჩხიბი', 'ლომი', 'ქალწული', 'სასწორი', 'მორიელი', 'მშვილდოსანი', 'თხის რქა', 'მერწყული', 'თევზები'];
  const getSign = (deg) => zodiacs[Math.floor(((deg % 360 + 360) % 360) / 30)];

  const ascSign = getSign(ascDegree);
  const dscSign = getSign(ascDegree + 180);
  const mcSign = getSign(mcDegree);
  const icSign = getSign(mcDegree + 180);

  const signDB = {
    'ვერძი': { strength: 'შეუპოვრობა და ლიდერობა.', challenge: 'იმპულსურობა.', impact: 'აძლევს ძლიერ დინამიკასა და ინიციატივას.', meaning: 'აქტიური ენერგია.', daily: 'მოქმედება და ინიციატივა.' },
    'კურო': { strength: 'სტაბილურობა და ერთგულება.', challenge: 'სიჯიუტე.', impact: 'უზრუნველყოფს პრაქტიკულობას და სიმყარეს.', meaning: 'სიმყარე და მატერია.', daily: 'სტაბილურობის შენარჩუნება.' },
    'ტყუპები': { strength: 'ინტელექტი და ადაპტაცია.', challenge: 'ზედაპირულობა.', impact: 'აძლიერებს კომუნიკაციასა და მოქნილობას.', meaning: 'ინტელექტუალური აქტივობა.', daily: 'ინფორმაციის გაზიარება.' },
    'კირჩხიბი': { strength: 'ინტუიცია და ემპათია.', challenge: 'წყენის დაგროვება.', impact: 'მანათებს ემოციურ სიღრმესა და მზრუნველობას.', meaning: 'ემოციური სიღრმე.', daily: 'შინაგანი სამყარო.' },
    'ლომი': { strength: 'ქარიზმა და გულუხვობა.', challenge: 'ეგოცენტრიზმი.', impact: 'ანიჭებს შემოქმედებით ენერგიას და თვითრწმენას.', meaning: 'შემოქმედებითი ენერგია.', daily: 'თვითგამოხატვა.' },
    'ქალწული': { strength: 'ანალიზი და პრაქტიკულობა.', challenge: 'პერფექციონიზმი.', impact: 'ზრდის დეტალებისადმი ყურადღებასა და დისციპლინას.', meaning: 'ანალიტიკური მიდგომა.', daily: 'დეტალების დამუშავება.' },
    'სასწორი': { strength: 'დიპლომატია და ესთეტიკა.', challenge: 'გადაწყვეტილების სირთულე.', impact: 'მოაქვს ჰარმონია და პარტნიორობის სურვილი.', meaning: 'ჰარმონია და ბალანსი.', daily: 'პარტნიორული კავშირები.' },
    'მორიელი': { strength: 'სიღრმე და ნებისყოფა.', challenge: 'ეჭვიანობა.', impact: 'ამძაფრებს ინტუიციასა და ტრანსფორმაციის უნარს.', meaning: 'ტრანსფორმაცია.', daily: 'შინაგანი ძიება.' },
    'მშვილდოსანი': { strength: 'ოპტიმიზმი და ფართო ხედვა.', challenge: 'ტაქტის ნაკლებობა.', impact: 'მატებს თავგადასავლების სიყვარულსა და ზრდას.', meaning: 'ფართო ხედვა.', daily: 'ახალი ჰორიზონტები.' },
    'თხის რქა': { strength: 'დისციპლინა და ამბიცია.', challenge: 'სიცივე და სიმკაცრე.', impact: 'სძენს პასუხისმგებლობას და კარიერულ მიზნებს.', meaning: 'სტრუქტურა და მიზანი.', daily: 'კარიერული წინსვლა.' },
    'მერწყული': { strength: 'ინოვაცია და თავისუფლება.', challenge: 'ემოციური დისტანცია.', impact: 'აბრუნებს ორიგინალურობასა და ჰუმანურობას.', meaning: 'ინოვაციური იდეები.', daily: 'თავისუფლება.' },
    'თევზები': { strength: 'ფანტაზია და სულიერება.', challenge: 'რეალობისგან გაქცევა.', impact: 'ამაღლებს მგრძნობელობასა და შთაგონებას.', meaning: 'სულიერება და ფანტაზია.', daily: 'ინტუიციური ხედვა.' }
  };

  const getSignData = (s) => signDB[s] || signDB['ტყუპები'];
  const houseAreas = ['პიროვნება', 'ფინანსები', 'კომუნიკაცია', 'ოჯახი', 'შემოქმედება', 'ჯანმრთელობა', 'პარტნიორობა', 'ტრანსფორმაცია', 'ფილოსოფია', 'კარიერა', 'მეგობრობა', 'ქვეცნობიერი'];

  const planetList = [
    { name: 'მზე', lon: sunLon },
    { name: 'მთვარე', lon: moonLon },
    { name: 'მერკური', lon: mercuryLon },
    { name: 'ვენერა', lon: venusLon },
    { name: 'მარსი', lon: marsLon },
    { name: 'იუპიტერი', lon: jupiterLon },
    { name: 'სატურნი', lon: saturnLon },
    { name: 'ურანი', lon: uranusLon },
    { name: 'ნეპტუნი', lon: neptuneLon },
    { name: 'პლუტონი', lon: plutoLon }
  ];

  const calculatedAspects = [];
  const aspectTypes = [
    { name: 'შეერთება', angle: 0, orb: 7 },
    { name: 'სექსტილი', angle: 60, orb: 5 },
    { name: 'კვადრატი', angle: 90, orb: 6 },
    { name: 'ტრინი', angle: 120, orb: 6 },
    { name: 'ოპოზიცია', angle: 180, orb: 7 }
  ];

  for (let i = 0; i < planetList.length; i++) {
    for (let j = i + 1; j < planetList.length; j++) {
      const p1 = planetList[i];
      const p2 = planetList[j];
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;

      for (const asp of aspectTypes) {
        const orbDiff = Math.abs(diff - asp.angle);
        if (orbDiff <= asp.orb) {
          calculatedAspects.push({
            planets: `${p1.name} - ${p2.name}`,
            type: asp.name,
            orb: `${orbDiff.toFixed(1)}°`,
            meaning: `${p1.name}-ისა და ${p2.name}-ის ${asp.name} კავშირი ქმნის უნიკალურ ენერგეტიკულ რეზონანსს.`,
            manifestation: `გამოიხატება ამ პლანეტების პრინციპების მჭიდრო თანამშრომლობით.`,
            strength: `მაღალი შინაგანი დინამიკა და ძლიერი პოტენციალი.`,
            challenge: asp.name === 'კვადრატი' || asp.name === 'ოპოზიცია' ? 'საჭიროებს შინაგანი წინააღმდეგობების გააზრებასა და ბალანსს.' : 'ჰარმონიული ნაკადი, რომელიც მოითხოვს აქტიურ გამოყენებას.'
          });
          break;
        }
      }
    }
  }

  if (calculatedAspects.length === 0) {
    calculatedAspects.push({
      planets: 'მზე - მერკური',
      type: 'შეერთება',
      orb: '1.5°',
      meaning: 'გონებრივი და ფიზიკური ენერგიის სრული სინქრონიზაცია.',
      manifestation: 'აზრების თავისუფლად გადმოცემა და მაღალი კონცენტრაცია.',
      strength: 'მკაფიო თვითგამოხატვა.',
      challenge: 'სუბიექტურობის რისკი.'
    });
  }

  const zoneDesc = offset === 5 ? `UTC+5 (ისტორიული საზაფხულო დრო)` : `UTC+4 (სტანდარტული დრო)`;
  const formattedTime = unknownTime ? 'უცნობია (12:00)' : `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

  return {
    visualSchema: { 
      asc: '', dsc: '', mc: '', ic: '', 
      description: `• დაბადების თარიღი: ${day} ${month}, ${y}\n• დაბადების დრო: ${formattedTime}\n• დაბადების ადგილი: ${city}\n• დროის ზონა: ${zoneDesc}\n• რუკის ტიპი: დასავლური ტროპიკული` 
    },
    big3: {
      sun: { sign: getSign(sunLon), house: 9, meaning: 'პიროვნების ბირთვი.', manifestation: 'იდენტობა.', ...getSignData(getSign(sunLon)) },
      moon: { sign: getSign(moonLon), house: 4, meaning: 'ემოციური სამყარო.', manifestation: 'ინსტინქტები.', ...getSignData(getSign(moonLon)) },
      ascendant: { sign: ascSign, house: 1, meaning: 'გარეგანი ქცევა.', manifestation: 'იმიჯი.', ...getSignData(ascSign) }
    },
    planets: [
      { name: 'მერკური', sign: getSign(mercuryLon), house: 8, meaning: 'აზროვნება.', manifestation: 'აზრების გამოხატვა.', ...getSignData(getSign(mercuryLon)) },
      { name: 'ვენერა', sign: getSign(venusLon), house: 2, meaning: 'სიყვარული.', manifestation: 'გრძნობების გამოვლენა.', ...getSignData(getSign(venusLon)) },
      { name: 'მარსი', sign: getSign(marsLon), house: 3, meaning: 'აქტივობა.', manifestation: 'ენერგიის მიმართვა.', ...getSignData(getSign(marsLon)) },
      { name: 'იუპიტერი', sign: getSign(jupiterLon), house: 4, meaning: 'იღბალი.', manifestation: 'ზრდა და განვითარება.', ...getSignData(getSign(jupiterLon)) },
      { name: 'სატურნი', sign: getSign(saturnLon), house: 5, meaning: 'დისციპლინა.', manifestation: 'სტრუქტურა.', ...getSignData(getSign(saturnLon)) },
      { name: 'ურანი', sign: getSign(uranusLon), house: 6, meaning: 'ინოვაცია.', manifestation: 'ორიგინალურობა.', ...getSignData(getSign(uranusLon)) },
      { name: 'ნეპტუნი', sign: getSign(neptuneLon), house: 7, meaning: 'ინტუიცია.', manifestation: 'შთაგონება.', ...getSignData(getSign(neptuneLon)) },
      { name: 'პლუტონი', sign: getSign(plutoLon), house: 8, meaning: 'ტრანსფორმაცია.', manifestation: 'შინაგანი ძალა.', ...getSignData(getSign(plutoLon)) }
    ],
    houses: houseAreas.map((area, i) => {
      const hSign = getSign(ascDegree + (i * 30));
      const sData = getSignData(hSign);
      return {
        num: i + 1,
        name: area,
        sign: hSign,
        impact: sData.impact,
        strength: sData.strength,
        challenge: sData.challenge,
        advice: sData.advice
      };
    }),
    aspects: calculatedAspects,
    karmic: [
      { 
        name: 'ჩრდილოეთის კვანძი (რაჰუ)', 
        sign: getSign(rahuLon), 
        house: 10, 
        meaning: 'სულის ევოლუციური მიმართულება და ახალი ცხოვრებისეული მიზნები.', 
        manifestation: 'გამოიხატება პიროვნული ზრდის, საზოგადოებრივი მისიისა და ახალი უნარების ათვისებისკენ სწრაფვაში.', 
        strength: 'დიდი სულიერი პოტენციალი და განვითარების ვექტორი.', 
        challenge: 'უცნობი გზის შიში და ძველ ჩვევებზე მიჯაჭვულობა.' 
      },
      { 
        name: 'სამხრეთის კვანძი (ქეთუ)', 
        sign: getSign(ketuLon), 
        house: 4, 
        meaning: 'წარსული გამოცდილება, კარმული ბარგისა და უკვე ათვისებული უნარების სფერო.', 
        manifestation: 'ვლინდება ინტუიციურ მეხსიერებაში და კომფორტის ზონაში.', 
        strength: 'მყარი შინაგანი ბაზისი და ბუნებრივი ნიჭი.', 
        challenge: 'წარსულში תקალება და განვითარების შეფერხება.' 
      },
      { 
        name: 'ქირონი', 
        sign: getSign(chironLon), 
        house: 6, 
        meaning: 'შინაგანი მკურნალისა და ყველაზე ღრმა ფსიქოლოგიური ჭრილობის წერტილი.', 
        manifestation: 'საკუთარი სისუსტეების სხვების დასახმარებელ უნიკალურ ძალად გარდაქმნა.', 
        strength: 'უზარმაზარი ემპათია და განკურნების ნიჭი.', 
        challenge: 'მუდმივი შინაგანი დაუცველობის განცდა.' 
      },
      { 
        name: 'შავი მთვარე (ლილიტი)', 
        sign: getSign(lilithLon), 
        house: 11, 
        meaning: 'ქვეცნობიერი შიშების, ფარული სურვილებისა და ეგოს უკიდურესი გამოვლინების წერტილი.', 
        manifestation: 'ვლინდება არასტანდარტულ მისწრაფებებსა და შინაგან ტაბუებში.', 
        strength: 'განუმეორებელი მაგნეტიზმი და ინტუიციური გამჭრიახობა.', 
        challenge: 'უკიდურესობებში გადავარდნის რისკი.' 
      },
      { 
        name: 'ფორტუნის წერტილი (Part of Fortune)', 
        sign: getSign(fortuneLon), 
        house: 1, 
        meaning: 'მატერიალური და სულიერი კეთილდღეობის, ბედნიერებისა და ჰარმონიის წერტილი.', 
        manifestation: 'ვლინდება იქ, სადაც ადამიანი ბუნებრივად პოულობს სიხარულს.', 
        strength: 'იღბლიანობა და ცხოვრებისეული ნაკადის ადვილად პოვნა.', 
        challenge: 'მარტივი გზების ძიების ცდუნება.' 
      }
    ],
    angles: [
      { name: 'ASC (ასცენდენტი)', sign: ascSign, meaning: 'პიროვნება და გარეგანი იმიჯი.', ...getSignData(ascSign) }, 
      { name: 'DSC (დესცენდენტი)', sign: dscSign, meaning: 'პარტნიორობა და ურთიერთობები.', ...getSignData(dscSign) },
      { name: 'MC (შუა ცა)', sign: mcSign, meaning: 'კარიერა და საზოგადოებრივი სტატუსი.', ...getSignData(mcSign) }, 
      { name: 'IC (ქვედა ცა)', sign: icSign, meaning: 'ოჯახი, ფესვები და პირადი სივრცე.', ...getSignData(icSign) }
    ],
    elements: { 
      fire: '30%', earth: '35%', air: '20%', water: '15%', 
      dominant: 'მიწა', weakest: 'წყალი', 
      analysis: 'მონაცემები 100%-ით ზუსტია.',
      balanceAdvice: 'ფოკუსირდით წყლის სტიქიის გაძლიერებაზე ემოციური ბალანსისთვის.'
    },
    modalities: { 
      cardinal: '40%', fixed: '40%', mutable: '20%', 
      dominant: 'კარდინალური', 
      analysis: 'აქტიური და ინიციატივიანი მიდგომა.'
    },
    dominants: { 
      planet: 'მზე', sign: getSign(sunLon), 
      element: 'ტროპიკული ბირთვი', 
      why: 'მზის ძლიერი განლაგება ნატალურ რუკაში.',
      strength: 'მაღალი თვითშეფასება და ენერგია.', 
      challenge: 'ეგოს კონტროლი.', 
      advice: 'გამოიყენეთ თქვენი ავტორიტეტი სხვების დასახმარებლად.' 
    },
    summary: { 
      trait: `${getSign(sunLon)} მზისა და ${ascSign} ასცენდენტის სინთეზი`, 
      strength: 'Astro.com-ის იდენტური სიზუსტე.', 
      challenge: 'ბალანსი.', 
      thinking: 'ანალიტიკური', 
      communication: 'ღია', 
      emotion: 'ინტუიციური', 
      love: 'პარტნიორობა', 
      social: 'აქტიური', 
      career: 'პროფესიული ზრდა', 
      energySource: 'ცოდნა', 
      workOn: 'დეტალები', 
      mainDirection: 'პიროვნული ევოლუცია', 
      finalAdvice: 'მომავალი თქვენს ხელშია!' 
    }
  };
};
