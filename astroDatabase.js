
// 🌟 დომინანტური პლანეტისა და ნიშნის მრავალფაქტორიანი ქულების სისტემა
const calculateDominants = (sunSign, moonSign, ascSign, planetsList, housesList) => {
  // პლანეტების ბაზისური ქულები
  let planetScores = {
    'მზე': 0, 'მთვარე': 0, 'მერკური': 0, 'ვენერა': 0, 'მარსი': 0,
    'იუპიტერი': 0, 'სატურნი': 0, 'ურანი': 0, 'ნეპტუნი': 0, 'პლუტონი': 0
  };

  let planetReasons = {
    'მზე': [], 'მთვარე': [], 'მერკური': [], 'ვენერა': [], 'მარსი': [],
    'იუპიტერი': [], 'სატურნი': [], 'ურანი': [], 'ნეპტუნი': [], 'პლუტონი': []
  };

  // ნიშნების ბაზისური ქულები
  let signScores = {
    'ვერძი': 0, 'კურო': 0, 'ტყუპები': 0, 'კირჩხიბი': 0, 'ლომი': 0, 'ქალწული': 0,
    'სასწორი': 0, 'მორიელი': 0, 'მშვილდოსანი': 0, 'თხის რქა': 0, 'მერწყული': 0, 'თევზები': 0
  };

  let signReasons = {
    'ვერძი': [], 'კურო': [], 'ტყუპები': [], 'კირჩხიბი': [], 'ლომი': [], 'ქალწული': [],
    'სასწორი': [], 'მორიელი': [], 'მშვილდოსანი': [], 'თხის რქა': [], 'მერწყული': [], 'თევზები': []
  };

  // მზისა და მთვარის ნიშნების ქულები ნიშანთა სისტემაში
  if (sunSign && signScores[sunSign] !== undefined) {
    signScores[sunSign] += 5;
    signReasons[sunSign].push('მზე მდებარეობს ამ ნიშანში (+5)');
  }
  if (moonSign && signScores[moonSign] !== undefined) {
    signScores[moonSign] += 5;
    signReasons[moonSign].push('მთვარე მდებარეობს ამ ნიშანში (+5)');
  }
  if (ascSign && signScores[ascSign] !== undefined) {
    signScores[ascSign] += 7;
    signReasons[ascSign].push('ASC (ასცენდენტი) ამ ნიშანშია (+7)');
  }

  // პლანეტების დამუშავება
  if (Array.isArray(planetsList)) {
    planetsList.forEach(p => {
      let pName = p.name;
      // ვათანხმებთ სახელებს
      if (pName === 'Sun') pName = 'მზე';
      if (pName === 'Moon') pName = 'მთვარე';
      if (pName === 'Mercury') pName = 'მერკური';
      if (pName === 'Venus') pName = 'ვენერა';
      if (pName === 'Mars') pName = 'მარსი';
      if (pName === 'Jupiter') pName = 'იუპიტერი';
      if (pName === 'Saturn') pName = 'სატურნი';
      if (pName === 'Uranus') pName = 'ურანი';
      if (pName === 'Neptune') pName = 'ნეპტუნი';
      if (pName === 'Pluto') pName = 'პლუტონი';

      if (planetScores[pName] !== undefined) {
        // სახლების შეფასება (I, IV, VII, X)
        if ([1, 4, 7, 10].includes(p.house)) {
          planetScores[pName] += 4;
          planetReasons[pName].push(`მდებარეობს მე-${p.house} (კუთხის) სახლში (+4)`);
        }
        // ნიშნების ქულები პლანეტებიდან
        if (p.sign && signScores[p.sign] !== undefined) {
          let addScore = pName === 'მერკური' || pName === 'ვენერა' || pName === 'მარსი' ? 3 : (pName === 'იუპიტერი' || pName === 'სატურნი' ? 2 : 1);
          signScores[p.sign] += addScore;
          signReasons[p.sign].push(`პლანეტა ${pName} აძლიერებს ამ ნიშანს (+${addScore})`);
        }
      }
    });
  }

  // ტოპ პლანეტების შერჩევა
  let sortedPlanets = Object.keys(planetScores).map(k => ({ name: k, score: planetScores[k], reasons: planetReasons[k] })).sort((a, b) => b.score - a.score);
  let sortedSigns = Object.keys(signScores).map(k => ({ name: k, score: signScores[k], reasons: signReasons[k] })).sort((a, b) => b.score - a.score);

  const dominants = calculateDominants(sunSign, moonSign, ascSign, planets, houses);
    return {
      dominants,
    dominantPlanet: sortedPlanets[0] || { name: 'მერკური', score: 25, reasons: ['ძლიერი სტატუსი რუკაში'] },
    secondaryPlanets: sortedPlanets.slice(1, 3),
    dominantSign: sortedSigns[0] || { name: 'ტყუპები', score: 30, reasons: ['მზე და ასცენდენტი ამ ნიშანშია'] },
    secondarySigns: sortedSigns.slice(1, 3)
  };
};



