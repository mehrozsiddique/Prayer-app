import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function PrayerTimeScreen() {

  const navigation = useNavigation();

  const [timings, setTimings] = useState(null);
  const [date, setDate] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (timings) {
      getNextPrayer();
    }
  }, [timings]);

  const getLocation = async () => {

  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Location permission denied");
    return;
  }

  let location = await Location.getLastKnownPositionAsync();

  if (!location) {
    location = await Location.getCurrentPositionAsync({});
  }

  let geo = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const place = geo[0];

  setCity(place.city);
  setCountry(place.country);

  fetchPrayerTimes(place.city, place.country);
};

  const fetchPrayerTimes = async (cityName, countryName) => {

    try {

      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=${countryName}&method=2`
      );

      const data = await response.json();

      setTimings(data.data.timings);
      setDate(data.data.date);


    } catch (error) {
      console.log(error);
    }
  };

  const getNextPrayer = () => {

    const prayerOrder = ["Fajr","Dhuhr","Asr","Maghrib","Isha"];

    const now = new Date();

    for (let prayer of prayerOrder) {

      const time = timings[prayer];

      const [hour, minute] = time.split(":");

      const prayerTime = new Date();

      prayerTime.setHours(hour);
      prayerTime.setMinutes(minute);

      if (prayerTime > now) {

        setNextPrayer(prayer);

        const diff = prayerTime - now;

        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s`);

        break;
      }
    }
  };

  if (!timings) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#0F1B2E]">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0F1B2E]">

     <View className="bg-[#2E6F95] py-6 px-6">

  <View className="flex-row items-center justify-between">

    <TouchableOpacity onPress={handleBack}>
      <Feather name="arrow-left" size={22} color="white" />
    </TouchableOpacity>

    <Text className="text-white text-xl font-bold">
      Prayer Time
    </Text>

    <Feather name="settings" size={22} color="white" />

  </View>

</View>


      <View className="bg-[#3B3B3B] py-6 px-4">

        <View className="flex-row items-center justify-between">

          <View className="flex-col gap-1 items-center pt-5">

            <Text className="text-white">Sunrise</Text>

            <Feather name="sunrise" size={20} color="white" />

            <Text className="text-gray-300 text-sm">
              {timings.Sunrise}
            </Text>

          </View>

          <View className="items-center">

            <Text className="text-white text-lg font-semibold">
              {city}
            </Text>

            <Text className="text-gray-300 text-sm font-semibold">
              SHAFI
            </Text>

          </View>

          <View className="flex-col gap-1 items-center pt-5">

            <Text className="text-white">Sunset</Text>

            <FontAwesome5 name="moon" size={18} color="white" />

            <Text className="text-gray-300 text-sm">
              {timings.Sunset}
            </Text>

          </View>

        </View>

        <Text className="text-gray-300 text-sm text-center mt-4 ml-3">
          Next Prayer {nextPrayer} {countdown}
        </Text>

      </View>

      <Text className="text-gray-400 text-center mt-3">
        {city}, {country}
      </Text>

      <View className="mx-4 mt-3 bg-[#1E2A3C] rounded-xl py-3 flex-row items-center justify-between px-4">

        <Feather name="chevron-left" size={22} color="white" />

        <View className="items-center">

          <Text className="text-white font-semibold">
            {date.readable}
          </Text>

          <Text className="text-gray-400 text-xs">
            {date.hijri.date}
          </Text>

        </View>

        <Feather name="chevron-right" size={22} color="white" />

      </View>

      <View className="flex-row justify-between px-6 mt-5">

        <Text className="text-gray-400 text-sm">
          Prayer
        </Text>

        <Text className="text-gray-400 text-sm">
          Waqt Time
        </Text>

      </View>


      <View className="mx-4 mt-3">

        <View className="flex-row justify-between bg-[#162033] p-4 rounded-xl mb-2">
          <Text className="text-white">Fajr</Text>
          <Text className="text-gray-300">{timings.Fajr}</Text>
        </View>

        <View className="flex-row justify-between bg-[#6B4E2E] p-4 rounded-xl mb-2">
          <Text className="text-white">Sunrise</Text>
          <Text className="text-white">{timings.Sunrise}</Text>
        </View>

        <View className="flex-row justify-between bg-[#162033] p-4 rounded-xl mb-2">
          <Text className="text-white">Dhuhr</Text>
          <Text className="text-gray-300">{timings.Dhuhr}</Text>
        </View>

        <View className="flex-row justify-between bg-[#162033] p-4 rounded-xl mb-2">
          <Text className="text-white">Asr</Text>
          <Text className="text-gray-300">{timings.Asr}</Text>
        </View>

        <View className="flex-row justify-between bg-[#162033] p-4 rounded-xl mb-2">
          <Text className="text-white">Maghrib</Text>
          <Text className="text-gray-300">{timings.Maghrib}</Text>
        </View>

        <View className="flex-row justify-between bg-[#162033] p-4 rounded-xl">
          <Text className="text-white">Isha</Text>
          <Text className="text-gray-300">{timings.Isha}</Text>
        </View>

      </View>

    </SafeAreaView>
  );
}