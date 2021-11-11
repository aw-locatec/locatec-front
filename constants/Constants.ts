/**
 * 여러군데서 사용되는 상수 관리.
 */
import { Platform } from "react-native";
import { Region } from "react-native-maps";

export const isWeb: boolean = Platform.OS === "web" ? true : false;

export const deltas: { latitudeDelta: number; longitudeDelta: number } = {
   latitudeDelta: 0.003,
   longitudeDelta: 0.003,
};

export const centerSchool: Region = {
   latitude: 37.63232307069136,
   longitude: 127.07801836259382,
   ...deltas,
};