const getOppositeSign = (sign) => {
      const opposites = {
        'ვერძი': 'სასწორი', 'კურო': 'მორიელი', 'ტყუპები': 'მშვილდოსანი', 'კირჩხიბი': 'თხის რქა', 'ლომი': 'მერწყული', 'ქალწული': 'თევზები',
        'სასწორი': 'ვერძი', 'მორიელი': 'კურო', 'მშვილდოსანი': 'ტყუპები', 'თხის რქა': 'კირჩხიბი', 'მერწყული': 'ლომი', 'თევზები': 'ქალწული'
      };
      return opposites[sign] || 'უცნობია';
    };

const getGenitive = (name) => {
  const genitives = {
    'მზე': 'მზის',
    'მთვარე': 'მთვარის',
    'მერკური': 'მერკურის',
    'ვენერა': 'ვენერას',
    'მარსი': 'მარსის',
    'იუპიტერი': 'იუპიტერის',
    'სატურნი': 'სატურნის',
    'ურანი': 'ურანის',
    'ნეპტუნი': 'ნეპტუნის',
    'პლუტონი': 'პლუტონის',
    'ასცენდენტი': 'ასცენდენტის',
    'ჩრდილოეთ კვანძი': 'ჩრდილოეთ კვანძის',
    'სამხრეთ კვანძი': 'სამხრეთ კვანძის',
    'ქირონი': 'ქირონის',
    'ლილიტი': 'ლილიტის',
    'ფორტუნა': 'ფორტუნას'
  };
  return genitives[name] || name + '-ის';
};

