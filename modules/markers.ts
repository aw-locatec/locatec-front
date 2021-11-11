import { MarkerType } from "../types";

// 액션 타입
const SET_MARKERS = "theme/SET_MARKERS" as const;

// 초기 상태
export type MarkersState = MarkerType[];
const initialState: MarkersState = [];

// 액션
export const setMarkers = (markers: MarkersState) => ({
   type: SET_MARKERS,
   value: markers,
});
type ThemeAction = ReturnType<typeof setMarkers>;

// 리듀서
export default function markersReducer(
   state: MarkersState = initialState,
   action: ThemeAction
): MarkersState {
   switch (action.type) {
      case SET_MARKERS:
         return action.value;
      default:
         return state;
   }
}
