import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PrayerTimeScreen from "./screens/PrayerTimeScreen";
import QuranScreen from "./screens/QuranScreen"
import Hadith from "./screens/HadithScreen";
import Dua from "./screens/DuaScreen";
import Qibla from "./screens/QiblaScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}