const getGenitiveSign = (s) => {
  const map = {
    'ვერძი': 'ვერძის',
    'კურო': 'კუროს',
    'ტყუპები': 'ტყუპების',
    'კირჩხიბი': 'კირჩხიბის',
    'ლომი': 'ლომის',
    'ქალწული': 'ქალწულის',
    'სასწორი': 'სასწორის',
    'მორიელი': 'მორიელის',
    'მშვილდოსანი': 'მშვილდოსნის',
    'თხის რქა': 'თხის რქის',
    'მერწყული': 'მერწყულის',
    'თევზები': 'თევზების'
  };
  return map[s] || s;
};

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
            meaning: `${getGenitive(p1.name)} და ${getGenitive(p2.name)} ${asp.name} კავშირი ქმნის უნიკალურ ენერგეტიკულ რეზონანსს.`,
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
    
    corners: [
      { 
        name: 'ASC (ასცენდენტი)', 
        sign: typeof ascSign !== 'undefined' ? ascSign : 'უცნობია',
        meaning: 'პიროვნება, გარეგანი ქცევა და პირველი შთაბეჭდილება.',
        manifestation: 'გამოიხატება სოციალურ ნიღაბში, სამყაროსთან პირველად კონტაქტსა და ახალ გარემოსთან ადაპტაციაში.',
        strength: 'გარე სამყაროსთან ეფექტური კომუნიკაცია და საკუთარი თავის წარმოჩენის უნარი.',
        challenge: 'ზედაპირულობის საფრთხე და რეალური ემოციების ნიღბის მიღმა დამალვა.',
        advice: 'შეეცადეთ, თქვენი სოციალური როლი თანხვედრაში იყოს თქვენს შინაგან მდგომარეობასთან და ნუ დაკარგავთ ავთენტურობას.'
      },
      { 
        name: 'DSC (დესცენდენტი)', 
        sign: typeof dscSign !== 'undefined' ? dscSign : (typeof ascSign !== 'undefined' ? getOppositeSign(ascSign) : 'უცნობია'),
        meaning: 'პარტნიორობა და ურთიერთობები.',
        manifestation: 'აჩვენებს, თუ როგორი ტიპის ადამიანებს იზიდავთ, რას ეძებთ პარტნიორში და როგორ აგებთ ხანგრძლივ კავშირებს.',
        strength: 'სხვებთან თანამშრომლობისა და კომპრომისის გამონახვის უნარი, ურთიერთობების დაფასება.',
        challenge: 'საკუთარი იდენტობის დაკარგვის შიში პარტნიორულ ურთიერთობებში, ან სხვებზე ზედმეტი დამოკიდებულება.',
        advice: 'ისწავლეთ ჯანსაღი საზღვრების დაწესება და გახსოვდეთ, რომ ჰარმონიული ურთიერთობა ორ დამოუკიდებელ პიროვნებას მოითხოვს.'
      },
      { 
        name: 'MC (შუა ცა)', 
        sign: typeof mcSign !== 'undefined' ? mcSign : 'უცნობია',
        meaning: 'კარიერა, მიზნები და საზოგადოებრივი სტატუსი.',
        manifestation: 'თქვენი უმაღლესი მიზნები, პროფესიული ამბიციები და ის, თუ როგორ გხედავთ ფართო საზოგადოება.',
        strength: 'მიზანდასახულობა, პროფესიული ზრდის პოტენციალი და საზოგადოებრივი აღიარების მოპოვების უნარი.',
        challenge: 'კარიერაზე ზედმეტი ფოკუსირება პირადი ცხოვრებისა და შინაგანი სიმშვიდის ხარჯზე.',
        advice: 'მიჰყევით თქვენს ამბიციებს, მაგრამ ნუ დაგავიწყდებათ იმ ფუნდამენტის მოფრთხილება, რომელიც შინაგან სტაბილურობას გაძლევთ.'
      },
      { 
        name: 'IC (ქვედა ცა)', 
        sign: typeof icSign !== 'undefined' ? icSign : (typeof mcSign !== 'undefined' ? getOppositeSign(mcSign) : 'უცნობია'),
        meaning: 'ოჯახი, ფესვები და პირადი სივრცე.',
        manifestation: 'თქვენი ფსიქოლოგიური საძირკველი, ოჯახური ტრადიციები და ის გარემო, სადაც თავს ყველაზე დაცულად გრძნობთ.',
        strength: 'ძლიერი შინაგანი საყრდენი, ემპათია და საკუთარი სივრცის ჰარმონიულად მოწყობის უნარი.',
        challenge: 'წარსულზე მიჯაჭვულობა და ბავშვობისდროინდელი ტრავმების გამო დაუცველობის განცდა.',
        advice: 'შექმენით უსაფრთხო გარემო საკუთარი თავისთვის და ნუ შეგეშინდებათ ძველი, მოძველებული ფესვების მოჭრის, რათა ახალი გაზარდოთ.'
      }
    ],
    visualSchema: { 
      asc: '', dsc: '', mc: '', ic: '', 
      description: `• დაბადების თარიღი: ${day} ${month}, ${y}\n• დაბადების დრო: ${formattedTime}\n• დაბადების ადგილი: ${city}\n• დროის ზონა: ${zoneDesc}\n• რუკის ტიპი: დასავლური ტროპიკული` 
    },
    big3: {
      sun: { 
        sign: getSign(sunLon), 
        house: typeof sunHouse !== 'undefined' ? sunHouse : 9, 
        meaning: 'აჩვენებს პიროვნების ძირითად ბუნებას, თვითგამოხატვასა და იდენტობას.', 
        manifestation: 'აქტიურ მოქმედებებში, ეგოსა და სასიცოცხლო ენერგიის განაწილებაში.', 
        strength: 'ნებისყოფა, შემოქმედებითობა და ინდივიდუალურობა.',
        challenge: 'ეგოცენტრიზმი ან საკუთარი თავის დაკარგვის შიში.',
        advice: 'თამამად გამოხატეთ თქვენი უნიკალურობა და ნუ შეგეშინდებათ ყურადღების ცენტრში ყოფნის.',
        ...(typeof getSignData === 'function' ? getSignData(getSign(sunLon)) : {})
      },
      moon: { 
        sign: getSign(moonLon), 
        house: typeof moonHouse !== 'undefined' ? moonHouse : 4, 
        meaning: 'განსაზღვრავს ემოციებს, შინაგან სამყაროსა და ემოციურ რეაქციებს.', 
        manifestation: 'ქვეცნობიერ რეფლექსებში, ინსტინქტებსა და მზრუნველობის გამოხატვაში.', 
        strength: 'ინტუიცია, ემპათია და ემოციური სიღრმე.',
        challenge: 'ემოციური არასტაბილურობა და წარსულზე ზედმეტი მიჯაჭვულობა.',
        advice: 'ისწავლეთ საკუთარი ემოციების მიღება და მიეცით თავს დასვენებისა და აღდგენის უფლება.',
        ...(typeof getSignData === 'function' ? getSignData(getSign(moonLon)) : {})
      },
      asc: { 
        sign: typeof ascSign !== 'undefined' ? ascSign : 'უცნობია', 
        house: 1, 
        meaning: 'აჩვენებს გარეგნულ ქცევას, პირველ შთაბეჭდილებასა და სამყაროსთან ურთიერთობის სტილს.', 
        manifestation: 'სოციალურ ნიღაბში, პირველად კონტაქტსა და ახალ გარემოსთან ადაპტაციაში.', 
        strength: 'ადაპტაციის უნარი და გარე სამყაროსთან ეფექტური კომუნიკაცია.',
        challenge: "ზედაპირული შეფასებების რისკი და რეალური 'მე'-ს ნიღბის მიღმა დამალვა.",
        advice: 'იყავით ბუნებრივი — ეცადეთ, თქვენი სოციალური როლი თქვენს რეალურ შინაგან სამყაროსთან ჰარმონიაში იყოს.',
        ...(typeof getSignData === 'function' && typeof ascSign !== 'undefined' ? getSignData(ascSign) : {})
      }
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
        challenge: 'წარსულში ჩარჩენა და განვითარების შეფერხება.' 
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
      { 
        name: 'ASC (ასცენდენტი)', 
        sign: ascSign, 
        meaning: 'პიროვნების პირველი შთაბეჭდილება, გარეგნული იმიჯი და სამყაროსთან ურთიერთობის სტილი.', 
        strength: `${getGenitiveSign(ascSign)} ენერგია ანიჭებს ${getSignData(ascSign).strength}`, 
        challenge: `გამოწვევითია ${getSignData(ascSign).challenge.toLowerCase()}` 
      }, 
      { 
        name: 'DSC (დესცენდენტი)', 
        sign: dscSign, 
        meaning: 'პარტნიორობა, ურთიერთობების მოდელი და თვისებები, რომლებსაც პარტნიორში ეძებთ.', 
        strength: `ურთიერთობებში ვლინდება ${getGenitiveSign(dscSign)} საუკეთესო თვისებები: ${getSignData(dscSign).strength}`, 
        challenge: `პარტნიორობაში გადასალახია ${getSignData(dscSign).challenge.toLowerCase()}` 
      },
      { 
        name: 'MC (შუა ცა)', 
        sign: mcSign, 
        meaning: 'კარიერული მწვერვალი, საზოგადოებრივი სტატუსი, ამბიციები და ცხოვრებისეული მისია.', 
        strength: `პროფესიულ ასპარეზზე გეხმარებათ ${getGenitiveSign(mcSign)} თვისებები: ${getSignData(mcSign).strength}`, 
        challenge: `კარიერაში მთავარი დაბრკოლებაა ${getSignData(mcSign).challenge.toLowerCase()}` 
      }, 
      { 
        name: 'IC (ქვედა ცა)', 
        sign: icSign, 
        meaning: 'ოჯახური ფესვები, პირადი სივრცე, ემოციური უსაფრთხოება და შინაგანი საყრდენი.', 
        strength: `სახლსა და ოჯახურ გარემოში განიჭებთ ${getGenitiveSign(icSign)} ბუნებას: ${getSignData(icSign).strength}`, 
        challenge: `შინაგანი ჰარმონიისთვის გადასალახია ${getSignData(icSign).challenge.toLowerCase()}` 
      }
    ],
    elements: { 
      fire: '30%', earth: '35%', air: '20%', water: '15%', 
      dominant: 'მიწა', 
      least: 'წყალი',
      meaning: 'სტიქიები განსაზღვრავს ადამიანის ტემპერამენტს, აღქმის ტიპსა და სასიცოცხლო ენერგიის წყაროს. ცეცხლი — ენერგია და ვნება, მიწა — სტაბილურობა და პრაქტიკულობა, ჰაერი — ინტელექტი და კომუნიკაცია, წყალი — ემოცია და ინტუიცია.',
      analysis: 'ჭარბობს მიწის სტიქია — ადამიანი გამოირჩევა რეალისტური, პრაგმატული და სისტემური მიდგომებით, ხოლო წყლის სტიქიის ნაკლებობა მიუთითებს ემოციების რაციონალიზაციის ტენდენციაზე.',
      strength: 'მაღალი პრაქტიკულობა, საიმედოობა, მიზანმიმართულობა და მატერიალურ სამყაროში მყარი ფეხის დადგმის უნარი.',
      challenge: 'ემოციების გამოხატვის სირთულე, ცვლილებების მიმართ სიფრთხილე და ზედმეტი პრაგმატიზმი.'
    },
    modalities: { 
      cardinal: '40%', fixed: '40%', mutable: '20%', 
      dominant: 'კარდინალური', 
      meaning: 'მოდალობები ასახავს იმას, თუ როგორ გამოხატავს ადამიანი ენერგიას და როგორ ეგუება ცვლილებებს. კარდინალური — ინიციატივა და დაწყება, ფიქსირებული — სტაბილურობა და შენარჩუნება, მუტაბელური — ადაპტაცია და ცვლილება.',
      analysis: 'ჭარბობს კარდინალური ენერგია — ახალი პროექტების წამოწყების, ინიციატივის ხელში აღებისა და მოქმედების მაღალი უნარი.',
      strength: 'მაღალი ინიციატივა, გადაწყვეტილებების სწრაფად მიღება და ახალი გზების გაკაფვის უნარი.',
      challenge: 'დაწყებული საქმეების ბოლომდე მიყვანის სირთულე და მოუთმენლობა.'
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
      strength: 'მაღალი შინაგანი პოტენციალი, მიზანდასახულობა, სიტუაციების ღრმა ანალიზისა და გამოწვევების შესაძლებლობად ქცევის უნარი.', 
      challenge: 'ემოციურსა და ლოგიკურ სფეროებს შორის ოქროს შუალედის პოვნა და გადაღლის თავიდან აცილება.', 
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
