import { Platform } from "react-native";

export const baseURL = Platform.select({
  android: process.env.ANDROID_BASE_URL,
  ios: process.env.IOS_BASE_URL,
});
