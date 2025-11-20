import { Platform } from 'react-native';
import { ANDROID_BASE_URL, IOS_BASE_URL } from "@env";

export const baseURL = Platform.select({
  android: ANDROID_BASE_URL,
  ios: IOS_BASE_URL,
});