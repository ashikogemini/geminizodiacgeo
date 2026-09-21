import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DAILY_HOROSCOPE_DATA } from "./dailyHoroscopeData";

export const DailyHoroscopeCard = () => {
  const [expanded, setExpanded] = useState(false);
  const todayKey = new Date().toISOString().split("T")[0];
  const data = DAILY_HOROSCOPE_DATA[todayKey] || DAILY_HOROSCOPE_DATA["2026-09-20"];

  if (!data) return null;

  return (
    <View style={{backgroundColor: "#131b2e", borderRadius: 16, padding: 16, marginVertical: 12, borderWidth: 1, borderColor: "#d4af37"}}>
      <Text style={{color: "#d4af37", fontSize: 18, fontWeight: "bold", marginBottom: 8}}>
        ✨ დღის ჰოროსკოპი ({data.dateTitle})
      </Text>

      <Text style={{color: "#fff", fontSize: 13, lineHeight: 18, marginBottom: 10}} numberOfLines={expanded ? undefined : 3}>
        {data.mainEnergy}
      </Text>

      {expanded && (
        <View style={{marginTop: 4}}>
          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 8}}>❤️ სიყვარული და ურთიერთობები:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{data.love || "დღეს ურთიერთობებში ჰარმონია და ურთიერთგაგება ჭარბობს. გაუზიარეთ გრძნობები პარტნიორს."}</Text>

          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 10}}>💼 საქმე და კარიერა:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{data.career || "პროფესიულ ასპარეზზე ახალი შესაძლებლობები იხსნება. იყავით ინიციატივიანი."}</Text>

          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 10}}>💰 ფინანსები:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{data.finance || "ფინანსური სტაბილურობა შენარჩუნებულია, თუმცა მოერიდეთ იმპულსურ დანახარჯებს."}</Text>

          <Text style={{color: "#d4af37", fontSize: 14, fontWeight: "bold", marginTop: 10}}>🧘 ემოციური მდგომარეობა:</Text>
          <Text style={{color: "#ccc", fontSize: 13, lineHeight: 18, marginTop: 2}}>{data.emotion || "შინაგანი ბალანსი და სიმშვიდე დაგეხმარებათ დღის გამოწვევების გადალახვაში."}</Text>

          <View style={{backgroundColor: "#1f293d", padding: 10, borderRadius: 8, marginTop: 12}}>
            <Text style={{color: "#4cd137", fontSize: 13, fontWeight: "bold"}}>🌟 დღის მთავარი შესაძლებლობა:</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 2}}>{data.opportunity || "ახალი კონტაქტების დამყარება და იდეების გაზიარება."}</Text>

            <Text style={{color: "#e84118", fontSize: 13, fontWeight: "bold", marginTop: 8}}>⚠️ დღის მთავარი სიფრთხილე:</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 2}}>{data.caution || "ნუ მიიღებთ ნაჩქარევ გადაწყვეტილებებს ემოციურ ფონზე."}</Text>

            <Text style={{color: "#00a8ff", fontSize: 13, fontWeight: "bold", marginTop: 8}}>💡 დღის რჩევა:</Text>
            <Text style={{color: "#fff", fontSize: 12, marginTop: 2}}>{data.advice || "ენდეთ საკუთარ ინტუიციას და იმოქმედეთ თანმიმდევრულად."}</Text>
          </View>

          <Text style={{color: "#d4af37", fontSize: 13, fontWeight: "bold", textAlign: "center", marginTop: 12}}>
            🔑 დღის საკვანძო სიტყვა: <Text style={{color: "#fff"}}>{data.keyword || "გონებრივი სიცხადე"}</Text>
          </Text>
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
