import { View, Text } from "react-native";

export default function PrayerTabs({ prayerTimes }) {
  if (!prayerTimes) return null;

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  const now = new Date();

  const getPrayerDate = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  const formatTime = (time) => {
  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

let currentPrayer = "Fajr";

  for (let i = 0; i < prayers.length; i++) {
    const prayerTime = getPrayerDate(prayerTimes[prayers[i]]);

    if (now >= prayerTime) {
      currentPrayer = prayers[i];
    }
  }

  return (
    <View className="flex-row justify-between px-7 py-4 bg-white">
      {prayers.map((prayer, index) => {
        const isActive = prayer === currentPrayer;

        return (
          <View key={index} className="items-center">

            <View
              className={`h-2 w-2 rounded-full mb-1 ${
                isActive ? "bg-blue-700" : "bg-gray-300"
              }`}
            />
  
            <Text
              className={`font-semibold ${
                isActive ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {prayer}
            </Text>

            <Text className="text-xs text-gray-500">
               {formatTime(prayerTimes[prayer])}
            </Text>

          </View>
        );
      })}
    </View>
  );
}