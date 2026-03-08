import { View, ScrollView } from "react-native"; // ScrollView zyada behtar rahega
import usePrayerLogic from "../hook/usePrayerLogic.js"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "../components/BottomNav.jsx";
import TopHeader from '../components/TopHeader.jsx'
import PrayerStatus from '../components/PrayerStatus.jsx'
import PrayerTabs from '../components/PrayerTabs.jsx'
import FeatureGrid from '../components/FeatureGrid.jsx'
import AyatCard from '../components/AyatCard.jsx'
import FastingBar from '../components/FastingBar.jsx'

export default function HomeScreen() {
  const { prayerTimes, nextPrayer } = usePrayerLogic();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20
          }}>
          <TopHeader />
          <PrayerStatus
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
          />
          <FastingBar />
          <PrayerTabs prayerTimes={prayerTimes} nextPrayer={nextPrayer} />
          <FeatureGrid />
          <AyatCard />
        </ScrollView>

        <BottomNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}