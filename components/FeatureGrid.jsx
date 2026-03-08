import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const features = [
  { id: "1", title: "Prayer Time", icon: "clock", screen: "PrayerTime" },
  { id: "2", title: "Al-Quran", icon: "book", screen: "QuranScreen" },
  { id: "3", title: "Hadith", icon: "hands", screen: "HadithScreen" },
  { id: "4", title: "Dua", icon: "pray", screen: "DuaScreen" },
  { id: "5", title: "Qibla", icon: "compass", screen: "QiblaScreen" },
  { id: "6", title: "Tasbih", icon: "circle", screen: "PrayerTime" },
  { id: "7", title: "Zakat", icon: "donate", screen: "PrayerTime" },
  { id: "8", title: "Hijri", icon: "calendar", screen: "PrayerTime" },
  { id: "9", title: "Community", icon: "users", screen: "PrayerTime" },
  { id: "10", title: "Mosque", icon: "place-of-worship", screen: "PrayerTime" },
  { id: "11", title: "Kitab", icon: "book-open", screen: "PrayerTime" },
  { id: "12", title: "Donate", icon: "donate", screen: "PrayerTime" },
];

export default function FeatureGrid() {
  const navigation = useNavigation();

  return (
    <FlatList
      data={features}
      numColumns={4}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="flex-1 items-center m-2"
        >
          <View
            className="bg-gray-100 rounded-2xl mb-2 items-center justify-center"
            style={{ width: 50, height: 50 }}
          >
            <FontAwesome5 name={item.icon} size={24} color="#1E2A5A" />
          </View>
          <Text className="text-[10px] text-center text-gray-700">
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}