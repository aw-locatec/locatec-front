import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch as DefaultSwitch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { setTheme } from "../../modules/theme";
import { DARK, LIGHT, ThemeScheme } from "../../types";
import { View } from "../Themed";

/**
 * 다크모드-라이트모드 변경을 위한 스위치 element
 */
export default function Switch() {
   // 다크모드일경우 false
   const [value, setValue] = useState(true);
   const theme = useSelector(({ theme }: RootState) => theme);
   const dispatch = useDispatch();

   useEffect(() => {
      // 초기 상태가 다크모드일경우 value를 false로.
      if (theme === DARK) {
         setValue(false);
      }
   }, []);

   // 유저가 스위치를 눌러서 모드 변경 시 redux는 물론, 로컬스토리지에서의 값도 변경
   const onPress = async (v: boolean) => {
      setValue(v);
      let theme: ThemeScheme = LIGHT;
      if (!v) {
         theme = DARK;
      }
      await AsyncStorage.setItem("theme", theme);
      dispatch(setTheme(theme));
   };

   return (
      <View style={{ backgroundColor: "transparent", width: 50 }}>
         <DefaultSwitch value={value} onValueChange={onPress} />
      </View>
   );
}
