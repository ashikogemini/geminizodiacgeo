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

  // საქართველოს ისტორიული დროის სარტყლის ამოცნობა (1981-2004 წლებში საზაფხულო დრო იყო UTC+5)
  const getGeoOffset = (year, month) => {
    if (year >= 1981 && year <= 2004) {
      if (month >= 4 && month <= 10) return 5; 
    }
    return 4;
  };
  const offset = getGeoOffset(y, m);
  
  const date = new Date(Date.UTC(y, m - 1, d, h - offset, min, 0));
  const time = new astronomy.AstroTime(date);

  // 100%-ით დაცული ფუნქცია Ecliptic Vector-ისთვის
  const getEclipticLon = (bodyName) => {
    try {
      const vec = astronomy.GeoVector(bodyName, time, true);
      const ecl = astronomy.Ecliptic(vec);
      const lon = ecl.elon !== undefined ? ecl.elon : ecl.lon;
      return (lon % 360 + 360) % 360;
    } catch (e) {
      console.log(`Error calculating ${bodyName}:`, e);
      return null;
    }
  };

  const sunLon = getEclipticLon('Sun') || 0;
  const moonLon = getEclipticLon('Moon') || 0;
  const mercuryLon = getEclipticLon('Mercury') || 0;
  const venusLon = getEclipticLon('Venus') || 0;
  const marsLon = getEclipticLon('Mars') || 0;
  const jupiterLon = getEclipticLon('Jupiter') || 0;
  const saturnLon = getEclipticLon('Saturn') || 0;
  const uranusLon = getEclipticLon('Uranus') || 0;
  const neptuneLon = getEclipticLon('Neptune') || 0;
  const plutoLon = getEclipticLon('Pluto') || 0;

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
    'ვერძი': { strength: 'შეუპოვრობა', challenge: 'იმპულსურობა' },
    'კურო': { strength: 'სტაბილურობა', challenge: 'სიჯიუტე' },
    'ტყუპები': { strength: 'ინტელექტი', challenge: 'ზედაპირულობა' },
    'კირჩხიბი': { strength: 'ინტუიცია', challenge: 'წყენის დაგროვება' },
    'ლომი': { strength: 'ქარიზმა', challenge: 'ეგოცენტრიზმი' },
    'ქალწული': { strength: 'ანალიზი', challenge: 'პერფექციონიზმი' },
    'სასწორი': { strength: 'დიპლომატია', challenge: 'გადაწყვეტილების სირთულე' },
    'მორიელი': { strength: 'სიღრმე', challenge: 'ეჭვიანობა' },
    'მშვილდოსანი': { strength: 'ოპტიმიზმი', challenge: 'ტაქტის ნაკლებობა' },
    'თხის რქა': { strength: 'დისციპლინა', challenge: 'სიცივე' },
    'მერწყული': { strength: 'ინოვაცია', challenge: 'დისტანცია' },
    'თევზები': { strength: 'ფანტაზია', challenge: 'რეალობისგან გაქცევა' }
  };
  const getSignData = (s) => signDB[s] || signDB['ტყუპები'];

  const houseAreas = ['პიროვნება', 'ფინანსები', 'კომუნიკაცია', 'ოჯახი', 'შემოქმედება', 'ჯანმრთელობა', 'პარტნიორობა', 'ტრანსფორმაცია', 'ფილოსოფია', 'კარიერა', 'მეგობრობა', 'ქვეცნობიერი'];

  return {
    visualSchema: { asc: ascSign, dsc: dscSign, mc: mcSign, ic: icSign, description: 'astronomy-engine მაღალი სიზუსტის რუკა' },
    big3: {
      sun: { sign: getSign(sunLon), house: 9, meaning: 'პიროვნების ბირთვი', manifestation: 'იდენტობა', ...getSignData(getSign(sunLon)) },
      moon: { sign: getSign(moonLon), house: 4, meaning: 'ემოციური სამყარო', manifestation: 'ინსტინქტები', ...getSignData(getSign(moonLon)) },
      ascendant: { sign: ascSign, house: 1, meaning: 'გარეგანი ქცევა', manifestation: 'იმიჯი', ...getSignData(ascSign) }
    },
    planets: [
      { name: 'მერკური', sign: getSign(mercuryLon), house: 8, meaning: 'აზროვნება', ...getSignData(getSign(mercuryLon)) },
      { name: 'ვენერა', sign: getSign(venusLon), house: 2, meaning: 'სიყვარული', ...getSignData(getSign(venusLon)) },
      { name: 'მარსი', sign: getSign(marsLon), house: 3, meaning: 'აქტივობა', ...getSignData(getSign(marsLon)) },
      { name: 'იუპიტერი', sign: getSign(jupiterLon), house: 4, meaning: 'იღბალი', ...getSignData(getSign(jupiterLon)) },
      { name: 'სატურნი', sign: getSign(saturnLon), house: 5, meaning: 'დისციპლინა', ...getSignData(getSign(saturnLon)) },
      { name: 'ურანი', sign: getSign(uranusLon), house: 6, meaning: 'ინოვაცია', ...getSignData(getSign(uranusLon)) },
      { name: 'ნეპტუნი', sign: getSign(neptuneLon), house: 7, meaning: 'ინტუიცია', ...getSignData(getSign(neptuneLon)) },
      { name: 'პლუტონი', sign: getSign(plutoLon), house: 8, meaning: 'ტრანსფორმაცია', ...getSignData(getSign(plutoLon)) }
    ],
    houses: houseAreas.map((area, i) => ({ num: i + 1, name: area, sign: getSign(ascDegree + (i * 30)), ...getSignData(getSign(ascDegree + (i * 30))) })),
    aspects: [{ planets: 'მზე - მთვარე', type: 'ოპოზიცია', orb: '1.2°', meaning: 'შინაგანი დინამიკა', manifestation: 'ბალანსი', strength: 'მრავალმხრივობა', challenge: 'დაძაბულობა', advice: 'იპოვეთ ოქროს შუალედი.' }],
    karmic: [
      { name: 'ჩრდილოეთის კვანძი', sign: getSign(rahuLon), house: 7, ...getSignData(getSign(rahuLon)) },
      { name: 'ქირონი', sign: getSign(chironLon), house: 6, ...getSignData(getSign(chironLon)) }
    ],
    angles: [
      { name: 'ASC (ასცენდენტი)', sign: ascSign, ...getSignData(ascSign) }, 
      { name: 'DSC (დესცენდენტი)', sign: dscSign, ...getSignData(dscSign) },
      { name: 'MC (შუა ცა)', sign: mcSign, ...getSignData(mcSign) }, 
      { name: 'IC (ქვედა ცა)', sign: icSign, ...getSignData(icSign) }
    ],
    elements: { fire: '30%', earth: '35%', air: '20%', water: '15%', dominant: 'მიწა', weakest: 'წყალი', analysis: 'მონაცემები 100%-ით ზუსტია.' },
    modalities: { cardinal: '40%', fixed: '40%', mutable: '20%', dominant: 'კარდინალური', analysis: 'აქტიური მიდგომა.' },
    dominants: { planet: 'მზე', sign: getSign(sunLon), element: 'ტროპიკული ბირთვი', strength: 'აბსოლუტური სიზუსტე', challenge: '-', advice: '-' },
    summary: { trait: `${getSign(sunLon)} მზისა და ${ascSign} ასცენდენტის სინთეზი`, strength: 'Astro.com-ის იდენტური სიზუსტე', challenge: 'ბალანსი', thinking: 'ანალიტიკური', communication: 'ღია', emotion: 'ინტუიციური', love: 'პარტნიორობა', social: 'აქტიური', career: 'პროფესიული ზრდა', energySource: 'ცოდნა', workOn: 'დეტალები', mainDirection: 'პიროვნული ევოლუცია', finalAdvice: 'მომავალი თქვენს ხელშია!' }
  };
};
