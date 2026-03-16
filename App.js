import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PrayerTimeScreen from "./screens/PrayerTimeScreen";
import QuranScreen from "./screens/QuranScreen"
import Hadith from "./screens/HadithScreen";
import Dua from "./screens/DuaScreen";
import Qibla from "./screens/QiblaScreen";
import Tasbih from "./screens/TasbihScreen";
import Zakat from "./screens/ZakatScreen";
import Hijri from "./screens/HijriScreen";
import Community from "./screens/CommunityScreen";
import Mosque from "./screens/MosqueScreen";
import Kitab from "./screens/KitabScreen";
import Donate from "./screens/DonateScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="PrayerTime" component={PrayerTimeScreen} />
         <Stack.Screen name="QuranScreen" component={QuranScreen} />
         <Stack.Screen name="HadithScreen" component={Hadith} />
         <Stack.Screen name="DuaScreen" component={Dua} />
         <Stack.Screen name="QiblaScreen" component={Qibla} />
         <Stack.Screen name="TasbihScreen" component={Tasbih} />
         <Stack.Screen name="ZakatScreen" component={Zakat} />
         <Stack.Screen name="HijriScreen" component={Hijri} />
         <Stack.Screen name="CommunityScreen" component={Community} />
         <Stack.Screen name="MosqueScreen" component={Mosque} />
         <Stack.Screen name="KitabScreen" component={Kitab} />
         <Stack.Screen name="DonateScreen" component={Donate} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


