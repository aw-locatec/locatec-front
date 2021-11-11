import * as Location from "expo-location";
import { Region } from "react-native-maps";

/** expo-location 에서 관리하는 location 객체를
 * react-native-maps에서 사용하는 Region 객체로 바꿔주기위한 함수
 */
export const parseToRegion = (
   location: Location.LocationObject | null | undefined
): Region => {
   return {
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
   };
};
