import { DARK, LIGHT, ThemeScheme } from "../types";

// 액션 타입
const SET_THEME = "theme/SET_THEME" as const;

// 액션
export const setTheme = (theme: string) => ({
   type: SET_THEME,
   value: theme !== LIGHT ? (theme !== DARK ? LIGHT : DARK) : LIGHT,
});
type ThemeAction = ReturnType<typeof setTheme>;

// 초기 상태
const initialState: ThemeScheme = LIGHT;
export type themeState = ThemeScheme;

// 리듀서
export default function themeReducer(
   state: ThemeScheme = initialState,
   action: ThemeAction
): themeState {
   switch (action.type) {
      case SET_THEME:
         return action.value;
      default:
         return state;
   }
}
