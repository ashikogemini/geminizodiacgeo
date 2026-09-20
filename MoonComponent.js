import { MoonPhase } from 'astronomy-engine';

const ZODIAC_SIGNS = [
  'ვერძი', 'კურო', 'ტყუპები', 'კირჩხიბი', 
  'ლომი', 'ქალწული', 'სასწორი', 'მორიელი', 
  'მშვილდოსანი', 'თხის რქა', 'მერწყული', 'თევზები'
];

const ZODIAC_ICONS = [
  'zodiac-aries', 'zodiac-taurus', 'zodiac-gemini', 'zodiac-cancer',
  'zodiac-leo', 'zodiac-virgo', 'zodiac-libra', 'zodiac-scorpio',
  'zodiac-sagittarius', 'zodiac-capricorn', 'zodiac-aquarius', 'zodiac-pisces'
];

export const getMoonData = (date = new Date()) => {
  const phaseAngle = MoonPhase(date);
  const illumination = Math.round((1 - Math.cos((phaseAngle * Math.PI) / 180)) * 50);

  let phaseName = 'ახალი მთვარე';
  let statusText = 'მზარდი';
  let dailyPhrase = '';
  let majorPhase = null; // 'new' ან 'full'

  if (phaseAngle >= 345 || phaseAngle < 15) {
    phaseName = 'ახალი მთვარე 🌑';
    statusText = 'ახალი ციკლი';
    dailyPhrase = 'დაისახეთ ახალი მიზნები, გაანთავისუფლეთ გონება და ჩაიფიქრეთ სურვილები.';
    majorPhase = 'new';
  } else if (phaseAngle >= 15 && phaseAngle < 75) {
    phaseName = 'მზარდი ნამგალი 🌒';
    statusText = 'მზარდი მთვარე';
    dailyPhrase = 'ენერგია იმატებს. იდეალური დროა ახალი საქმის დასაწყებად და ინფორმაციის მოსაძიებლად.';
  } else if (phaseAngle >= 75 && phaseAngle < 105) {
    phaseName = 'პირველი მეოთხედი 🌓';
    statusText = 'მზარდი მთვარე';
    dailyPhrase = 'გადადგით თამამი ნაბიჯები და დაძლიეთ პირველი წინააღმდეგობები იუმორით.';
  } else if (phaseAngle >= 105 && phaseAngle < 165) {
    phaseName = 'მზარდი მთვარე 🌔';
    statusText = 'მზარდი მთვარე';
    dailyPhrase = 'მოემზადეთ შედეგების მისაღებად. შეინარჩუნეთ ფოკუსი და არ გაიფანტოთ წვრილმანებზე.';
  } else if (phaseAngle >= 165 && phaseAngle < 195) {
    phaseName = 'სავსემთვარეობა 🌕';
    statusText = 'სრული ენერგია';
    dailyPhrase = 'ემოციების პიკი. გაუშვით ის, რაც აღარ გემსახურებათ და შეინარჩუნეთ სიმშვიდე.';
    majorPhase = 'full';
  } else if (phaseAngle >= 195 && phaseAngle < 255) {
    phaseName = 'კლებადი მთვარე 🌖';
    statusText = 'კლებადი მთვარე';
    dailyPhrase = 'დაფიქრდით განვლილ გზაზე. კარგი დროა შედეგების ანალიზისა და დასკვნების გამოსატანად.';
  } else if (phaseAngle >= 255 && phaseAngle < 285) {
    phaseName = 'ბოლო მეოთხედი 🌗';
    statusText = 'კლებადი მთვარე';
    dailyPhrase = 'გაათავისუფლეთ სივრცე. დაასრულეთ დაწყებული საქმეები და გადაყარეთ ზედმეტი ნივთები.';
  } else {
    phaseName = 'კლებადი ნამგალი 🌘';
    statusText = 'კლებადი მთვარე';
    dailyPhrase = 'დაისვენეთ, აღიდგინეთ ძალები და მოემზადეთ ახალი ენერგეტიკული ციკლისთვის.';
  }

  const jd = (date.getTime() / 86400000) + 2440587.5;
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  let sunLon = q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180);
  sunLon = sunLon % 360;
  if (sunLon < 0) sunLon += 360;

  let moonLon = (sunLon + phaseAngle) % 360;
  if (moonLon < 0) moonLon += 360;

  const signIndex = Math.floor(moonLon / 30) % 12;

  return {
    phaseName,
    statusText,
    illumination,
    currentSign: ZODIAC_SIGNS[signIndex],
    currentIcon: ZODIAC_ICONS[signIndex],
    dailyPhrase,
    majorPhase
  };
};
