import { ToastAndroid } from "react-native";
export default function Toast(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
