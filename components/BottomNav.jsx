import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function BottomNav() {
    return (
        <View className="flex-row justify-around bg-[#1E2A5A] py-4">


            <View className="items-center">
                <MaterialCommunityIcons name="compass-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1">Qiblah</Text>
            </View>
            <View className="items-center">
                <Ionicons name="time-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1">Prayer</Text>
            </View>
            <View className="items-center">
                <Ionicons name="home-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1">Home</Text>
            </View>
            <View className="items-center">
                <MaterialCommunityIcons name="hands-pray" size={24} color="white" />
                <Text className="text-white text-xs mt-1">Dua</Text>
            </View>
            <View className="items-center">
                <Ionicons name="settings-outline" size={24} color="white" />
                <Text className="text-white text-xs mt-1">Settings</Text>
            </View>

        </View>
    );
}