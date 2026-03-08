import { View, Text, TouchableOpacity, Platform } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";

export default function TopHeader() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [city, setCity] = useState("Loading...");
    const [country, setCountry] = useState("");

    // Fetch current location
    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Location permission denied");
                setCity("Unknown");
                setCountry("Pakistan");
                return;
            }

            let location = await Location.getLastKnownPositionAsync();
            if (!location) {
                location = await Location.getCurrentPositionAsync({});
            }

            const geo = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            const place = geo[0];

            const cityName =
                place.city || place.district || place.subregion || "Unknown";

            setCity(cityName);
            setCountry(place.country || "Pakistan");

        } catch (error) {
            console.log("Location error:", error);
            setCity("Unknown");
            setCountry("Pakistan");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };


    const islamicDate = new Intl.DateTimeFormat("en", {
        calendar: "islamic",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date).replace(" AH", "");

    const gregorianDate = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    return (
        <View className="bg-white px-4 pt-6 pb-4">

        
            <View className="flex-row justify-between items-center mb-4">
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    className="flex-row items-center gap-2"
                >
                    <Ionicons name="calendar-outline" size={30} color="#333" />
                    <View>
                        <Text className="text-xs text-gray-800">{islamicDate}</Text>
                        <Text className="text-xs text-gray-800">{gregorianDate}</Text>
                    </View>
                </TouchableOpacity>

                <Text className="text-sm text-gray-800 ml-auto mr-3">
                    {city}, {country}
                </Text>
            </View>

    
            <View className="flex-row items-center">
                <View className="bg-gray-800 h-9 w-9 rounded-lg items-center justify-center">
                    <FontAwesome5 name="bell" size={18} color="white" />
                </View>

                <View className="bg-[#1E2A5A] px-4 py-2 rounded-lg ml-auto mr-3 mt-8">
                    <Text className="text-white font-semibold text-xs">
                        TRACK PRAYER
                    </Text>
                </View>
            </View>

    
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}