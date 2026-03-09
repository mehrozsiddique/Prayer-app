import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function PrayerStatus({ prayerTimes, nextPrayer }) {

  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    if (!prayerTimes || !nextPrayer) return;

    const updateTimer = () => {

      const now = new Date();

      const [hours, minutes] = prayerTimes[nextPrayer]
        .split(":")
        .map(Number);

      const nextTime = new Date();
      nextTime.setHours(hours, minutes, 0, 0);

      let diff = nextTime - now;

      if (diff < 0) {
        nextTime.setDate(nextTime.getDate() + 1);
        diff = nextTime - now;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, nextPrayer]);

  if (!prayerTimes) return null;

  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="px-5 py-4 bg-white">
      <View className="flex-row items-center">

        <View className="flex-1 mb-5">

          <View className="flex-row items-center gap-12">
            <Text className="text-gray-900 text-lg w-16">Now</Text>
            <Text className="text-lg text-gray-900">{now}</Text>
          </View>

          <View className="my-1 flex-row pl-16">
            <Feather name="arrow-right" size={18} color="#222" />
          </View>

          <View className="flex-row items-center gap-12">
            <Text className="font-bold text-black w-16">
              {nextPrayer === "Fajr"
                ? "ISHA"
                : nextPrayer === "Dhuhr"
                  ? "FAJR"
                  : nextPrayer === "Asr"
                    ? "DHUHR"
                    : nextPrayer === "Maghrib"
                      ? "ASR"
                      : "MAGHRIB"}
            </Text>

            <Text className="font-bold text-black">
              {nextPrayer.toUpperCase()}
            </Text>
          </View>

        </View>

        <View className="h-20 w-20 rounded-full border-[3px] border-gray-300 items-center justify-center mr-6">
          <Text className="text-[10px] text-gray-600 text-center leading-4">
            Time{"\n"}
            <Text className="font-semibold text-xs text-black">
              {timeLeft}
            </Text>
            {"\n"}Left
          </Text>
        </View>

      </View>
    </View>
  );
}