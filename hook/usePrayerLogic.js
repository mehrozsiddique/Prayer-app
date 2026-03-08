import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function usePrayerLogic() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState("");

  useEffect(() => {
    let interval;

    (async () => {
    
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      const timings = data.data.timings;
      setPrayerTimes(timings);

      calculateNextPrayer(timings);
      interval = setInterval(() => calculateNextPrayer(timings), 30 * 1000);
    })();

    return () => clearInterval(interval);
  }, []);

  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

     for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      const [hours, minutes] = timings[prayer]
        .split(":")
        .map((t) => parseInt(t));

      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

    
      if (prayerTime > now) {
        setNextPrayer(prayer);
        return;
      }
    }
    setNextPrayer("Fajr");
  };

  return { prayerTimes, nextPrayer };
}