import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { DAILY_HOROSCOPE_DATA } from "./dailyHoroscopeData";

export const DailyHoroscopeCard = ({ aiData, isAiLoading }) => {
  const [expanded, setExpanded] = useState(false);
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayKey = `${year}-${month}-${day}`;
  
  const monthsGeo = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  const currentDateTitle = `${now.getDate()} ${monthsGeo[now.getMonth()]}`;

  const hasAiData = aiData && aiData.dailyHoroscope && aiData.dailyHoroscope.length > 5;
  
  if (isAiLoading && !hasAiData) {
    return (
      <View style={{backgroundColor: "#131b2e", borderRadius: 16, padding: 30, marginVertical: 12, borderWidth: 1, borderColor: "#d4af37", alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#d4af37" />
        <Text style={{color: "#d4af37", marginTop: 15, fontSize: 14, fontWeight: "bold"}}>ვარსკვლავური მონაცემები მუშავდება...</Text>
        <Text style={{color: "#888", marginTop: 5, fontSize: 12, textAlign: "center"}}>იტვირთება...</Text>
      </View>
    );
  }

  const fallbackData = DAILY_HOROSCOPE_DATA[todayKey] || DAILY_HOROSCOPE_DATA["2026-09-22"] || Object.values(DAILY_HOROSCOPE_DATA)[0] || {};

  return (
    <View style={{backgroundColor: "#131b2e", borderRadius: 16, padding: 16, marginVertical: 12, borderWidth: 1, borderColor: "#d4af37"}}>
      <Text style={{color: "#d4af37", fontSize: 18, fontWeight: "bold", marginBottom: 8}}>
        ✨ დღის ჰოროსკოპი ({currentDateTitle})
      </Text>

      <Text style={{color: "#fff", fontSize: 13, lineHeight: 18, marginBottom: 10}} numberOfLines={expanded ? undefined : 3}>
        {hasAiData ? aiData.dailyHoroscope : (fallbackData.mainEnergy || fallbackData.dailyHoroscope || "დღეს კომუნიკაციისა და ახალი იდეების ნაკადი განსაკუთრებით ძლიერია. მერკურის პოზიტიური გავლენა გეხმარებათ რთული საკითხების მარტივად მოგვარებაში.")}
      </Text>

      {expanded && (
        <View style={{marginTop: 4}}>
          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 8}}>❤️ სიყვარული და ურთიერთობები:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{hasAiData ? aiData.love : (fallbackData.love || "დღეს ურთიერთობებში ჰარმონია და ურთიერთგაგება ჭარბობს. გაუზიარეთ გრძნობები პარტნიორს.")}</Text>

          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 10}}>💼 საქმე და კარიერა:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{hasAiData ? aiData.career : (fallbackData.career || "პროფესიულ ასპარეზზე ახალი შესაძლებლობები იხსნება. იყავით ინიციატივიანი.")}</Text>

          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 10}}>💬 კომუნიკაცია და სოციუმი:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{hasAiData ? aiData.communication : (fallbackData.communication || "კომუნიკაცია მარტივი და შედეგიანია. ახალი კონტაქტები სასიკეთო იქნება.")}</Text>

          <View style={{backgroundColor: "#1f293d", padding: 10, borderRadius: 8, marginTop: 12}}>
            <Text style={{color: "#4cd137", fontSize: 13, fontWeight: "bold"}}>🌟 პიროვნული ენერგია დღეს:</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 2}}>{hasAiData ? aiData.personality : (fallbackData.personality || fallbackData.opportunity || "ენერგიული და აქტიური განწყობა დაგეხმარებათ ყველა მიზნის მიღწევაში.")}</Text>

            <Text style={{color: "#e84118", fontSize: 13, fontWeight: "bold", marginTop: 8}}>⚠️ დღის გამოწვევები:</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 2}}>{hasAiData ? aiData.challenges : (fallbackData.challenges || fallbackData.caution || "მოერიდეთ ნაჩქარევ და ემოციურ გადაწყვეტილებებს. სიმშვიდე შეინარჩუნეთ.")}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{marginTop: 10, alignSelf: "flex-start"}}>
        <Text style={{color: "#d4af37", fontSize: 13, fontWeight: "bold"}}>
          {expanded ? "▲ შეკვეცა" : "▼ სრულად ნახვა"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
