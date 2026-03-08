import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function AyatCard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAyat = async () => {
    setLoading(true);

    try {

      const randomAyah = Math.floor(Math.random() * 6236) + 1;

      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${randomAyah}/quran-uthmani`
      );

      const json = await res.json();
      setData(json.data);

    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAyat();
  }, []);

  if (loading) {
    return (
      <View className="bg-[#2F2F2F] mx-4 mt-4 p-10 rounded-3xl items-center">
        <ActivityIndicator color="#FACC15" />
      </View>
    );
  }

  return (
    <View className="bg-[#2F2F2F] mx-4 mt-4 rounded-3xl overflow-hidden">

      <View className="flex-row justify-around py-4 border-b border-white/10 bg-[#252525]">
        <MaterialCommunityIcons name="book-open-variant" size={22} color="white" />
        <MaterialCommunityIcons name="star-four-points-outline" size={22} color="#9CA3AF" />
        <MaterialCommunityIcons name="calendar-month-outline" size={22} color="#9CA3AF" />
        <MaterialCommunityIcons name="translate" size={22} color="#9CA3AF" />
        <MaterialCommunityIcons name="hands-pray" size={22} color="#9CA3AF" />
      </View>

      <View className="p-5">

        <View className="flex-row justify-between items-start">

          <View>
            <Text className="text-white text-xl font-bold">
              Ayat of the Moment
            </Text>

            <Text className="text-yellow-400 text-[10px] font-bold">
              BY GFS
            </Text>

            <Text className="text-gray-400 text-xs mt-1">
              {data.surah.englishName} [{data.surah.number}:{data.numberInSurah}]
            </Text>
          </View>

          <View className="flex-row gap-4">

            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={fetchAyat}>
              <MaterialCommunityIcons name="refresh" size={24} color="white" />
            </TouchableOpacity>

          </View>

        </View>

        <View className="mt-10 mb-6">

          <Text className="text-white text-3xl text-right leading-[55px]">
            {data.text}
          </Text>

          <Text className="text-yellow-400 text-2xl text-right mt-4">
            {"{ "}{data.numberInSurah}{" }"}
          </Text>

        </View>

      </View>

    </View>
  );
}