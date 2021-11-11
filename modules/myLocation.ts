/**
 * 유저의 현재 위치를 저장하는 store
 */
import { Region } from "react-native-maps";
import { centerSchool } from "../constants/Constants";

// 액션 타입
const SET_MYLOCATION = "theme/SET_MYLOCATION" as const;

// 초기 상태
export type MyLocationType = {
   region: Region; // 유저 위치
   isInside: boolean; // 학교 안인지
};
const initialState: MyLocationType = { region: centerSchool, isInside: false };

// 액션
export const setMyLocation = (markers: MyLocationType) => ({
   type: SET_MYLOCATION,
   value: markers,
});
type ThemeAction = ReturnType<typeof setMyLocation>;

// 리듀서
export default function myLocationReducer(
   state: MyLocationType = initialState,
   action: ThemeAction
): MyLocationType {
   switch (action.type) {
      case SET_MYLOCATION:
         return action.value;
      default:
         return state;
   }
}
