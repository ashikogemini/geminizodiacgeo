import React, { useState, useEffect } from 'react';

import { shortTermAspects, longTermAspects } from './dailyHoroscopeData';
import { WebView } from 'react-native-webview';
import { DailyHoroscopeCard } from "./DailyHoroscopeCard";
import { FAMOUS_GEMINI_DATA } from './famousGeminiData';
import { COMPATIBILITY_DATA } from "./compatibilityData";
import { GEMINI_ENCYCLOPEDIA } from './geminiData';

const renderFormattedHoroscope = (rawText) => {
  if (!rawText) return null;
  let cleaned = rawText.replace(/#/g, '');
  let paragraphs = cleaned.split('\n').filter(p => p.trim() !== '');
  let advice = paragraphs.length > 4 ? paragraphs.pop() : null;
  return (
    <View>
      {paragraphs.map((para, index) => {
        let isSec = para.startsWith('სიყვარული') || para.startsWith('კარიერა') || para.startsWith('ფინანსები') || para.startsWith('კეთილდღეობა');
        return (
          <Text key={index} style={[styles.bodyText, isSec && { color: '#d4af37', fontWeight: 'bold', marginTop: 8 }]}>
            {para}
          </Text>
        );
      })}
      {advice && (
        <View style={{ marginTop: 12, padding: 12, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#d4af37' }}>
          <Text style={{ color: '#d4af37', fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>💡 დღის რჩევა:</Text>
          <Text style={{ color: '#ddd', fontSize: 13, lineHeight: 18 }}>{advice}</Text>
        </View>
      )}
    </View>
  );
};


import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Modal , TextInput, Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getMoonData } from './MoonComponent';
import { DAILY_HOROSCOPE } from './data';

const { width } = Dimensions.get('window');


  const getDynamicMoonQuote = (signName, dateStr) => {
    const quotes = [
      "მოემზადეთ შედეგების მისაღებად. შეინარჩუნეთ ფოკუსი და არ გაიფანტოთ წვრილმანებზე.",
      "ახალი ჰორიზონტები იხსნება — გააფართოეთ თქვენი ხედვა და იმოქმედეთ გაბედულად.",
      "ოპტიმიზმი და ენერგია პიკშია, თუმცა ნუ დაივიწყებთ დეტალების გადამოწმებას.",
      "საუკეთესო დროა სწავლისთვის, მოგზაურობისა და ახალი იდეების გაზიარებისთვის.",
      "ინტუიცია გაძლიერებულია — ენდეთ შინაგან ხმას და მიიღეთ მნიშვნელოვანი გადაწყვეტილებები.",
      "ჰარმონია და წონასწორობა დაგეხმარებათ დასახული მიზნების სწრაფად მიღწევაში."
    ];
    const str = (signName || '') + (dateStr || '');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % quotes.length;
    return quotes[index];
  };


  const getMoonEventDetails = (phaseName, signName, dateStr) => {
    const isNew = phaseName && phaseName.includes('ახალი');
    const type = isNew ? 'ახალმთვარეობა' : 'სავსემთვარეობა';

    const detailsMap = {
      'ქალწული': {
        energy: isNew ? 'დეტალებზე ფოკუსირება, წესრიგი და ჯანმრთელობაზე ზრუნვა.' : 'საქმეების დაგვირგვინება და ანალიტიკური შედეგების შეჯამება.',
        topics: isNew ? 'ორგანიზება, ყოველდღიური რუტინის დალაგება, ჯანსაღი ჩვევები.' : 'ძველი პროექტების დასრულება, დეტალური რევიზია.',
        love: 'გულწრფელი საუბრები და ზრუნვა პარტნიორის პრაქტიკულ საჭიროებებზე.',
        work: 'სამუშაო პროცესების ოპტიმიზაცია და სტრატეგიული დაგეგმვა.',
        finance: 'ბიუჯეტის გადახედვა, არასაჭირო ხარჯების შემცირება.',
        emotion: 'პრაგმატული და მშვიდი, მიმართული წესრიგისკენ.',
        advice: 'ენდეთ ლოგიკასა და ინტუიციას, დაალაგეთ თქვენი გარემო!'
      },
      'მშვილდოსანი': {
        energy: isNew ? 'ახალი ჰორიზონტები, სწავლა, მოგზაურობა და იდეების გაფართოება.' : 'დიდი იდეების კულმინაცია, სულიერი სიმწიფე და ჭეშმარიტების აღმოჩენა.',
        topics: isNew ? 'უცხოური კონტაქტები, განათლება, ფილოსოფიური ხედვები.' : 'შედეგების მიღწევა სწავლაში, საერთაშორისო პროექტების დახურვა.',
        love: 'თავისუფლების მოყვარული ენერგია და საერთო ინტერესების გაზიარება.',
        work: 'მასშტაბური იდეების პრეზენტაცია და ახალი მიმართულებები.',
        finance: 'ინვესტიცია ცოდნაში და პერსპექტიულ წამოწყებებში.',
        emotion: 'ოპტიმისტური და ენერგიული, სავსე შთაგონებით.',
        advice: 'გაბედეთ დიდი ოცნებები და იმოქმედეთ მასშტაბურად!'
      }
    };

    const signData = detailsMap[signName] || {
      energy: isNew ? 'ახალი ენერგიების ნაკადი, იდეების თავისუფალი გავრცელება.' : 'ენერგიის პიკი, ემოციების გამოვლენა და შედეგების მომკის პერიოდი.',
      topics: isNew ? 'ახალი კონტაქტები, კომუნიკაცია, დოკუმენტაციასთან მუშაობა.' : 'ურთიერთობების გარკვევა, დასრულება და ტრანსფორმაცია.',
      love: 'გულწრფელი საუბრები და პარტნიორთან აზრების გაზიარება.',
      work: 'ახალი პროექტების პრეზენტაცია და შეთანხმებები.',
      finance: 'ახალი შემოსავლის წყაროების ძიება.',
      emotion: 'დინამიური და ცვალებადი.',
      advice: 'იყავით მოქნილი და ღია ახალი შესაძლებლობებისთვის!'
    };

    return {
      type,
      title: `${type}ს პროგნოზი`,
      date: dateStr,
      sign: signName,
      ...signData
    };
  };

function HomeScreen() {
  const [isStartupModalVisible, setIsStartupModalVisible] = useState(true);
  const [isShortModalVisible, setIsShortModalVisible] = useState(false);
  const [isLongModalVisible, setIsLongModalVisible] = useState(false);
  useEffect(() => {
    setIsStartupModalVisible(true);
  }, []);
  ;
  
  
  
  
  const [selectedForecast, setSelectedForecast] = useState(null);

  const fetchGeminiLive = async (promptText) => {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ API Key ვერ მოიძებნა .env ფაილში!");
      return null;
    }
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        }
      );
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error("AI Fetch Error:", error);
      return null;
    }
  };


      const fetchSituationsAi = async () => {
  if (situationsAiText || loadingSituationsAi) return;
  setLoadingSituationsAi(true);
  try {
    const prompt = "აღწერე ტყუპების ხასიათი და ქცევა 12 სიტუაციაში. თითოეული სიტუაცია დაიწყე შესაბამისი ემოჯით და ზუსტი სათაურით: როცა ბედნიერია, როცა გაბრაზებულია, როცა ნაწყენია, სტრესშია, მოწყენილია, ძალიან აინტერესებს, აღარ აინტერესებს, არჩევანის წინაშეა, მოულოდნელი ცვლილებაა, მარტო რჩება, არ ეთანხმება, დიდი მიზანი აქვს. დაწერე ვრცლად.";
    
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    const data = await res.json();
    
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let rawText = data.candidates[0].content.parts[0].text;
      setSituationsAiText(rawText.split('*').join('').trim());
    } else {
      throw new Error("Fallback needed");
    }
  } catch (e) {
    // სრული და დახვეწილი სარეზერვო ტექსტი, რომელიც გარანტირებულად ავსებს 12-ვე პუნქტს
    const fullFallback = 
      "🔹 როცა ბედნიერია — ანათებს გარემოს, აზიარებს ინოვაციურ იდეებს, ბჭობს და პოზიტიური ენერგიით მუხტავს სხვებს.\n\n" +
      "🔹 როცა გაბრაზებულია — იყენებს მწარე სარკაზმსა და რკინისებურ ლოგიკას — მისი სიტყვა ბევრად უფრო მტკივნეულია, ვიდრე ნებისმიერი ქმედება.\n\n" +
      "🔹 როცა ნაწყენია — ცდილობს აჩვენოს, რომ არაფერი ხდება, მაგრამ ცივი დისტანციით და ირონიით გრძნობნინებს თავის საზღვრებს.\n\n" +
      "🔹 როცა სტრესშია — იწყებს ქაოტურ მოძრაობას და ცდილობს ერთდროულად ათი სხვადასხვა საქმის გაკონტროლებას.\n\n" +
      "🔹 როცა მოწყენილია — მყისიერად ტოვებს მოსაწყენ სივრცეს ან საკუთარ გონებაში იგონებს ახალ თავგადასავალს.\n\n" +
      "🔹 როცა რაღაც ძალიან აინტერესებს — პარალელურად კითხულობს რამდენიმე წიგნს, ეძებს ტრენდულ სიახლეებს ან ამუშავებს ახალ იდეებს.\n\n" +
      "🔹 როცა რაღაც აღარ აინტერესებს — წამში კარგავს ფოკუსს, ერთვება სხვა თემაში და ძველს ისე ივიწყებს, თითქოს არასდროს არსებობებულა.\n\n" +
      "🔹 როცა არჩევანის წინაშეა — აანალიზებს ყველა შესაძლო ვარიანტს, ცდილობს ორივე მხარის პოზიციის გათვალისწინებას და ხშირად ბოლო წამს იცვლის გადაწყვეტილებას.\n\n" +
      "🔹 როცა მოულოდნელი ცვლილება ხდება — წამში ეწყობა ახალ რეალობას, რადგან მოქნილობა მისი მთავარი სუპერძალაა.\n\n" +
      "🔹 როცა მარტო რჩება — იყენებს დროს თვითგანვითარებისთვის, უსმენს მუსიკას, წერს ან ერთდროულად რამდენიმე ციფრულ პროექტს მართავს.\n\n" +
      "🔹 როცა ვინმე არ ეთანხმება — სიამოვნებით ეჯახება დებატებში, იყენებს არგუმენტებს და ცდილობს არა იმდენად მოგებას, რამდენადაც პროცესით ტკბობას.\n\n" +
      "🔹 როცა დიდი მიზანი აქვს — აქტიურად იწყებს ინფორმაციის შეგროვებას და კავშირების დამყარებას, თუმცა რუტინამ შეიძლება ყურადღება გაუფანტოს.";
      
    setSituationsAiText(fullFallback);
  } finally {
    setLoadingSituationsAi(false);
  }
};;;;;;


  const fetchChallengesAi = async () => {
    if (challengesAiText || loadingChallengesAi) return;
    setLoadingChallengesAi(true);
    try {
      const prompt = "დაწერე ტყუპებისთვის დამახასიათებელი სირთულეებისა და პიროვნული გამოწვევების აღწერა. უნდა მოიცავდეს გაფანტულობას, ინტერესის სწრაფად დაკარგვას, ზედმეტ ფიქრს, გადაწყვეტილების ხშირ შეცვლას, მოუთმენლობას, ერთდროულად ბევრი საქმის დაწყებას და შინაგანი დაძაბულობის დაგროვებას. თითოეული გამოწვევა უნდა იყოს ახსნილი რეალურ ქცევასთან კავშირში, ისე რომ ტექსტი არ ჟღერდეს როგორც უარყოფითი შეფასება, არამედ აჩვენებდეს, რისი მართვა შეიძლება ტყუპებისთვის განსაკუთრებით მნიშვნელოვანი იყოს.";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "• გაფანტულობა და Overthinking: მენტალური გადატვირთვა ხშირად იწვევს ყურადღების გაფანტვას.\n• ინტერესის ცვლა: როცა სიახლის ეფექტი ქრება, რუტინასთან შეგუება უჭირთ.\n• გადაწყვეტილებების გადახედვა: დუალიზმის გამო მუდმივად ეძებენ უკეთეს ალტერნატივას.";
      }
      setChallengesAiText(res);
    } catch (e) {
      setChallengesAiText("ტყუპების მთავარი გამოწვევები უკავშირდება ენერგიის გაფანტვას, ზედმეტ ფიქრს და ინტერესის სწრაფ ცვლას.");
    } finally {
      setLoadingChallengesAi(false);
    }
  };


  const fetchStrengthsAi = async () => {
    if (strengthsAiText || loadingStrengthsAi) return;
    setLoadingStrengthsAi(true);
    try {
      const prompt = "დაწერე ტყუპებისთვის დამახასიათებელი დადებითი თვისებებისა და უნარების აღწერა. უნდა მოიცავდეს მათ სწრაფ აზროვნებას, ცნობისმოყვარეობას, მოქნილობას, ადაპტაციის უნარს, ცოდნის სწრაფად ათვისებას, მრავალფეროვან ინტერესებს, იუმორს, შემოქმედება";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "• სწრაფი აზროვნება: მომენტალურად იჭერს არსს და პოულობს ალტერნატივებს.\n• ადაპტაცია: მარტივად ერგება ნებისმიერ ახალ გარემოს.\n• ცნობისმოყვარეობა: მუდმივად ეძებს ახალ ცოდნასა და გამოცდილებას.";
      }
      setStrengthsAiText(res);
    } catch (e) {
      setStrengthsAiText("ტყუპების ძლიერი მხარეებია სწრაფი აზროვნება, მოქნილობა და ამოუწურავი ცნობისმოყვარეობა.");
    } finally {
      setLoadingStrengthsAi(false);
    }
  };


  const fetchPersonalityAi = async () => {
    if (personalityAiText || loadingPersonalityAi) return;
    setLoadingPersonalityAi(true);
    try {
      const prompt = "დაწერე დეტალური აღწერა იმისა, როგორია ტყუპების შინაგანი ბუნება და ქცევითი სტილი. უნდა მოიცავდეს მათ აზროვნებას, ინტერესებს, ემოციურ რეაქციებს, ადამიანებთან დამოკიდებულებას, ცვლილებებისადმი დამოკიდებულებას, გადაწყვეტილების მიღების სტილს, ცნობისმოყვარეობას და შინაგან წინააღმდეგობებს. აქ უნდა გამოჩნდეს ტყუპების ხასიათის როგორც გამორჩეული, ისე რთული მხარეები, მაგრამ სხვა ბლოკების — სიყვარულის, მეგობრობის, კარიერისა და კომუნიკაციის — დეტალური განხილვის გარეშე.";
      
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "ტყუპების შინაგანი ბუნება გამოირჩევა მაღალი ინტელექტუალური დინამიკითა და დუალიზმით. მათი აზროვნება სწრაფი და ანალიტიკურია, ცნობისმოყვარეობა — დაუოკებელი. ისინი ადვილად იღებენ ცვლილებებს, თუმცა შინაგანად ხშირად ებრძვიან გადაწყვეტილებების მიღების პროცესსა და ინტერესების სწრაფ ცვლას.";
      }
      setPersonalityAiText(res);
    } catch (e) {
      setPersonalityAiText("ტყუპების შინაგანი ბუნება გამოირჩევა მაღალი ინტელექტუალური დინამიკითა და დუალიზმით.");
    } finally {
      setLoadingPersonalityAi(false);
    }
  };


  const fetchOverviewAi = async () => {
    if (overviewAiText || loadingOverviewAi) return;
    setLoadingOverviewAi(true);
    try {
      const prompt = "დაწერე მოკლე და საინტერესო ტექსტი, რომელიც მომხმარებელს ზოგადად გააცნობს ტყუპების ზოდიაქოს ნიშანს. აღწერაში უნდა ჩანდეს ნიშნის ძირითადი არსი, სტიქია, მმართველი პლანეტა, მთავარი ენერგია, აზროვნებისა და კომუნიკაციის თავისებურებები და ის, რით გამოირჩევა ტყუპები სხვა ნიშნებისგან. ტექსტი უნდა იყოს მარტივად წასაკითხი, თანამედროვე და ინფორმაციული, ზედმეტი დეტალებისა და სხვა ბლოკებში განსახილველი თემების გამეორების გარეშე.";
      
      // ვიყენებთ აპლიკაციაში უკვე არსებულ AI ფუნქციას
      let res = "";
      if (typeof generateHoroscope === 'function') {
        res = await generateHoroscope(prompt);
      } else if (typeof fetchAI === 'function') {
        res = await fetchAI(prompt);
      } else {
        res = "ტყუპები ზოდიაქოს ყველაზე დინამიური და ცნობისმოყვარე ჰაერის ნიშანია, რომელსაც მერკური მართავს. იგი გამოირჩევა ელვისებური აზროვნებით, კომუნიკაციის უბადლო ნიჭითა და ცვლილებებთან მყისიერი ადაპტაციით.";
      }
      setOverviewAiText(res);
    } catch (e) {
      setOverviewAiText("ტყუპები ზოდიაქოს ყველაზე დინამიური და ცნობისმოყვარე ჰაერის ნიშანია, რომელსაც მერკური მართავს.");
    } finally {
      setLoadingOverviewAi(false);
    }
  };


  const toggleGeminiCard = (key) => {
    setGeminiOpen(prev => {
      const nextState = !prev[key];
      if (key === 'overview' && nextState) { fetchOverviewAi(); }
      if (key === 'personality' && nextState) { fetchPersonalityAi(); }
      if (key === 'strengths' && nextState) { fetchStrengthsAi(); }
      if (key === 'challenges' && nextState) { fetchChallengesAi(); }
      if (key === 'situations' && nextState) { fetchSituationsAi(); }
      return { ...prev, [key]: nextState };
    });
  };

  
  const [selectedMonth, setSelectedMonth] = useState('5');
  const [selectedDay, setSelectedDay] = useState('1');
  const [overviewModalVisible, setOverviewModalVisible] = useState(false);
  const [personalityModalVisible, setPersonalityModalVisible] = useState(false);
  const [strengthsModalVisible, setStrengthsModalVisible] = useState(false);
  const [challengesModalVisible, setChallengesModalVisible] = useState(false);
  const [communicationModalVisible, setCommunicationModalVisible] = useState(false);
  const [loveModalVisible, setLoveModalVisible] = useState(false);
  const [friendshipModalVisible, setFriendshipModalVisible] = useState(false);
  const [careerModalVisible, setCareerModalVisible] = useState(false);
  const [mercuryModalVisible, setMercuryModalVisible] = useState(false);
  const [symbolismModalVisible, setSymbolismModalVisible] = useState(false);
  const [situationsModalVisible, setSituationsModalVisible] = useState(false);
  const [signsModalVisible, setSignsModalVisible] = useState(false);
  const [selectedSign, setSelectedSign] = useState(null);
  const [signDetailModalVisible, setSignDetailModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('მთავარი');
  const [horoscopeType, setHoroscopeType] = useState('week');
  const [showFullHoroscope, setShowFullHoroscope] = useState(false);
  const [geminiOpen, setGeminiOpen] = useState({});
  const [overviewAiText, setOverviewAiText] = useState('');
  const [personalityAiText, setPersonalityAiText] = useState('');
  const [strengthsAiText, setStrengthsAiText] = useState('');
  const [challengesAiText, setChallengesAiText] = useState('');
  const [situationsAiText, setSituationsAiText] = useState('');
  const [loadingSituationsAi, setLoadingSituationsAi] = useState(false);
  const [loadingChallengesAi, setLoadingChallengesAi] = useState(false);
  const [loadingStrengthsAi, setLoadingStrengthsAi] = useState(false);
  const [loadingPersonalityAi, setLoadingPersonalityAi] = useState(false);
  const [loadingOverviewAi, setLoadingOverviewAi] = useState(false);
  const [selectedDateOffset, setSelectedDateOffset] = useState(0);
  const [showMoonModal, setShowMoonModal] = useState(false);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + selectedDateOffset);
  const moonInfo = getMoonData(targetDate);

  const monthsGeo = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];
  const moonDateStr = `${targetDate.getDate()} ${monthsGeo[targetDate.getMonth()]}`;

  const isNewMoon = moonInfo?.phaseName?.includes('ახალმთვარეობა') || moonInfo?.illumination === 0;
  const isFullMoon = moonInfo?.phaseName?.includes('სავსემთვარეობა') || moonInfo?.illumination === 100;

  // ზუსტი ასტრონომიული გამოთვლა: მთვარე თითო ნიშანში რჩება ~2.28 დღე
  // საცნობარო თარიღი: 2026 წლის 18 სექტემბერი (მთვარე მშვილდოსანში - ინდექსი 8)
  const zodiacSigns = ['ვერძი', 'კურო', 'ტყუპები', 'კირჩხიბი', 'ლომი', 'ქალწული', 'სასწორი', 'მორიელი', 'მშვილდოსანი', 'თხის რქა', 'მერწყული', 'თევზები'];
  const zodiacIcons = [
    'zodiac-aries', 'zodiac-taurus', 'zodiac-gemini', 'zodiac-cancer',
    'zodiac-leo', 'zodiac-virgo', 'zodiac-libra', 'zodiac-scorpio',
    'zodiac-sagittarius', 'zodiac-capricorn', 'zodiac-aquarius', 'zodiac-pisces'
  ];

  const refDate = new Date(2026, 8, 18);
  const diffDays = Math.floor((targetDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
  let signIndex = (8 + Math.floor(diffDays / 2.28)) % 12;
  if (signIndex < 0) signIndex += 12;

  const currentSign = zodiacSigns[signIndex];
  const currentZodiacIcon = zodiacIcons[signIndex];

  // დინამიური პროცენტების გენერატორი (იცვლება ყოველდღე და ზოდიაქოს მიხედვით)
  const getDynamicPercent = (label) => {
    const today = new Date().toISOString().split('T')[0];
    const sign = zodiacSigns[signIndex] || '';
    const str = label + sign + today;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 70 + (Math.abs(hash) % 29); // აბრუნებს 70%-დან 98%-მდე
  };

  const percentages = [
    { label: 'ენერგია', val: getDynamicPercent('ენერგია'), color: '#ff4757', icon: 'flash' },
    { label: 'სიყვარული', val: getDynamicPercent('სიყვარული'), color: '#ff6b81', icon: 'heart' },
    { label: 'ფინანსები', val: getDynamicPercent('ფინანსები'), color: '#2ed573', icon: 'wallet' },
    { label: 'კარიერა', val: getDynamicPercent('კარიერა'), color: '#1e90ff', icon: 'briefcase' },
    { label: 'იღბალი', val: getDynamicPercent('იღბალი'), color: '#ffa502', icon: 'star' },
    { label: 'ინტუიცია', val: getDynamicPercent('ინტუიცია'), color: '#9b59b6', icon: 'eye' },
    { label: 'ჯანმრთელობა', val: getDynamicPercent('ჯანმრთელობა'), color: '#ff4757', icon: 'fitness' },
    { label: 'შემოქმედება', val: getDynamicPercent('შემოქმედება'), color: '#00cec9', icon: 'color-palette' }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, marginRight: 6 }}>♊</Text>
          <Text style={{ color: '#ffd700', fontSize: 14, fontWeight: 'bold' }}>@geminizodiacgeo</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/geminizodiacgeo')}>
            <Ionicons name="logo-facebook" size={20} color="#ffd700" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/geminizodiacgeo')}>
            <Ionicons name="logo-instagram" size={20} color="#ffd700" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.tiktok.com/@geminizodiacgeo')}>
            <Ionicons name="logo-tiktok" size={20} color="#ffd700" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/@geminizodiacgeo')}>
            <Ionicons name="logo-youtube" size={20} color="#ffd700" />
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB 1: მთავარი */}
      {activeTab === 'მთავარი' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 35 }}>
          
          {/* 1. დღის ჰოროსკოპი */}
          

          {/* 2. 8 ინდიკატორი (4 ზევით, 4 ქვევით) ხაზების გარეშე */}
          <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: "#ffd700", fontSize: 19, fontWeight: "bold" }]}>✨ ტყუპების ვარსკვლავური დღე</Text>
            <DailyHoroscopeCard />
            <View style={styles.indicatorsGrid}>
              {percentages.map((item, idx) => (
                <View key={idx} style={styles.indicatorBox}>
                  <Ionicons name={item.icon} size={18} color={item.color} style={{ marginBottom: 4 }} />
                  <Text style={{ color: '#fff', fontSize: 9, fontWeight: '600', textAlign: 'center', marginBottom: 2 }} numberOfLines={1}>{item.label}</Text>
                  <Text style={{ color: item.color, fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>{item.val}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 3. მთვარის ფაზა ზუსტი AI ნიშნებით და პროგნოზით */}
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.cardTitle} style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>🌙 მთვარის ფაზა ({moonDateStr})</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.dateNavBtn} onPress={() => setSelectedDateOffset(selectedDateOffset - 1)}>
                  <Ionicons name="chevron-back" size={18} color="#d4af37" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.dateNavBtn, { marginLeft: 6 }]} onPress={() => setSelectedDateOffset(selectedDateOffset + 1)}>
                  <Ionicons name="flash-outline" size={18} color="#d4af37" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.moon3dContainer}>
            <View style={styles.moonCircle}>
              <MaterialCommunityIcons name={moonInfo?.moonIcon || 'moon-full'} size={38} color="#d4af37" style={{ opacity: 0.9 }} />
              <View style={{ position: 'absolute', bottom: 3, right: 3, backgroundColor: '#070913', borderRadius: 10, padding: 2 }}>
                <MaterialCommunityIcons name={currentZodiacIcon} size={18} color="#ffd700" />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                {moonInfo?.phaseName ? moonInfo.phaseName.replace(/[🌑🌒🌓🌔🌕🌖🌗🌘]/g, '').trim() : 'მთვარის ფაზა'}
              </Text>
              <Text style={{ color: '#ffd700', fontSize: 14, fontWeight: '600', marginTop: 4 }}>
                📍 ნიშანი: {currentSign}
              </Text>
              <Text style={{ color: '#ccc', fontSize: 13, marginTop: 3 }}>
                განათება: {moonInfo?.illumination ?? '0'}%
              </Text>
            </View>
          </View>

            <Text style={[styles.bodyText, { marginTop: 12, fontStyle: 'italic', color: '#d4af37' }]}>
              "{moonInfo?.dailyPhrase || `მთვარე ${currentSign}ის ნიშანშია. ეს პერიოდი გავლენას ახდენს თქვენს ემოციურ ფონსა და შინაგან ინტუიციაზე.`}"
            </Text>

            {/* სავსემთვარეობის ან ახალმთვარეობის პროგნოზის ღილაკი */}
            {(isNewMoon || isFullMoon) && (
              <TouchableOpacity style={styles.moonForecastBtn} onPress={() => setShowMoonModal(true)}>
                <Ionicons name="sparkles" size={16} color="#070913" style={{ marginRight: 6 }} />
                <Text style={{ color: '#070913', fontWeight: 'bold', fontSize: 13 }}>
                  {isNewMoon ? '🌑 ახალმთვარეობის დეტალური პროგნოზი' : '🌕 სავსემთვარეობის დეტალური პროგნოზი'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}

      {/* Modal: ახალმთვარეობის / სავსემთვარეობის პროგნოზი */}
      <Modal visible={showMoonModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ color: '#d4af37', fontSize: 18, fontWeight: 'bold' }}>
                {isNewMoon ? '🌑 ახალმთვარეობის პროგნოზი' : '🌕 სავსემთვარეობის პროგნოზი'}
              </Text>
              <TouchableOpacity onPress={() => setShowMoonModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalItemTitle}>📅 თარიღი:</Text>
              <Text style={styles.modalItemText}>{moonDateStr}, 2026</Text>

              <Text style={styles.modalItemTitle}>📍 ზოდიაქოს ნიშანი:</Text>
              <Text style={styles.modalItemText}>{currentSign}</Text>

              <Text style={styles.modalItemTitle}>⚡ მთავარი ენერგია:</Text>
              <Text style={styles.modalItemText}>მენტალური განახლება, ახალი კონტაქტები, იდეების თავისუფალი ნაკადი და ინფორმაციის სწრაფი დამუშავება.</Text>

              <Text style={styles.modalItemTitle}>🔍 რა თემები გააქტიურდება / გამოვა წინა პლანზე:</Text>
              <Text style={styles.modalItemText}>სასწავლო პროცესები, მოკლე მგზავრობები, კომუნიკაცია, დოკუმენტაციასთან მუშაობა და სოციალური კავშირები.</Text>

              <Text style={styles.modalItemTitle}>💖 სიყვარული და ურთიერთობები:</Text>
              <Text style={styles.modalItemText}>გულწრფელი საუბრები და პარტნიორთან აზრების გაზიარება განმუხტავს ყოველგვარ დაძაბულობას.</Text>

              <Text style={styles.modalItemTitle}>💼 საქმე და კარიერა:</Text>
              <Text style={styles.modalItemText}>შესანიშნავი დროა ახალი იდეების პრეზენტაციისთვის, მოლაპარაკებებისა და შეთანხმებების მისაღწევად.</Text>

              <Text style={styles.modalItemTitle}>💰 ფინანსები:</Text>
              <Text style={styles.modalItemText}>მოსალოდნელია ახალი ინფორმაცია შემოსავლის ალტერნატიულ წყაროებზე, თუმცა მოერიდეთ ნაჩქარევ ხარჯებს.</Text>

              <Text style={styles.modalItemTitle}>🌊 ემოციური მდგომარეობა:</Text>
              <Text style={styles.modalItemText}>დინამიკური და ცვალებადი, შესაძლებელია მცირედი გაფანტულობა მრავალი პარალელური საქმის გამო.</Text>

              <Text style={styles.modalItemTitle}>⭐ მთავარი რჩევა და გზავნილი:</Text>
              <Text style={styles.modalItemText}>ენდეთ ინტუიციას, იყავით მოქნილი და ღია ახალი შესაძლებლობებისთვის!</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      


      {/* TAB 2: ჰოროსკოპი */}
      
      
      
      
      {activeTab === 'ტყუპები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text style={{ color: '#d4af37', fontSize: 18, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' }}>♊ ტყუპების სამყარო</Text>
          <Text style={{ color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>ხასიათი, ენერგია და ასტროლოგიური პორტრეტი</Text>

          
      {/* ♊ ზოგადი მიმოხილვის ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setOverviewModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>♊ ზოგადი მიმოხილვა</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={overviewModalVisible} animationType="fade" transparent={true} onRequestClose={() => setOverviewModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>♊ ზოგადი მიმოხილვა</Text>
            <ScrollView>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left" }}>{`ტყუპები ზოდიაქოს მესამე ნიშანია და ჰაერის სტიქიას მიეკუთვნება. მისი მმართველი პლანეტაა მერკური - პლანეტა, რომელიც ასტროლოგიაში აზროვნებას, სიტყვას, ინფორმაციის გაცვლასა და სწავლის პროცესს უკავშირდება.

ტყუპების მთავარი თემა არის ცნობისმოყვარეობა და მოძრაობა. მათთვის მნიშვნელოვანია ახალი ინფორმაციის მიღება, სხვადასხვა ადამიანთან ურთიერთობა, ახალი იდეების აღმოჩენა და გარემოს შეცვლა. ერთფეროვნება და მუდმივი რუტინა კი ხშირად ნაკლებად საინტერესო ხდება.

ტყუპებს ხშირად აქვთ უნარი, ერთ საკითხს რამდენიმე განსხვავებული მხრიდან შეხედონ. სწორედ ამიტომ შეიძლება მათში ერთდროულად რამდენიმე ინტერესი, იდეა ან განსხვავებული შეხედულება არსებობდეს. მათთვის ბუნებრივია კითხვების დასმა, ინფორმაციის მოძიება და საკუთარი აზრის გადახედვა მაშინ, როცა ახალ რამეს აღმოაჩენენ.

ამ ნიშნის კიდევ ერთი მნიშვნელოვანი მახასიათებელია მოქნილობა. ტყუპებს შეუძლიათ სწრაფად მოერგონ ახალ გარემოსა და ადამიანებს. ისინი ადვილად ერთვებიან სხვადასხვა ტიპის საქმიანობაში და განსაკუთრებით მაშინ გრძნობენ თავს კომფორტულად, როცა აქვთ თავისუფლება, არჩევანის შესაძლებლობა და განვითარების სივრცე.

ტყუპების სიმბოლო - ♊ - ორ ტყუპს წარმოადგენს. ეს სიმბოლო ხშირად უკავშირდება მრავალფეროვნებას, ორ განსხვავებულ ხედვას და ერთმანეთისგან განსხვავებული მხარეების თანაარსებობას. სწორედ ამიტომ ტყუპების ბუნებაში ხშირად გვხვდება კონტრასტებიც - ერთ დღეს შეიძლება ერთი რამ აინტერესებდეთ, მეორე დღეს კი სრულიად ახალი მიმართულება აღმოაჩინონ.

ტყუპები მხოლოდ „საუბრის მოყვარული“ ნიშანი არაა. მისი არსი ბევრად უფრო ფართოა: ინფორმაცია, ცოდნა, ცნობისმოყვარეობა, მოძრაობა, ახალი გამოცდილება და ადამიანებთან კავშირი - ეს ყველაფერი ამ ნიშნის საერთო სურათის მნიშვნელოვანი ნაწილია.`}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setOverviewModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🧠 პიროვნება და ხასიათის ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setPersonalityModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>🧠 პიროვნება და ხასიათი</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={personalityModalVisible} animationType="fade" transparent={true} onRequestClose={() => setPersonalityModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>🧠 პიროვნება და ხასიათი</Text>
            <ScrollView>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left" }}>{`ტყუპების პიროვნებაში ყველაზე მეტად იგრძნობა ცოცხალი გონება, ცნობისმოყვარეობა და მუდმივი სურვილი, რაღაც ახალი გაიგოს. მათ იშვიათად აკმაყოფილებთ მხოლოდ ერთი პასუხი - ხშირად სურთ, საკითხს სხვადასხვა მხრიდან შეხედონ, კითხვები დასვან და საკუთარი აზრი თავად ჩამოაყალიბონ.

ტყუპები ადამიანებთან ურთიერთობაში, როგორც წესი, თავისუფალი და ბუნებრივია. მათთვის საინტერესო ადამიანებთან საუბარი მხოლოდ დროის გატარება კი არა - ახალი იდეების, გამოცდილებისა და ინფორმაციის მიღების ერთ-ერთი გზაა. ხშირად შეუძლიათ ძალიან განსხვავებულ ადამიანებთან საერთო ენის გამონახვა და სიტუაციის მიხედვით საკუთარი ქცევის მორგება.

მათთვის მნიშვნელოვანია მრავალფეროვნება. ახალი გარემო, საინტერესო საუბარი, განსხვავებული ადამიანები და ახალი საქმიანობა სწრაფად იპყრობს მათ ყურადღებას. სწორედ ამიტომ ტყუპებს შეიძლება ერთდროულად რამდენიმე რამ აინტერესებდეთ და ერთი მიმართულებიდან მეორეზე საკმაოდ მარტივად გადავიდნენ.

ტყუპების ხასიათში ხშირად არის მსუბუქი, იუმორისტული და თამაშის მოყვარული მხარეც. მათ შეუძლიათ სერიოზულ სიტუაციაშიც კი იპოვონ ისეთი სიტყვა ან დეტალი, რომელიც დაძაბულობას შეამსუბუქებს. თუმცა ეს არ ნიშნავს, რომ ყველაფერს ზედაპირულად უყურებენ - უბრალოდ ხშირად ემოციებთან გამკლავების საკუთარი, უფრო გონებრივი და სიტყვიერი გზა აქვთ.

მათში შეიძლება ერთმანეთისგან განსხვავებული მხარეებიც თანაარსებობდეს. ზოგჯერ ძალიან აქტიურები და კომუნიკაბელურები არიან, ზოგჯერ კი უბრალოდ საკუთარი სივრცე და სიმშვიდე სჭირდებათ. შეიძლება რაღაცით ძლიერ იყვნენ დაინტერესებული და შემდეგ მოულოდნელად სხვა საკითხმა მიიპყროს მათი ყურადღება. ეს ცვლილება ყოველთვის არ ნიშნავს არასტაბილურობას - ხშირად უბრალოდ მათი ინტერესები და აზრები სწრაფად მოძრაობს.

ტყუპებისთვის განსაკუთრებით მნიშვნელოვანია თავისუფლების შეგრძნება. როცა მათ არ აიძულებენ მუდმივად ერთი მიმართულებით იარონ და აქვთ შესაძლებლობა, იფიქრონ, შეცვალონ, ისწავლონ და ახალი რამ სცადონ, მათი ბუნებრივი ენერგია ბევრად უკეთ ვლინდება.

ამ ნიშნის ხასიათის ერთ-ერთი მთავარი თავისებურება სწორედ ეს მრავალფეროვნებაა - ტყუპები შეიძლება ერთი შეხედვით მარტივი და მსუბუქი ჩანდეს, მაგრამ მის შიგნით ხშირად გაცილებით მეტი სიღრმე, ინტერესი და განსხვავებული ხედვაა, ვიდრე გარედან ჩანს.`}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setPersonalityModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* ⚡ ძლიერი მხარეების ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setStrengthsModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>⚡ ძლიერი მხარეები</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={strengthsModalVisible} animationType="fade" transparent={true} onRequestClose={() => setStrengthsModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>⚡ ძლიერი მხარეები</Text>
            <ScrollView>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left" }}>{`ტყუპების ერთ-ერთი ყველაზე გამორჩეული ძალა სწრაფი აზროვნებაა. მათ შეუძლიათ ახალი ინფორმაციის სწრაფად აღქმა, ერთმანეთთან სხვადასხვა იდეის დაკავშირება და საჭირო მომენტში სწორი გამოსავლის მოძებნა.

ცნობისმოყვარეობა მათ მუდმივად უბიძგებს, რაღაც ახალი ისწავლონ. ტყუპებს იშვიათად სურთ მხოლოდ ერთი სფეროთი შემოიფარგლონ - მათ შეიძლება ერთდროულად აინტერესებდეთ სრულიად განსხვავებული თემები და სწორედ ეს მრავალფეროვანი ინტერესები აძლევს მათ ფართო ხედვას.

მოქნილობა კიდევ ერთი მნიშვნელოვანი ძლიერი მხარეა. როცა გარემო ან გეგმები იცვლება, ტყუპებს ხშირად შეუძლიათ სწრაფად მოერგონ ახალ სიტუაციას და ახალი შესაძლებლობა დაინახონ იქ, სადაც სხვებისთვის მხოლოდ ცვლილებაა.

ადაპტაციის უნარი განსაკუთრებით კარგად ჩანს ადამიანებთან ურთიერთობაში. მათ შეუძლიათ სხვადასხვა ხასიათისა და შეხედულების მქონე ადამიანებთან საერთო ენის პოვნა და სიტუაციის შესაბამისად საკუთარი მიდგომის შეცვლა.

ტყუპებს აქვთ კარგი იუმორის გრძნობა და სიტუაციის მსუბუქად წარმოჩენის უნარი. მათ შეუძლიათ რთულ ან უხერხულ მომენტშიც კი ისეთი სიტყვა იპოვონ, რომელიც გარემოს შეცვლის.

მათი ძლიერი მხარეა ასევე სწრაფად სწავლა და ინფორმაციის დამუშავება. ახალი ცოდნის მიღებისას ტყუპები ხშირად არა მხოლოდ იმახსოვრებენ ინფორმაციას, არამედ ცდილობენ გაიგონ, როგორ შეიძლება მისი გამოყენება.

იდეების გენერირება მათთვის ბუნებრივი პროცესია. ერთი იდეა შეიძლება მეორეს დაუკავშირონ და სრულიად ახალი მიმართულება იპოვონ. სწორედ ამიტომ მათ ხშირად კარგად გამოსდით ისეთი საქმიანობა, სადაც საჭიროა კრეატიულობა, მრავალფეროვანი აზროვნება და სწრაფი რეაქცია.

და ბოლოს, ტყუპების ერთ-ერთი მნიშვნელოვანი ძალა გონებრივი თავისუფლებაა - მათ უყვართ საკუთარი აზრის ქონა, კითხვების დასმა და უკვე მიღებული შეხედულებების გადახედვაც კი, თუ ახალი ინფორმაცია სხვაგვარად დააფიქრებს.`}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setStrengthsModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* ⚠️ გამოწვევების ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setChallengesModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>⚠️ გამოწვევები</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={challengesModalVisible} animationType="fade" transparent={true} onRequestClose={() => setChallengesModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>⚠️ გამოწვევები</Text>
            <ScrollView>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left" }}>{`ტყუპების ძლიერი მხარეები ზოგჯერ მათივე გამოწვევადაც შეიძლება იქცეს. ბევრი ინტერესი და იდეა ერთდროულად შეიძლება ჰქონდეთ, რის გამოც ერთ კონკრეტულ საქმეზე დიდხანს კონცენტრირება გაუჭირდეთ. ახალი შესაძლებლობა ხშირად უფრო საინტერესო ჩანს, ვიდრე ის საქმე, რომელსაც უკვე აკეთებენ.

ერთ-ერთი გავრცელებული გამოწვევაა ინტერესის სწრაფად დაკარგვა. როცა რაღაც აღარ არის ახალი, საინტერესო ან გონებრივად მასტიმულირებელი, მოტივაცია შეიძლება შესამჩნევად შეუმცირდეთ. ამის გამო ზოგჯერ დაწყებული საქმეების ბოლომდე მიყვანა უფრო რთული ხდება.

ტყუპებს ასევე შეიძლება გაუჭირდეთ გადაწყვეტილების საბოლოოდ მიღება. როცა რამდენიმე ვარიანტში სხვადასხვა დადებით მხარეს ხედავენ, არჩევანის გაკეთება მარტივი აღარ არის. ზოგჯერ უკვე მიღებულ გადაწყვეტილებასაც უბრუნდებიან და თავიდან აანალიზებენ.

ზედმეტი ფიქრი კიდევ ერთი შესაძლო გამოწვევაა. ინფორმაციის სწრაფად მიღებასთან ერთად შეიძლება გაჩნდეს სურვილი, ყველაფერი გააანალიზონ, ყველა ვარიანტი განიხილონ და ყველა შესაძლო შედეგი წინასწარ წარმოიდგინონ.

მრავალფეროვნების სიყვარული ზოგჯერ გაფანტულობაშიც გადაიზრდება. რამდენიმე საქმე, იდეა ან გეგმა ერთდროულად შეიძლება დაიწყოს, მაგრამ ყურადღების გადატანამ ზოგი მათგანი მეორე პლანზე დატოვოს.

ტყუპებისთვის შეიძლება რთული იყოს ერთფეროვნებასთან შეგუებაც. მუდმივად ერთი და იგივე გარემო, განმეორებადი დავალებები და ცვლილებების ნაკლებობა მათ მოტივაციაზე ხშირად აისახება.

კიდევ ერთი გამოწვევაა შინაგანი წინააღმდეგობა. ზოგჯერ მათ ერთდროულად შეიძლება სურდეთ ორი განსხვავებული რამ - მაგალითად, ცვლილებაც და სტაბილურობაც, ადამიანებთან ყოფნაც და საკუთარი სივრცეც. ასეთ დროს საკუთარ სურვილებში გარკვევას მეტი დრო სჭირდება.

ზოგჯერ ტყუპები ცდილობენ ემოციურ მდგომარეობას ფიქრითა და ანალიზით გაუმკლავდნენ. ყველაფრის სიტყვებში მოქცევა და ახსნა ყოველთვის არ არის საკმარისი, ამიტომ მათთვის მნიშვნელოვანი შეიძლება იყოს არა მხოლოდ იმის გააზრება, რას გრძნობენ, არამედ თავად ემოციის მიღებაც.

ამ გამოწვევების მთავარი საკითხი ტყუპებისთვის არის საკუთარი მრავალფეროვანი ინტერესების ისე მართვა, რომ თავისუფლება არ გადაიზარდოს ქაოსში, ხოლო ცნობისმოყვარეობამ დაწყებული საქმეების დასრულებას ხელი არ შეუშალოს.`}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setChallengesModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* 💬 კომუნიკაციის ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setCommunicationModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>💬 კომუნიკაცია</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={communicationModalVisible} animationType="fade" transparent={true} onRequestClose={() => setCommunicationModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>💬 კომუნიკაცია</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის კომუნიკაცია ადამიანებთან დაკავშირების, ახალი ინფორმაციის მიღებისა და საკუთარი აზრების გაზიარების ერთ-ერთი მთავარი გზაა. მათ ხშირად იზიდავთ საინტერესო დიალოგი, ახალი თემები და ადამიანები, რომლებთანაც თავისუფლად შეუძლიათ საუბარი.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• საუბრის სტილი</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპები ხშირად სწრაფად აზროვნებენ და საუბარშიც სწრაფი ტემპი აქვთ. შეუძლიათ ერთი თემიდან მეორეზე მარტივად გადავიდნენ, განსაკუთრებით მაშინ, როცა რამდენიმე საკითხი ერთდროულად აინტერესებთ. მათთვის საუბარი უფრო საინტერესო ხდება, როცა ის ცოცხალი და მრავალფეროვანია.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• კითხვების დასმა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მათ ბუნებრივად უჩნდებათ კითხვები. როდესაც რაღაც აინტერესებთ, მხოლოდ ზედაპირული პასუხი ხშირად არ აკმაყოფილებთ და ცდილობენ მეტი დეტალი გაიგონ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• სხვადასხვა ადამიანთან ურთიერთობა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად შეუძლიათ განსხვავებული ხასიათის ადამიანებთან საუბრის სტილის შეცვლა. ერთთან შეიძლება იუმორით ისაუბრონ, მეორესთან - სერიოზულად და საქმიანად. მათთვის მნიშვნელოვანია თანამოსაუბრის „დაჭერა“ და საუბრის შესაბამის ტონზე გადაყვანა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• მოსმენა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                როცა თემა ნამდვილად აინტერესებთ, ყურადღებით უსმენენ და საუბარში აქტიურად ერთვებიან. თუმცა ერთფეროვანმა ან ხანგრძლივმა საუბარმა შეიძლება ყურადღება მარტივად გადაატანინოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• იუმორი</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                სიტყვებით თამაში, ირონია, სწრაფი პასუხი და სიტუაციის მსუბუქად წარმოჩენა ტყუპების კომუნიკაციაში ხშირად ბუნებრივად ჩნდება. იუმორი მათთვის შეიძლება არა მხოლოდ გართობის, არამედ ადამიანთან დაახლოების საშუალებაც იყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• დისკუსია და კამათი</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                განსხვავებული აზრი მათთვის ყოველთვის კონფლიქტს არ ნიშნავს. პირიქით, საინტერესო არგუმენტებმა შეიძლება კიდევ უფრო ჩართოს საუბარში. მათ უყვართ აზრების გაცვლა და საკუთარი პოზიციის ახსნა, თუმცა კამათის დროს სიტყვების სისწრაფემ ან ზედმეტმა არგუმენტირებამ შეიძლება მეორე ადამიანს გადაღლაც გამოიწვიოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა სათქმელი აქვთ</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად ურჩევნიათ საკითხზე საუბარი, ვიდრე მისი დიდხანს საკუთარ თავში დატოვება. მათთვის სიტყვებით ახსნა შეიძლება სიტუაციის გააზრების ერთ-ერთი გზაც იყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა კომუნიკაცია აღარ აინტერესებთ</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                თუ საუბარი მათთვის მოსაწყენი გახდა ან ურთიერთობაში აღარ ხედავენ გულწრფელ ინტერესს, შეიძლება თანდათან ნაკლებად ჩაერთონ. ზოგჯერ ეს გარედან მოულოდნელ დისტანცირებადაც ჩანს.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginTop: 8 }}>
                ტყუპების კომუნიკაციის მთავარი თავისებურება არის ცოცხალი გონება, სიტყვების მოქნილი გამოყენება და მუდმივი ინტერესის მოთხოვნილება. მათთვის კარგი საუბარი ისაა, რომლის დასრულების შემდეგაც კიდევ ერთი საინტერესო კითხვა ჩნდება.
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setCommunicationModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* 💖 სიყვარული და ურთიერთობები ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setLoveModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>💖 სიყვარული და ურთიერთობები</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={loveModalVisible} animationType="fade" transparent={true} onRequestClose={() => setLoveModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>💖 სიყვარული და ურთიერთობები</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის სიყვარული მხოლოდ ძლიერი ემოცია არაა - მათთვის ურთიერთობაში მნიშვნელოვანია გონებრივი კავშირიც. პარტნიორთან საუბარი, ერთმანეთის გაგება, საერთო ინტერესები და თავისუფლად აზრების გაცვლა ხშირად ისეთივე მნიშვნელოვანია, როგორც ემოციური სიახლოვე.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როგორ უყვარდებათ</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად იზიდავთ ადამიანი, რომელიც საინტერესოა როგორც პიროვნულად, ისე გონებრივად. კარგი საუბარი, იუმორი, განსხვავებული აზრები და ახალი გამოცდილებები შეიძლება მათში ინტერესის გაჩენის მნიშვნელოვანი მიზეზი გახდეს.

მხოლოდ გარეგნული მიმზიდველობა ყოველთვის საკმარისი არ არის - მათ სურთ, პარტნიორთან ურთიერთობა არასოდეს გახდეს მოსაწყენი.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რას აფასებენ პარტნიორში</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მათთვის მნიშვნელოვანია გულწრფელობა, იუმორი, გონებრივი მოქნილობა და ერთმანეთის პირადი სივრცის პატივისცემა. პარტნიორი, რომელთანაც შეუძლიათ იყვნენ საკუთარ თავებად და თავისუფლად ისაუბრონ, მათთვის განსაკუთრებით მიმზიდველია.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როგორ გამოხატავენ სიყვარულს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებმა შეიძლება სიყვარული სიტყვებით, ყურადღებით, იუმორით, საინტერესო საუბრებითა და ერთად გატარებული დროით გამოხატონ. მათთვის საყვარელ ადამიანთან ახალი ადგილების აღმოჩენა, რაღაცის ერთად სწავლა ან უბრალოდ საათობით საუბარიც სიყვარულის გამოხატვის ფორმა შეიძლება იყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• ურთიერთობაში თავისუფლება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის მნიშვნელოვანია, რომ ურთიერთობამ მათი პირადი სივრცე მთლიანად არ შეზღუდოს. მათ სჭირდებათ საკუთარი ინტერესების, მეგობრებისა და საქმიანობის შენარჩუნების შესაძლებლობა. თავისუფლების მოთხოვნილება აუცილებლად არ ნიშნავს დისტანციას - ხშირად ეს მათთვის ჯანსაღი ურთიერთობის ნაწილია.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა ურთიერთობა მოსაწყენი ხდება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ერთფეროვნებამ შეიძლება მათი ინტერესი შეამციროს. თუ ურთიერთობაში აღარ არის საუბარი, ახალი გამოცდილება ან ერთმანეთის მიმართ ცნობისმოყვარეობა, ტყუპებმა შეიძლება იგრძნონ, რომ რაღაც აკლიათ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• კონფლიქტის დროს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ხშირად ცდილობენ პრობლემის სიტყვიერად გარკვევას. შეიძლება ბევრი ილაპარაკონ, დასვან კითხვები და სხვადასხვა კუთხიდან განიხილონ სიტუაცია. თუმცა ემოციურად დაძაბულ მომენტში ზედმეტმა ანალიზმა შეიძლება პრობლემის მოგვარება უფრო გაართულოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა ნდობა ირღვევა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის მნიშვნელოვანია არა მხოლოდ ის, რა მოხდა, არამედ რამდენად გულწრფელად ესაუბრება პარტნიორი მომხდარზე. ნდობის აღდგენა ხშირად მოითხოვს ღია საუბარს, პასუხებს და თანმიმდევრულ ქცევას.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რა აძლიერებს ურთიერთობას</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                საერთო ინტერესები, გულწრფელი საუბარი, იუმორი, ერთმანეთის თავისუფლების პატივისცემა და ახალი გამოცდილებების ერთად მიღება. ტყუპებისთვის ურთიერთობა განსაკუთრებით საინტერესო ხდება მაშინ, როცა პარტნიორი მხოლოდ საყვარელი ადამიანი კი არა, საინტერესო თანამოსაუბრეც და ცხოვრების თანამგზავრიც არის.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 15, fontWeight: "bold", lineHeight: 24, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                ტყუპების სიყვარულის მთავარი იდეა შეიძლება ასე ჩამოვაყალიბოთ: „გიყვარდე, მესაუბრე, გამიგე და დამიტოვე სივრცე, ვიყო საკუთარი თავი.“
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setLoveModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* 🤝 მეგობრობა ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setFriendshipModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>🤝 მეგობრობა</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={friendshipModalVisible} animationType="fade" transparent={true} onRequestClose={() => setFriendshipModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>🤝 მეგობრობა</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის მეგობრობა პირველ რიგში საინტერესო ადამიანთან კავშირს ნიშნავს. მათ იზიდავთ ადამიანები, რომლებთანაც შეუძლიათ თავისუფლად საუბარი, სიცილი, ახალი თემების აღმოჩენა და ერთმანეთისგან რაღაცის სწავლა. მათთვის მეგობრობა მხოლოდ ერთად ყოფნა კი არა, საერთო გამოცდილებების დაგროვებაცაა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როგორი მეგობარია ტყუპები</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპები ხშირად მხიარული, აქტიური და კომუნიკაბელური მეგობარია. შეუძლიათ მეგობარი კარგ ხასიათზე დააყენონ, მოულოდნელად საინტერესო გეგმა შესთავაზონ ან უბრალოდ მოუსმინონ და პრობლემის სხვაგვარად დანახვაში დაეხმარონ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როგორ ირჩევენ მეგობრებს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მათთვის მნიშვნელოვანია ადამიანის პიროვნება. იზიდავთ ცნობისმოყვარე, გახსნილი და საინტერესო ადამიანები, რომლებთანაც ურთიერთობა ბუნებრივად ვითარდება. ასაკი, სტატუსი ან გარეგნული განსხვავებები ნაკლებად მნიშვნელოვანია, თუ ადამიანთან კარგი კავშირი იგრძნობა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რას აფასებენ მეგობარში</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                გულწრფელობას, იუმორს, ერთგულებას, თავისუფლებას და ინტერესს ურთიერთობაში. მათთვის სასიამოვნოა მეგობარი, რომელთანაც შეუძლიათ როგორც სერიოზულ თემებზე საუბარი, ისე სრულიად უაზრო საკითხებზე სიცილი.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როგორ ინარჩუნებენ მეგობრობას</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს უყვართ ურთიერთობის ცოცხლად შენარჩუნება - შეტყობინებები, ზარები, შეხვედრები, საერთო გეგმები და ახალი გამოცდილებები. ზოგჯერ შეიძლება დიდი ხნის განმავლობაში არ გამოჩნდნენ, მაგრამ დაბრუნების შემდეგ ურთიერთობა ისე გააგრძელონ, თითქოს დიდი პაუზა არც ყოფილა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა მეგობარს დახმარება სჭირდება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                შეიძლება დახმარება მხოლოდ ემოციური თანადგომით არ გამოხატონ. ხშირად ცდილობენ სიტუაციაში გამოსავალი იპოვონ, სხვადასხვა ვარიანტი შესთავაზონ ან მეგობარს პრობლემა სხვა კუთხით დაანახონ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• უთანხმოების დროს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად ურჩევნიათ პრობლემაზე საუბარი, ვიდრე წყენის ჩუმად დაგროვება. შეიძლება ბევრი კითხვა დასვან და საკუთარი პოზიცია დეტალურად ახსნან. თუ საუბარი შეუძლებელი ხდება, შესაძლოა დროებით დისტანცია აირჩიონ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რამ შეიძლება გააფუჭოს მეგობრობა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ღალატმა, ტყუილმა, ზედმეტმა კონტროლმა ან ურთიერთობის მუდმივმა შეზღუდვამ შეიძლება მათში ნდობა მნიშვნელოვნად შეამციროს. ასევე რთულია მათთვის ისეთი მეგობრობა, სადაც მუდმივად ერთსა და იმავე წრეზე ტრიალებენ და ურთიერთობაში სიახლე აღარ რჩება.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 15, fontWeight: "bold", lineHeight: 24, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                ტყუპებისთვის კარგი მეგობრობა არის ურთიერთობა, სადაც შეგიძლია იყო საკუთარი თავი, ილაპარაკო ყველაფერზე, იხუმრო, ისწავლო, ერთად რაღაც ახალი სცადო და ამავდროულად იცოდე, რომ საჭირო მომენტში შენი მეგობარი შენს გვერდით იქნება.
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setFriendshipModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* 💼 კარიერა და სამუშაო ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setCareerModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>💼 კარიერა და სამუშაო</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={careerModalVisible} animationType="fade" transparent={true} onRequestClose={() => setCareerModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>💼 კარიერა და სამუშაო</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებისთვის სამუშაო მხოლოდ სტაბილური შემოსავლის წყარო არაა - მნიშვნელოვანია, რომ საქმიანობა მათთვის საინტერესო იყოს და განვითარების, სწავლისა და ახალი გამოცდილების მიღების შესაძლებლობას აძლევდეს. ერთფეროვან გარემოში, სადაც ყოველდღე ერთი და იგივე საქმე მეორდება, მათი მოტივაცია შეიძლება დროთა განმავლობაში შემცირდეს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• სამუშაო სტილი</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად მოსწონთ დინამიკური გარემო, სადაც რამდენიმე ტიპის დავალებასთან აქვთ შეხება. მათთვის საინტერესოა ახალი ინფორმაციის მოძიება, პრობლემების გადაჭრა, იდეების მოფიქრება და ისეთი სამუშაო, რომელიც მუდმივ გონებრივ ჩართულობას მოითხოვს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რა აძლევს მოტივაციას</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ახალი ცოდნა, საინტერესო ამოცანები, მრავალფეროვნება და შესაძლებლობა, საკუთარი იდეები გამოიყენონ. როცა ხედავენ, რომ მათი აზრი ფასობს და შეუძლიათ რაღაცის გაუმჯობესება, მუშაობისადმი ინტერესიც უფრო იზრდება.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• რუტინა და ერთფეროვნება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მუდმივად განმეორებადი დავალებები შეიძლება მათთვის დამღლელი აღმოჩნდეს. ეს არ ნიშნავს, რომ რუტინულ სამუშაოს ვერ შეასრულებენ, თუმცა ხშირად უკეთ მუშაობენ მაშინ, როცა ყოველდღიურობაში გარკვეული ცვლილება და ახალი გამოწვევაც არსებობს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• გუნდში მუშაობა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად კარგად გამოსდით გუნდური გარემო, განსაკუთრებით მაშინ, როცა იდეების გაცვლა და ერთმანეთთან თანამშრომლობა შესაძლებელია. მათ შეუძლიათ სხვადასხვა ადამიანის მოსაზრებების მოსმენა და ახალი იდეების ერთმანეთთან დაკავშირება.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• ცვლილებებთან დამოკიდებულება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ახალი სამუშაო, ახალი პროექტი ან შეცვლილი პირობები მათთვის ყოველთვის საფრთხე არ არის. პირიქით, ცვლილებამ შეიძლება ახალი ინტერესიც გაუჩინოს. მათთვის მნიშვნელოვანია, რომ ცვლილებასთან ერთად განვითარების შესაძლებლობაც დაინახონ.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• პროფესიული ძლიერი მხარეები</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                სწრაფი აზროვნება, ინფორმაციის მოძიება და დამუშავება, მოქნილობა, მრავალფეროვან ამოცანებთან მუშაობა, იდეების გენერირება და სხვადასხვა სიტუაციასთან ადაპტაცია.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• შესაძლო სირთულე</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ერთდროულად ბევრი საქმის დაწყებამ შეიძლება ყურადღება გაუფანტოს. თუ რამდენიმე საინტერესო პროექტი ერთად გამოჩნდა, მთავარი გამოწვევა შეიძლება გახდეს პრიორიტეტების სწორად განსაზღვრა და დაწყებული საქმეების ბოლომდე მიყვანა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• სფეროები, რომლებიც შეიძლება განსაკუთრებით საინტერესო აღმოჩნდეს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                კომუნიკაცია, მედია, ჟურნალისტიკა, მარკეტინგი, რეკლამა, სოციალური მედია, განათლება, გაყიდვები, ტურიზმი, ტექნოლოგიები, მწერლობა, თარგმნა და სხვა სფეროები, სადაც საჭიროა ინფორმაციის სწრაფად დამუშავება, ადამიანებთან ურთიერთობა და მრავალფეროვან ამოცანებთან მუშაობა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 15, fontWeight: "bold", lineHeight: 24, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                ტყუპებისთვის კარიერული კომფორტი ხშირად იქმნება მაშინ, როცა სამუშაო მათ გონებრივად აინტერესებს, აძლევს მოძრაობისა და განვითარების საშუალებას და არ აიძულებს მუდმივად ერთსა და იმავე ჩარჩოში დარჩენას.
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setCareerModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* ☿ მმართველი პლანეტა - მერკური ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setMercuryModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>☿ მმართველი პლანეტა - მერკური</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={mercuryModalVisible} animationType="fade" transparent={true} onRequestClose={() => setMercuryModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>☿ მმართველი პლანეტა</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების მმართველი პლანეტაა მერკური - ასტროლოგიაში გონების, აზროვნების, კომუნიკაციის, ინფორმაციისა და სწავლის სიმბოლო. სწორედ მერკურის გავლენით უკავშირებენ ტყუპებს სწრაფ აზროვნებას, ცნობისმოყვარეობას და ახალი ინფორმაციის მუდმივ ძიებას.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მერკური ასტროლოგიაში გვიჩვენებს, როგორ ვაზროვნებთ, როგორ ვსწავლობთ, როგორ ვამუშავებთ ინფორმაციას და როგორ ვუზიარებთ ჩვენს აზრებს სხვებს. ტყუპების შემთხვევაში ეს ენერგია განსაკუთრებით ძლიერად არის გამოხატული, რადგან ნიშნის ბუნებაც სწორედ ცოდნისა და ინფორმაციის გაცვლასთან არის დაკავშირებული.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპებს ხშირად აინტერესებთ ბევრი სხვადასხვა საკითხი. მერკურის გავლენა მათ უბიძგებს კითხვების დასმისკენ, ახალი ინფორმაციის მოძიებისკენ და მიღებული ცოდნის სხვებთან გაზიარებისკენ. ამიტომ მათთვის მნიშვნელოვანია არა მხოლოდ ინფორმაციის მიღება, არამედ მასზე საუბარი და სხვადასხვა აზრის მოსმენა.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მერკურის ცვალებადი ბუნება ასევე კარგად ერგება ტყუპების მოქნილობას. მათ შეუძლიათ შეხედულების გადახედვა, ახალი ინფორმაციის მიღების შემდეგ აზრის შეცვლა და სხვადასხვა სიტუაციასთან სწრაფად ადაპტირება.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ამ პლანეტის გავლენა მხოლოდ საუბარს არ ეხება. ის დაკავშირებულია აზროვნებასთან, კითხვასთან, წერასთან, სწავლასთან, ანალიზთან, ინფორმაციის გაცვლასთან და ყოველდღიურ გადაწყვეტილებებთან - სწორედ ამიტომ მერკურის როლი ტყუპების ასტროლოგიურ ბუნებაში ერთ-ერთი ყველაზე მნიშვნელოვანი თემაა.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მოკლედ, თუ ტყუპების ბუნება ერთ სიტყვაში უნდა გადმოვცეთ, მერკურის სიმბოლური გავლენა მასში შეიძლება ასე გამოიხატოს:
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", lineHeight: 26, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                „იფიქრე, იკითხე, გაიგე, ისწავლე და გაუზიარე სხვებს.“
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setMercuryModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* ♊ სიმბოლიკა და მითოლოგია ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setSymbolismModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>♊ სიმბოლიკა და მითოლოგია</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={symbolismModalVisible} animationType="fade" transparent={true} onRequestClose={() => setSymbolismModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>♊ სიმბოლიკა და მითოლოგია</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების სიმბოლოა ♊ - ორი ერთმანეთის გვერდით მდგომი ფიგურა, რომელიც ტყუპების იდეას, ორმაგობასა და ორი განსხვავებული მხარის თანაარსებობას გამოხატავს. ეს ნიშანი ზოდიაქოს მესამე ნიშანია და დასავლურ ასტროლოგიაში მას ტყუპების თანავარსკვლავედთან აკავშირებენ.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების მითოლოგიური ისტორია ყველაზე ხშირად დაკავშირებულია ბერძნულ მითოლოგიაში კასტორსა და პოლუქსთან, რომლებიც „დიოსკურების“ სახელითაც არიან ცნობილი. ისინი ტყუპი ძმები იყვნენ, თუმცა მათი წარმოშობის ისტორია ერთმანეთისგან განსხვავდებოდა.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მითის მიხედვით, მათი დედა იყო ლედა - სპარტის დედოფალი. ერთ-ერთი ვერსიის მიხედვით, იმავე ღამეს ლედას ზევსიც და მისი მეუღლე, სპარტის მეფე ტინდარეოსიც ეწვივნენ. სწორედ ამ განსხვავებული წარმომავლობის გამო კასტორი და პოლუქსი ერთნაირი ბედით არ დაიბადნენ.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                კასტორი ტინდარეოსის შვილი და მოკვდავი იყო, ხოლო პოლუქსი ზევსის შვილი და შესაბამისად, უკვდავი. ამიტომ ძმებს ერთი დედა ჰყავდათ, მაგრამ განსხვავებული მამები და განსხვავებული ბუნება ჰქონდათ.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                კასტორი განსაკუთრებით ცნობილი იყო ცხენოსნობითა და საბრძოლო ხელოვნებით, ხოლო პოლუქსი გამოირჩეოდა ძლიერი ფიზიკური მომზადებითა და ბრძოლაში ოსტატობით. ისინი ერთმანეთთან ძალიან ახლოს იყვნენ და მრავალი თავგადასავალი ერთად გადაიტანეს. მათი განსხვავებული წარმოშობის მიუხედავად, ძმური კავშირი მათთვის უმნიშვნელოვანესი იყო.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მითის ერთ-ერთი ყველაზე ცნობილი ნაწილი სწორედ კასტორის სიკვდილს უკავშირდება. როდესაც მოკვდავი კასტორი დაიღუპა, უკვდავმა პოლუქსმა ვერ აიტანა ძმასთან სამუდამოდ განშორების აზრი და ზევსს სთხოვა, მისთვის კასტორთან ერთად დარჩენის შესაძლებლობა მიეცა.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ზევსმა საბოლოოდ გადაწყვიტა, რომ ძმები ერთმანეთისგან აღარ უნდა განშორებულიყვნენ. ამიტომ მათი უკვდავება ცასთან დააკავშირა და კასტორი და პოლუქსი თანავარსკვლავედად განათავსა. ასე გაჩნდა ცაზე ტყუპების თანავარსკვლავედი - ორი ძმის სახით, რომლებიც სამუდამოდ ერთად დარჩნენ.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების თანავარსკვლავედის ორი ყველაზე ცნობილი ვარსკვლავი სწორედ კასტორისა და პოლუქსის სახელებს ატარებს. მათი სახელები დღემდე გვახსენებს ამ მითოლოგიურ წყვილს, რომლის ისტორიაც ტყუპების ზოდიაქოს სიმბოლოსთან არის დაკავშირებული.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების სიმბოლიკაში მნიშვნელოვანი ადგილი უჭირავს ორმაგობის იდეას. ორი ფიგურა ერთმანეთის გვერდით შეიძლება აღვიქვათ როგორც ორი განსხვავებული, მაგრამ ერთმანეთთან დაკავშირებული მხარე. სწორედ ამიტომ ♊ მხოლოდ „ორი ადამიანის“ გამოსახულება არ წარმოადგენს - ის ერთიანობისა და განსხვავებულობის ერთდროულ არსებობასაც ნიშნავს.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების მმართველი პლანეტა მერკურიც ამ სიმბოლურ სამყაროს უკავშირდება. რომაულ მითოლოგიაში მერკური ღმერთების მაცნეა, რომელიც დაკავშირებულია გზებთან, ვაჭრობასთან, მოძრაობასა და ინფორმაციის გადაცემასთან. ბერძნულ მითოლოგიაში მის შესაბამის ფიგურად ჰერმესი გვევლინება.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ამიტომ ტყუპების სიმბოლიკა რამდენიმე სხვადასხვა თემას აერთიანებს: კასტორისა და პოლუქსის ისტორია, მათი განსხვავებული წარმოშობა, ძმური კავშირი, ცაში მათი სახით შექმნილი თანავარსკვლავედი და მერკურის მითოლოგიური სახე.
              </Text>

              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ♊ ტყუპების სიმბოლო საბოლოოდ გვიყვება ორ ძმაზე, რომელთაგან ერთი მოკვდავი იყო, მეორე კი უკვდავი, მაგრამ მათი კავშირი სიკვდილზე ძლიერი აღმოჩნდა. სწორედ ამ ისტორიამ აქცია ტყუპების მითოლოგია ზოდიაქოს ერთ-ერთ ყველაზე ცნობილ და დასამახსოვრებელ ამბად.
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setSymbolismModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* 🎭 ტყუპები სხვადასხვა სიტუაციაში ღილაკი და ფანჯარა */}
      <TouchableOpacity onPress={() => setSituationsModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>🎭 ტყუპები სხვადასხვა სიტუაციაში</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      <Modal visible={situationsModalVisible} animationType="fade" transparent={true} onRequestClose={() => setSituationsModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>🎭 სხვადასხვა სიტუაციაში</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპების ხასიათი განსაკუთრებით კარგად მაშინ ჩანს, როცა გარემო ან ემოციური მდგომარეობა იცვლება. ერთი და იგივე ადამიანი სხვადასხვა სიტუაციაში სრულიად განსხვავებულად შეიძლება გამოავლინოს თავი.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა ბედნიერია</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ტყუპები უფრო გახსნილი, აქტიური და ხალისიანი ხდება. უჩნდება სურვილი, ეს განწყობა სხვებსაც გაუზიაროს, ბევრი ილაპარაკოს, იხუმროს ან რაიმე ახალი მოიფიქროს. კარგი ამბავი მის ენერგიას კიდევ უფრო აძლიერებს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა გაბრაზებულია</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                პირველი რეაქცია ხშირად სიტყვიერია. შეიძლება პირდაპირ თქვას, რაც არ მოსწონს, ბევრი ილაპარაკოს ან კამათში არგუმენტებით შევიდეს. თუმცა გაბრაზება ყოველთვის დიდხანს არ გრძელდება — განსაკუთრებით მაშინ, თუ სიტუაციის განხილვა და გარკვევა შესაძლებელია.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა ნაწყენია</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                შეიძლება გარედან ისე ჩანდეს, თითქოს ყველაფერი ჩვეულებრივად არის, მაშინ როცა შინაგანად მომხდარს ბევრს აანალიზებს. ზოგჯერ საკუთარ გრძნობებზე პირდაპირ საუბარს დრო სჭირდება და შეიძლება ჯერ დისტანცია აირჩიოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა სტრესშია</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ფიქრები უფრო სწრაფად ეცვლება და შეიძლება ერთდროულად რამდენიმე საკითხზე დაიწყოს ფიქრი. ასეთ დროს რთულდება კონცენტრაცია და შეიძლება გადაწყვეტილების მიღებაც გაუჭირდეს. ხშირად ეხმარება სიტუაციის დალაგება და პრობლემების სათითაოდ განხილვა.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა მოწყენილია</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                დიდხანს ერთ მდგომარეობაში ყოფნა მისთვის განსაკუთრებით რთული შეიძლება იყოს. ხშირად ცდილობს ყურადღება სხვა რამეზე გადაიტანოს — შეხვდეს ვინმეს, ილაპარაკოს, გაისეირნოს, უყუროს რამეს ან ახალი საქმიანობა დაიწყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა რაღაც ძალიან აინტერესებს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მისი ყურადღება მთლიანად შეიძლება ამ თემისკენ გადავიდეს. იწყებს კითხვების დასმას, ინფორმაციის მოძიებას და დეტალების შესწავლას. რაც უფრო მეტს იგებს, მით უფრო მეტი კითხვა უჩნდება.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა რაღაც აღარ აინტერესებს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ენთუზიაზმი შეიძლება სწრაფად შემცირდეს. საქმე, რომელიც ცოტა ხნის წინ ძალიან საინტერესო იყო, მოულოდნელად მოსაწყენი გახდეს და ყურადღება ახალ თემაზე გადაიტანოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა არჩევანის წინაშეა</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                სანამ გადაწყვეტილებას მიიღებს, შეიძლება რამდენიმე ვარიანტი შეადაროს. თითოეულში სხვადასხვა შესაძლებლობას ხედავს, ამიტომ საბოლოო არჩევანის გაკეთებას ზოგჯერ მეტი დრო სჭირდება.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა მოულოდნელი ცვლილება ხდება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                ცვლილება ყოველთვის პრობლემად არ აღიქმება. თუ სიტუაციაში ახალი შესაძლებლობა დაინახა, შეიძლება საკმაოდ სწრაფად მოერგოს და გამოსავლის ძებნა დაიწყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა მარტო რჩება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                მარტო ყოფნა მისთვის აუცილებლად მოწყენილობას არ ნიშნავს. შეიძლება დრო საკუთარი ინტერესებისთვის გამოიყენოს - იფიქროს, იკითხოს, უყუროს რამეს, ახალი იდეები მოიფიქროს ან უბრალოდ მშვიდად იყოს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა ვინმე არ ეთანხმება</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                განსხვავებული აზრი ხშირად ინტერესსაც იწვევს. შეიძლება დაიწყოს საკუთარი პოზიციის ახსნა, კითხვების დასმა და მეორე ადამიანის არგუმენტების განხილვა. თუ საუბარი საინტერესოა, უთანხმოებაც კი შეიძლება მისთვის საინტერესო დიალოგი გახდეს.
              </Text>

              <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• როცა დიდი მიზანი აქვს</Text>
              <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left", marginBottom: 16 }}>
                თავიდან იდეებითა და ენთუზიაზმით ივსება. შეუძლია სწრაფად მოიფიქროს მოქმედების რამდენიმე გზა, თუმცა შემდეგ მთავარი გამოწვევა შეიძლება იყოს ყურადღების შენარჩუნება და დაწყებული საქმის ბოლომდე მიყვანა.
              </Text>

            </ScrollView>
            <TouchableOpacity onPress={() => setSituationsModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */}
      <TouchableOpacity onPress={() => setSignsModalVisible(true)} style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#2a2a4a" }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>♊ ტყუპები და სხვა ნიშნები</Text>
        <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold" }}>❯</Text>
      </TouchableOpacity>

      {/* მთავარი ფანჯარა 12 ნიშნის ჩამონათვალით */}
      <Modal visible={signsModalVisible} animationType="slide" transparent={true} onRequestClose={() => setSignsModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "85%" }}>
            <Text style={{ color: "#d4af37", fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>აირჩიეთ ნიშანი</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                { id: "aries", name: "♈ ვერძი" },
                { id: "taurus", name: "♉ კურო" },
                { id: "gemini", name: "♊ ტყუპები" },
                { id: "cancer", name: "♋ კირჩხიბი" },
                { id: "leo", name: "♌ ლომი" },
                { id: "virgo", name: "♍ ქალწული" },
                { id: "libra", name: "♎ სასწორი" },
                { id: "scorpio", name: "♏ მორიელი" },
                { id: "sagittarius", name: "♐ მშვილდოსანი" },
                { id: "capricorn", name: "♑ თხის რქა" },
                { id: "aquarius", name: "♒ მერწყული" },
                { id: "pisces", name: "♓ თევზები" }
              ].map((sign) => (
                <TouchableOpacity
                  key={sign.id}
                  onPress={() => {
                    setSelectedSign(sign);
                    setSignDetailModalVisible(true);
                  }}
                  style={{ backgroundColor: "#151525", padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: "#2a2a4a", flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>{sign.name}</Text>
                  <Text style={{ color: "#d4af37", fontSize: 16 }}>❯</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setSignsModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* შიდა (ჰიბრიდული) ფანჯარა კონკრეტული ნიშნის ტექსტისთვის */}
      <Modal visible={signDetailModalVisible} animationType="fade" transparent={true} onRequestClose={() => setSignDetailModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#d4af37", width: "100%", maxHeight: "80%" }}>
            <Text style={{ color: "#d4af37", fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>
              ტყუპები და {selectedSign ? selectedSign.name.split(" ")[1] : ""}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              
              {selectedSign && COMPATIBILITY_DATA[selectedSign.id] ? (
                <View style={{ width: "100%" }}>
                  {[
                    { key: "general", title: "ზოგადი თავსებადობა" },
                    { key: "love", title: "სიყვარული და რომანტიკული ურთიერთობა" },
                    { key: "emotion", title: "ემოციური კავშირი" },
                    { key: "communication", title: "კომუნიკაცია" },
                    { key: "intellect", title: "ინტელექტუალური კავშირი" },
                    { key: "friendship", title: "მეგობრობა" },
                    { key: "trust", title: "ნდობა და ერთგულება" },
                    { key: "freedom", title: "თავისუფლება და პირადი სივრცე" },
                    { key: "conflict", title: "კონფლიქტები" },
                    { key: "daily", title: "ყოველდღიური ცხოვრება" },
                    { key: "living", title: "ერთად ცხოვრება" },
                    { key: "business", title: "საქმიანი ურთიერთობა" },
                    { key: "finance", title: "ფინანსური საკითხები" },
                    { key: "unites", title: "რა აერთიანებთ" },
                    { key: "differs", title: "რა განასხვავებთ" },
                    { key: "learn", title: "რისი სწავლა შეუძლიათ ერთმანეთისგან" },
                    { key: "complicate", title: "რა შეიძლება გაართულოს ურთიერთობა" },
                    { key: "strengthen", title: "რა გააძლიერებს ურთიერთობას" }
                  ].map(cat => COMPATIBILITY_DATA[selectedSign.id][cat.key] ? (
                    <View key={cat.key} style={{ marginBottom: 16 }}>
                      <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>• {cat.title}</Text>
                      <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "left" }}>{COMPATIBILITY_DATA[selectedSign.id][cat.key]}</Text>
                    </View>
                  ) : null)}

                  {COMPATIBILITY_DATA[selectedSign.id].formula && (
                    <Text style={{ color: "#d4af37", fontSize: 16, fontWeight: "bold", lineHeight: 26, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
                      {COMPATIBILITY_DATA[selectedSign.id].formula}
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={{ color: "#fff", fontSize: 15, lineHeight: 24, textAlign: "center", marginVertical: 20 }}>
                  ამ ნიშნის ტექსტი მალე დაემატება...
                </Text>
              )}


            </ScrollView>
            <TouchableOpacity onPress={() => setSignDetailModalVisible(false)} style={{ marginTop: 20, backgroundColor: "#d4af37", padding: 12, borderRadius: 8, alignItems: "center" }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>უკან დაბრუნება</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>






    




      
        {/* 🌟 ცნობილი ტყუპების ახალი ინტერაქტიული პანელი */}
        <View style={{backgroundColor: '#131b2e', borderRadius: 15, padding: 15, marginVertical: 10, borderWidth: 1, borderColor: '#d4af37'}}>
          <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>🌟 ცნობილი ტყუპები (თარიღით ძებნა)</Text>
          
          <Text style={{color: '#fff', marginBottom: 5, fontSize: 13}}>აირჩიე თვე:</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <TouchableOpacity onPress={() => setSelectedMonth('5')} style={{flex: 1, padding: 8, backgroundColor: selectedMonth === '5' ? '#d4af37' : '#1f293d', marginRight: 5, alignItems: 'center', borderRadius: 6}}>
              <Text style={{color: selectedMonth === '5' ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 12}}>მაისი</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMonth('6')} style={{flex: 1, padding: 8, backgroundColor: selectedMonth === '6' ? '#d4af37' : '#1f293d', marginLeft: 5, alignItems: 'center', borderRadius: 6}}>
              <Text style={{color: selectedMonth === '6' ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 12}}>ივნისი</Text>
            </TouchableOpacity>
          </View>

          <Text style={{color: '#fff', marginBottom: 8, fontSize: 13}}>აირჩიე რიცხვი:</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 12}}>
            {Array.from({length: 31}, (_, i) => String(i + 1)).map(day => (
              <TouchableOpacity 
                key={day} 
                onPress={() => setSelectedDay(day)}
                style={{
                  paddingVertical: 8, 
                  paddingHorizontal: 12, 
                  backgroundColor: selectedDay === day ? '#d4af37' : '#1f293d', 
                  marginRight: 6, 
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: selectedDay === day ? '#d4af37' : 'rgba(212,175,55,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 42
                }}
              >
                <Text style={{color: selectedDay === day ? '#0d1322' : '#fff', fontWeight: 'bold', fontSize: 14}}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={{color: '#d4af37', fontSize: 13, fontWeight: 'bold', marginTop: 5, marginBottom: 5}}>შედეგები:</Text>
          <ScrollView style={{maxHeight: 180, backgroundColor: '#0d1322', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}} nestedScrollEnabled={true}>
            {
              (() => {
                const key = `${selectedDay}-${selectedMonth}`;
                const results = FAMOUS_GEMINI_DATA[key];
                if (!results) {
                  return <Text style={{color: '#888', textAlign: 'center', fontSize: 12}}>ამ თარიღისთვის ჩანაწერები არ მოიძებნა. სცადე სხვა დღე (მაგ: 21-5, 22-5, 1-6, 4-6)</Text>;
                }
                return results.map((person, i) => (
                  <View key={i} style={{marginBottom: 6, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderBottomColor: '#1f293d', paddingBottom: 4}}>
                    <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 13}}>• {person.name} ({person.year})</Text>
                    <Text style={{color: '#ccc', fontSize: 11}}>{person.role}</Text>
                  </View>
                ));
              })()
            }
          </ScrollView>
        </View>
  
{[
                                              ].map((item) => (
            <View key={item.key} style={styles.card}>
              <TouchableOpacity onPress={() => toggleGeminiCard(item.key)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={{ color: '#d4af37', fontSize: 16 }}>{geminiOpen[item.key] ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {geminiOpen[item.key] && (
                <Text style={[styles.bodyText, { marginTop: 12, borderTopWidth: 1, borderTopColor: '#222', paddingTop: 10, lineHeight: 20 }]}>
                  {item.content}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}

{activeTab === 'მთვარე' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 35 }}>
          <Text style={styles.pageTitle}>მთვარის ფაზები და პროგნოზი</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{moonInfo?.phaseName}</Text>
            <Text style={styles.bodyText}>სტატუსი: {moonInfo?.statusText}</Text>
            <Text style={styles.bodyText}>განათება: {moonInfo?.illumination}%</Text>
            {renderFormattedHoroscope(moonInfo?.dailyPhrase)}
          </View>
        </ScrollView>
      )}

      {/* TAB 4: პროფილი */}
      
      
      
      {activeTab === 'პროგნოზები' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          {selectedForecast ? (
            /* დეტალური ხედი ვიდეოთი, ლაიქებით და კომენტარებით (მხოლოდ პროგნოზების ტაბის შიგნით) */
            <View>
              <TouchableOpacity 
                onPress={() => setSelectedForecast(null)} 
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 8, alignSelf: 'flex-start' }}
              >
                <Ionicons name="arrow-back" size={20} color="#d4af37" style={{ marginRight: 6 }} />
                <Text style={{ color: '#d4af37', fontSize: 14, fontWeight: 'bold' }}>პროგნოზებში დაბრუნება</Text>
              </TouchableOpacity>

              <View style={styles.card}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                  {selectedForecast === 'week' ? '📅 კვირის პროგნოზი' : selectedForecast === 'month' ? '🗓️ თვის პროგნოზი' : '✨ წლის პროგნოზი'}
                </Text>
                
                <Text style={{ color: '#d1d5db', fontSize: 14, lineHeight: 20, marginBottom: 16 }}>
                  {selectedForecast === 'week' 
                    ? 'ამ კვირაში ტყუპებისთვის განსაკუთრებით აქტიური პერიოდია კომუნიკაციისა და ახალი იდეების განხორციელებისთვის. ელოდეთ სასიამოვნო სიურპრიზებს პირად და პროფესიულ სფეროში.'
                    : selectedForecast === 'month'
                    ? 'მიმდინარე თვე ხელსაყრელია ფინანსური გადაწყვეტილებებისა და ძველი წამოწყებების დასასრულებლად. ენერგია და ინტუიცია პიკზეა.'
                    : 'ეს წელი ტყუპებისთვის ტრანსფორმაციისა და სულიერი ზრდის წელია. გაბედეთ დიდი ნაბიჯების გადადგმა და სამყარო მხარს დაგიჭერთ.'}
                </Text>

                {/* ვიდეო ფლეიერი */}
                <View style={{ width: '100%', height: 480, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
                  <WebView
    allowsFullscreenVideo={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
                    source={{ html: `
                      <html>
                        <body style="margin:0;background:#000;display:flex;justify-content:center;align-items:center;height:100vh;">
                          <video width="100%" height="100%" controls autoplay playsinline style="object-fit: contain; background: #000;">
                            <source src="https://files.catbox.moe/5ghg7v.mp4" type="video/mp4">
                          </video>
                        </body>
                      </html>
                    ` }}
                    style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                  />
                </View>

                {/* ლაიქი და კომენტარები */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12, marginBottom: 12 }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons name="heart" size={22} color="#ef4444" />
                    <Text style={{ color: '#fff', fontSize: 14 }}>142 მოწონება</Text>
                  </TouchableOpacity>
                  <Text style={{ color: '#aaa', fontSize: 14 }}>კომენტარები (12)</Text>
                </View>

                {/* კომენტარის შეყვანის ველი */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 }}>
                  <TextInput
                    placeholder="დაწერეთ კომენტარი..."
                    placeholderTextColor="#888"
                    style={{ flex: 1, color: '#fff', fontSize: 13 }}
                  />
                  <TouchableOpacity style={{ marginLeft: 8, backgroundColor: '#d4af37', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
                    <Text style={{ color: '#070913', fontSize: 12, fontWeight: 'bold' }}>გაგზავნა</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            /* პროგნოზების მთავარი მენიუ თავისი ასპექტებით */
            <View>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>✨ ასტროლოგიური პროგნოზები</Text>
              </View>

              {/* კვირის, თვის, წლის პროგნოზების ღილაკები */}
              {[
    { key: 'week', title: 'კვირის პროგნოზი', icon: 'calendar' },
    { key: 'month', title: 'თვის პროგნოზი', icon: 'time' },
    { key: 'year', title: 'წლის პროგნოზი', icon: 'sparkles' }
  ].map((item) => (
                <TouchableOpacity 
                  key={item.key} 
                  onPress={() => setSelectedForecast(item.key)}
                  style={[styles.card, { marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Ionicons name={item.icon} size={24} color="#d4af37" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{item.title}</Text>
                      
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#d4af37" />
                </TouchableOpacity>
              ))}

              {/* მოკლევადიანი ასპექტები */}
              <TouchableOpacity onPress={() => setIsShortModalVisible(true)} activeOpacity={0.8} style={[styles.card, { marginTop: 10, padding: 12 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="flash-outline" size={22} color="#d4af37" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>მოკლევადიანი ასპექტები</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#d4af37" />
                </View>
              </TouchableOpacity>

              {/* გრძელვადიანი ასპექტები */}
              <TouchableOpacity onPress={() => setIsLongModalVisible(true)} activeOpacity={0.8} style={[styles.card, { marginTop: 14, padding: 12 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="planet-outline" size={22} color="#d4af37" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>გრძელვადიანი ასპექტები</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#d4af37" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
  {activeTab === 'პროფილი' && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 35 }}>
          <Text style={styles.pageTitle}>პროფილი</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>@geminizodiacgeo</Text>
            <Text style={styles.bodyText}>ასტროლოგიური პლატფორმა და მართვის პანელი.</Text>
          </View>
        </ScrollView>
      )}

      {/* Bottom Navigation Menu */}
      <View style={styles.bottomNav}>
        {[
          { key: 'მთავარი', label: 'მთავარი', icon: 'home-outline' },
          { key: 'ტყუპები', label: 'ტყუპები', icon: 'zodiac-gemini' },
          { key: 'პროგნოზები', label: 'პროგნოზები', icon: 'planet-outline' },
          { key: 'ნატალური', label: 'ნატალური', icon: 'compass-outline'},
          { key: 'მეტი', label: 'მეტი', icon: 'menu-outline' }
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.key)}
          >
 {tab.key === 'ტყუპები' ? (
  <MaterialCommunityIcons name="zodiac-gemini" size={22} color={activeTab === tab.key ? '#d4af37' : '#888'} />
) : (
  <Ionicons name={tab.icon} size={22} color={activeTab === tab.key ? '#d4af37' : '#888'} />
)}

            <Text style={[styles.navText, activeTab === tab.key && styles.activeNavText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      
      {/* მოკლევადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isShortModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#d4af37', maxHeight: '85%'}}>
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>⚡ მოკლევადიანი ასპექტები</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {shortTermAspects
                .filter(item => item.end >= new Date().toISOString().split('T')[0])
                .map(item => (
                  <View key={item.id} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                    <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 6}}>{item.title}</Text>
                    <Text style={{color: '#aaa', fontSize: 13, marginBottom: 4}}>🪐 {item.planets}</Text>
                    <Text style={{color: '#ddd', fontSize: 13, marginBottom: 6}}>📅 პერიოდი: {item.period} (პიკი: {item.peak})</Text>
                    <Text style={{color: '#fff', fontSize: 13, lineHeight: 18, marginBottom: 8}}>✨ {item.impact}</Text>
                    <Text style={{color: '#8be9fd', fontSize: 13, lineHeight: 18, marginBottom: 6}}>🎯 სფეროები: {item.manifestation}</Text>
                    <Text style={{color: '#55efc4', fontSize: 13, lineHeight: 18, fontStyle: 'italic'}}>💡 რჩევა: {item.advice}</Text>
                  </View>
                ))}
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <TouchableOpacity onPress={() => alert('მიმდინარე ასპექტები აქტიურია და გავლენას ახდენს თქვენს ენერგიაზე.')} style={{flex: 1, backgroundColor: '#1a233a', borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 8}}>
                <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 15}}>წაკითხვა</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsShortModalVisible(false)} style={{flex: 1, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 8}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* გრძელვადიანი ასპექტების მოდალური ფანჯარა */}
      <Modal visible={isLongModalVisible} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#d4af37', maxHeight: '85%'}}>
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>🪐 გრძელვადიანი ასპექტები</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {longTermAspects
                .filter(item => item.end >= new Date().toISOString().split('T')[0])
                .map(item => (
                  <View key={item.id} style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
                    <Text style={{color: '#d4af37', fontSize: 16, fontWeight: 'bold', marginBottom: 6}}>{item.title}</Text>
                    <Text style={{color: '#aaa', fontSize: 13, marginBottom: 4}}>🪐 {item.planets}</Text>
                    <Text style={{color: '#ddd', fontSize: 13, marginBottom: 6}}>📅 პერიოდი: {item.period} (პიკი: {item.peak})</Text>
                    <Text style={{color: '#ff7675', fontSize: 13, marginBottom: 6}}>⏳ ხანგრძლივობა: {item.duration}</Text>
                    <Text style={{color: '#fdcb6e', fontSize: 13, fontWeight: 'bold', marginBottom: 6}}>📌 მთავარი თემა: {item.theme}</Text>
                    <Text style={{color: '#fff', fontSize: 13, lineHeight: 18, marginBottom: 8}}>✨ გამოვლინება: {item.manifestation}</Text>
                    {item.cautions && <Text style={{color: '#ff9ff3', fontSize: 13, lineHeight: 18, marginBottom: 6}}>⚠️ გასათვალისწინებელი: {item.cautions}</Text>}
                    <Text style={{color: '#55efc4', fontSize: 13, lineHeight: 18, fontStyle: 'italic'}}>💡 რჩევა: {item.advice}</Text>
                  </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsLongModalVisible(false)} style={{marginTop: 15, backgroundColor: '#d4af37', padding: 12, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 15}}>დახურვა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* კომპაქტური საწყისი მოდალური ფანჯარა */}
      <Modal visible={isStartupModalVisible} animationType="fade" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <View style={{backgroundColor: '#131b2e', borderRadius: 20, padding: 22, width: '100%', maxWidth: 360, borderWidth: 1, borderColor: '#d4af37'}}>
            
            <Text style={{color: '#d4af37', fontSize: 20, fontWeight: 'bold', marginBottom: 18, textAlign: 'center'}}>✨ მიმდინარე ასპექტები</Text>

            {/* მოკლევადიანი ასპექტის ბლოკი */}
            <View style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
              <Text style={{color: '#aaa', fontSize: 12, marginBottom: 4}}>⚡ მოკლევადიანი</Text>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8}} numberOfLines={1}>
                {shortTermAspects.find(item => item.end >= new Date().toISOString().split('T')[0])?.title || 'აქტიური ასპექტი არ არის'}
              </Text>
              <TouchableOpacity onPress={() => { setIsStartupModalVisible(false); setIsShortModalVisible(true); }} style={{backgroundColor: '#d4af37', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 13}}>წაკითხვა</Text>
              </TouchableOpacity>
            </View>

            {/* გრძელვადიანი ასპექტის ბლოკი */}
            <View style={{backgroundColor: '#1a233a', borderRadius: 12, padding: 12, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)'}}>
              <Text style={{color: '#aaa', fontSize: 12, marginBottom: 4}}>🪐 გრძელვადიანი</Text>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8}} numberOfLines={1}>
                {longTermAspects.find(item => item.end >= new Date().toISOString().split('T')[0])?.title || 'აქტიური ასპექტი არ არის'}
              </Text>
              <TouchableOpacity onPress={() => { setIsStartupModalVisible(false); setIsLongModalVisible(true); }} style={{backgroundColor: '#d4af37', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: '#131b2e', fontWeight: 'bold', fontSize: 13}}>წაკითხვა</Text>
              </TouchableOpacity>
            </View>

            {/* დახურვის ღილაკი */}
            <TouchableOpacity onPress={() => setIsStartupModalVisible(false)} style={{backgroundColor: 'transparent', borderWidth: 1, borderColor: '#d4af37', padding: 10, borderRadius: 10, alignItems: 'center'}}>
              <Text style={{color: '#d4af37', fontWeight: 'bold', fontSize: 14}}>დახურვა</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070913' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  badge: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(212,175,55,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  brand: { color: '#d4af37', fontSize: 16, fontWeight: 'bold' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  tabBar: { flexDirection: 'row', backgroundColor: '#0d1322', borderRadius: 12, padding: 4, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTabBtn: { backgroundColor: '#d4af37' },
  tabBtnText: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  activeTabBtnText: { color: '#070913', fontWeight: 'bold' },
  card: { backgroundColor: '#0d1322', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(212,175,55,0.2)' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  bodyText: { color: '#ccc', fontSize: 14, lineHeight: 20 },
  indicatorsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  indicatorBox: { width: '23%', backgroundColor: '#131b2e', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 4, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(212,175,55,0.2)' },
  moon3dContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#131b2e', padding: 18, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(212,175,55,0.4)', marginTop: 12 },
  moonCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#070913', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#ffd700', position: 'relative' },
  dateNavBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#131b2e', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  moonForecastBtn: { backgroundColor: '#d4af37', borderRadius: 12, padding: 12, marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0d1322', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%', borderWidth: 1, borderColor: 'rgba(212,175,55,0.3)' },
  modalItemTitle: { color: '#d4af37', fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  modalItemText: { color: '#ccc', fontSize: 13, marginTop: 2, lineHeight: 18 },
  bottomNav: {position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#0d1322', borderTopWidth: 1, borderTopColor: 'rgba(212,175,55,0.2)', paddingVertical: 8, paddingHorizontal: 16, justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { color: '#888', fontSize: 11, marginTop: 4 },
  activeNavText: { color: '#d4af37', fontWeight: 'bold' }
});

export default HomeScreen;
