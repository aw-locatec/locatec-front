/**
 * 여러군데서 사용되는 타입의 관리를 위한 파일
 *
 * 한군데서만 사용되는 타입은 그 파일 또는 폴더에 저장함.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// navigation 관련 타입들 선언
declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

export type RootStackParamList = {
   Main: undefined;
   Report: undefined;
   NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;

// 테마 타입들
export const LIGHT = "light" as const;
export const DARK = "dark" as const;

export type ThemeScheme = typeof LIGHT | typeof DARK;
