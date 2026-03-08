const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Yahan "./global.css" wohi file hai jo aapne Tailwind ke liye banai hogi
module.exports = withNativeWind(config, { input: "./global.css" });