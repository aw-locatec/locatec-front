/**
 * 여러군데서 사용되는 타입의 관리를 위한 파일
 *
 * 한군데서만 사용되는 타입은 그 파일 또는 폴더에 저장함.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Region } from "react-native-maps";

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

//좌표 타입
export type CoordType = {
   latitude: number;
   longitude: number;
};

/* 
   위치 데이터 타입
*/
export const SMOKE = "smoking" as const;
export const TRASHCAN = "trash" as const;

export type LocationType = typeof SMOKE | typeof TRASHCAN;

export type MarkerType = {
   type: LocationType;
   coords: { latitude: number; longitude: number };
   image: string;
};

/* react-native-map 의 MapView에서 onRegionChangeComplete 이벤트 콜백함수의 props 타입*/
export type AnimateRegionType = (
   reg: Region,
   details?:
      | {
           isGesture: boolean;
        }
      | undefined
) => void;
