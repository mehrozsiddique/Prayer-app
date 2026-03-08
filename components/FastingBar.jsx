import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function FastingBar({ city = "Multan", country = "Pakistan", voluntary = true }) {
  const [sehri, setSehri] = useState(null);
  const [iftar, setIftar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchTimings = async () => {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`);
        const data = await res.json();
        setSehri(data.data.timings.Fajr);   
        setIftar(data.data.timings.Maghrib); 
        setLoading(false);
      } catch (error) {
        console.log("Error fetching timings:", error);
        setLoading(false);
      }
    };

    fetchTimings();
  }, [city, country]);

  if (loading) {
    return (
      <View className="mx-4 bg-white rounded-xl p-3 border border-gray-200 items-center justify-center">
        <ActivityIndicator size="small" color="#1E2A5A" />
      </View>
    );
  }

  return (
    <View
      className={`mx-4 rounded-xl p-3 border ${
        voluntary ? "border-gray-200" : "border-gray-200"
      } bg-white`}
    >
      <View className="flex-row justify-between items-center">

        <Text className="text-gray-500 text-sm">
          Voluntary Fasting?
        </Text>

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <AntDesign name="sun" size={14} color="#333" />
            <Text className="text-sm">Sehri: {sehri}</Text>
          </View>

          <View className="flex-row items-center gap-1">
            <FontAwesome name="moon-o" size={14} color="#333" />
            <Text className="text-sm">Iftar: {iftar}</Text>
          </View>
        </View>

      </View>
    </View>
  );
}