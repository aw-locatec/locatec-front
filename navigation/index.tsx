import React from "react";
import {
   NavigationContainer,
   DefaultTheme,
   DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportScreen from "../screens/ReportScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";

import {
   DARK,
   RootStackParamList,
   RootStackScreenProps,
   ThemeScheme,
} from "../types";
import { appName } from "../constants/Strings";
import Switch from "../components/elements/Switch";
import { Icon } from "../components/Themed";
import { isWeb } from "../constants/Constants";
import linking from "./LinkingConfiguration";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * 총 세 화면으로 구성
 * Main : 처음 화면. 지도와 세개의 버튼을 보여줌.
 *    오른쪽 상단엔 다크모드로 전환할 수 있는 스위치 렌더
 *
 * NotFound : 잘못 접근했을 경우 보여주는 페이지
 *
 * Report : 추가 요청을 보내기위한 페이지
 *  */

export default function Navigation({
   colorScheme,
}: {
   colorScheme: ThemeScheme;
}) {
   return (
      <NavigationContainer
         theme={colorScheme === DARK ? DarkTheme : DefaultTheme}
         linking={linking}>
         <Stack.Navigator>
            <Stack.Screen
               name="Main"
               component={MainScreen}
               options={() => ({
                  title: appName,
                  headerRight: () => <Switch />, // 메인화면에서 오른쪽 상단에 다크모드 전환을 위한 스위치 렌더
               })}
            />
            <Stack.Screen
               name="NotFound"
               component={NotFoundScreen}
               options={{ title: "여긴 어디?" }}
            />
            <Stack.Screen
               name="Report"
               component={ReportScreen}
               options={({ navigation }: RootStackScreenProps<"Report">) => ({
                  title: "추가 요청",
                  headerTitleStyle: { fontFamily: "notosans" },
                  headerLeft: () => (
                     <Icon
                        name="arrow-back"
                        onPress={() => navigation.navigate("Main")}
                        containerStyle={{
                           marginRight: isWeb ? 0 : 10,
                           marginLeft: isWeb ? 10 : 0,
                        }}
                        size={24}
                     />
                  ),
               })}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
