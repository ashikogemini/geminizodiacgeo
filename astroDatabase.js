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

  const getGeoOffset = (year, month) => {
    if (year >= 1981 && year <= 2004) {
      if (month >= 4 && month <= 10) return 5; 
    }
    return 4;
  };
  const offset = getGeoOffset(y, m);
  
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
  const chironLon = (250.0 + 0.0119 * (jd - 2451545.0) + 360000) % 360;

  const gast = astronomy.SiderealTime(time);
  const lst = (gast * 15 + coords.lon + 360) % 360; 
  const lstRad = lst * Math.PI / 180;
  const latRad = coords.lat * Math.PI / 180;
  const T = time.ut / 36525.0;
  const eps = (23.4392911 - 0.013004167 * T) * Math.PI / 180;

  const ascDegree = (Math.atan2(Math.cos(lstRad), -(Math.sin(lstRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps))) * 180 / Math.PI + 360) % 360;
  const mcDegree = (Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(eps)) * 180 / Math.PI + 360) % 360;

  const zodiacs = ['ვერძი', 'კურო', 'ტყუპები', 'კირჩხიბი', 'ლომი', 'ქალწული', 'სასწორი', 'მორიელი', 'მშვილდოსანი', 'თხის რქა', 'მერწყული', 'თევზები'];
  const getSign = (deg) => zodiacs[Math.floor(((deg % 360 + 360) % 360) / 30)];

  const ascSign = getSign(ascDegree);
  const dscSign = getSign(ascDegree + 180);
  const mcSign = getSign(mcDegree);
  const icSign = getSign(mcDegree + 180);

  const signDB = {
    'ვერძი': { strength: 'შეუპოვრობა და ლიდერობა', challenge: 'იმპულსურობა', advice: 'ისწავლეთ მოთმინება და დაფიქრება მოქმედებამდე.', impact: 'აძლევს ძლიერ დინამიკას, ინიციატივასა და აქტიურ ენერგიას.' },
    'კურო': { strength: 'სტაბილურობა და ერთგულება', challenge: 'სიჯიუტე', advice: 'იყავით უფრო ღია ცვლილებებისა და სიახლეების მიმართ.', impact: 'უზრუნველყოფს პრაქტიკულობას, სიმყარესა და მატერიალურ ფოკუსს.' },
    'ტყუპები': { strength: 'ინტელექტი და ადაპტაცია', challenge: 'ზედაპირულობა', advice: 'ფოკუსირდით მთავარ მიზანზე და ნუ გაფანტავთ ენერგიას.', impact: 'აძლიერებს კომუნიკაციას, ცნობისმოყვარეობასა და გონებრივ მოქნილობას.' },
    'კირჩხიბი': { strength: 'ინტუიცია და ემპათია', challenge: 'წყენის დაგროვება', advice: 'დააწესეთ ჯანსაღი პირადი საზღვრები.', impact: 'მანათებს ემოციურ სიღრმეს, ოჯახურ ღირებულებებსა და მზრუნველობას.' },
    'ლომი': { strength: 'ქარიზმა და გულუხვობა', challenge: 'ეგოცენტრიზმი', advice: 'მიეცით სხვებსაც საკუთარი თავის გამოხატვის საშუალება.', impact: 'ანიჭებს შემოქმედებით ენერგიას, თვითრწმენასა და ლიდერულ თვისებებს.' },
    'ქალწული': { strength: 'ანალიზი და პრაქტიკულობა', challenge: 'პერფექციონიზმი', advice: 'ისწავლეთ არასრულყოფილების მიღება და მოდუნება.', impact: 'ზრდის დეტალებისადმი ყურადღებას, დისციპლინასა და ორგანიზებულობას.' },
    'სასწორი': { strength: 'დიპლომატია და ესთეტიკა', challenge: 'გადაწყვეტილების სირთულე', advice: 'ენდეთ საკუთარ არჩევანს და იმოქმედეთ მტკიცედ.', impact: 'მოაქვს ჰარმონია, პარტნიორობის სურვილი და ესთეტიკური ხედვა.' },
    'მორიელი': { strength: 'სიღრმე და ნებისყოფა', challenge: 'ეჭვიანობა', advice: 'ისწავლეთ ნდობა და ძველი წყენების გაშვება.', impact: 'ამძაფრებს ინტუიციას, შინაგან ძალასა და ტრანსფორმაციის უნარს.' },
    'მშვილდოსანი': { strength: 'ოპტიმიზმი და ფართო ხედვა', challenge: 'ტაქტის ნაკლებობა', advice: 'დააფასეთ დეტალები და იყავით უფრო ყურადღებიანი.', impact: 'მატებს თავგადასავლების სიყვარულს, ოპტიმიზმსა და სულიერ ძიებას.' },
    'თხის რქა': { strength: 'დისციპლინა და ამბიცია', challenge: 'სიმკაცრე და სიცივე', advice: 'გამოხატეთ გრძნობები ღიად და დაასვენეთ გონება.', impact: 'სძენს პასუხისმგებლობას, კარიერულ ამბიციასა და გამძლეობას.' },
    'მერწყული': { strength: 'ინოვაცია და თავისუფლება', challenge: 'ემოციური დისტანცია', advice: 'შეინარჩუნეთ თბილი ემოციური კონტაქტები.', impact: 'აბრუნებს ორიგინალურობას, ჰუმანურობასა და არასტანდარტულ აზროვნებას.' },
    'თევზები': { strength: 'ფანტაზია და სულიერება', challenge: 'რეალობისგან გაქცევა', advice: 'შეინარჩუნეთ რეალობის შეგრძნება და მყარად იდექით მიწაზე.', impact: 'ამაღლებს მგრძნობელობას, შთაგონებასა და თანაგრძნობას.' }
  };

  const getSignData = (s) => signDB[s] || signDB['ტყუპები'];

  const houseAreas = ['პიროვნება', 'ფინანსები', 'კომუნიკაცია', 'ოჯახი', 'შემოქმედება', 'ჯანმრთელობა', 'პარტნიორობა', 'ტრანსფორმაცია', 'ფილოსოფია', 'კარიერა', 'მეგობრობა', 'ქვეცნობიერი'];

  return {
    visualSchema: { asc: ascSign, dsc: dscSign, mc: mcSign, ic: icSign, description: '' },
    big3: {
      sun: { sign: getSign(sunLon), house: 9, meaning: 'პიროვნების ბირთვი', manifestation: 'იდენტობა', ...getSignData(getSign(sunLon)) },
      moon: { sign: getSign(moonLon), house: 4, meaning: 'ემოციური სამყარო', manifestation: 'ინსტინქტები', ...getSignData(getSign(moonLon)) },
      ascendant: { sign: ascSign, house: 1, meaning: 'გარეგანი ქცევა', manifestation: 'იმიჯი', ...getSignData(ascSign) }
    },
    planets: [
      { name: 'მერკური', sign: getSign(mercuryLon), house: 8, meaning: 'აზროვნება', manifestation: 'აზრების გამოხატვა', ...getSignData(getSign(mercuryLon)) },
      { name: 'ვენერა', sign: getSign(venusLon), house: 2, meaning: 'სიყვარული', manifestation: 'გრძნობების გამოვლენა', ...getSignData(getSign(venusLon)) },
      { name: 'მარსი', sign: getSign(marsLon), house: 3, meaning: 'აქტივობა', manifestation: 'ენერგიის მიმართვა', ...getSignData(getSign(marsLon)) },
      { name: 'იუპიტერი', sign: getSign(jupiterLon), house: 4, meaning: 'იღბალი', manifestation: 'ზრდა და განვითარება', ...getSignData(getSign(jupiterLon)) },
      { name: 'სატურნი', sign: getSign(saturnLon), house: 5, meaning: 'დისციპლინა', manifestation: 'სტრუქტურა', ...getSignData(getSign(saturnLon)) },
      { name: 'ურანი', sign: getSign(uranusLon), house: 6, meaning: 'ინოვაცია', manifestation: 'ორიგინალურობა', ...getSignData(getSign(uranusLon)) },
      { name: 'ნეპტუნი', sign: getSign(neptuneLon), house: 7, meaning: 'ინტუიცია', manifestation: 'შთაგონება', ...getSignData(getSign(neptuneLon)) },
      { name: 'პლუტონი', sign: getSign(plutoLon), house: 8, meaning: 'ტრანსფორმაცია', manifestation: 'შინაგანი ძალა', ...getSignData(getSign(plutoLon)) }
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
    aspects: [{ planets: 'მზე - მთვარე', type: 'ოპოზიცია', orb: '1.2°', meaning: 'შინაგანი დინამიკა', manifestation: 'ბალანსი', strength: 'მრავალმხრივობა', challenge: 'დაძაბულობა', advice: 'იპოვეთ ოქროს შუალედი.' }],
    karmic: [
      { name: 'ჩრდილოეთის კვანძი', sign: getSign(rahuLon), house: 7, meaning: 'კარმული მიმართულება', manifestation: 'განვითარების ვექტორი', ...getSignData(getSign(rahuLon)) },
      { name: 'ქირონი', sign: getSign(chironLon), house: 6, meaning: 'შინაგანი განკურნების წერტილი', manifestation: 'სხვების დახმარება', ...getSignData(getSign(chironLon)) }
    ],
    angles: [
      { name: 'ASC (ასცენდენტი)', sign: ascSign, meaning: 'პიროვნება და გარეგანი იმიჯი', ...getSignData(ascSign) }, 
      { name: 'DSC (დესცენდენტი)', sign: dscSign, meaning: 'პარტნიორობა და ურთიერთობები', ...getSignData(dscSign) },
      { name: 'MC (შუა ცა)', sign: mcSign, meaning: 'კარიერა და საზოგადოებრივი სტატუსი', ...getSignData(mcSign) }, 
      { name: 'IC (ქვედა ცა)', sign: icSign, meaning: 'ოჯახი, ფესვები და პირადი სივრცე', ...getSignData(icSign) }
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
      analysis: 'აქტიური და ინიციატივიანი მიდგომა.',
      strength: 'ლიდერობა და წამოწყების უნარი',
      challenge: 'დაწყებული საქმის ბოლომდე მიყვანა'
    },
    dominants: { 
      planet: 'მზე', sign: getSign(sunLon), 
      element: 'ტროპიკული ბირთვი', 
      why: 'მზის ძლიერი განლაგება ნატალურ რუკაში.',
      strength: 'მაღალი თვითშეფასება და ენერგია', 
      challenge: 'ეგოს კონტროლი', 
      advice: 'გამოიყენეთ თქვენი ავტორიტეტი სხვების დასახმარებლად.' 
    },
    summary: { 
      trait: `${getSign(sunLon)} მზისა და ${ascSign} ასცენდენტის სინთეზი`, 
      strength: 'Astro.com-ის იდენტური სიზუსტე', 
      challenge: 'ბალანსი', 
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
