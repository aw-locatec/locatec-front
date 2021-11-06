/**
 * 기초 스타일 element를 다크모드 또는 디자인 통일을 위해 한번 감싼 파일.
 */

import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { IconProps, Icon as DefaultIcon } from "react-native-elements";
import useThemeColor from "../hooks/useThemeColor";

// themed elements 의 Props 타입 선언
type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
};
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export type ThemedIconProps = ThemeProps & IconProps;

// themed elements 정의
export function Text(props: TextProps) {
   // 이 함수에서 사용하는 props은 따로 빼주고, 나머지는 otherProps에 넣는다.
   const { style, lightColor, darkColor, ...otherProps } = props;
   // useThemeColor hook을 활용한 전역 테마 색상 관리.
   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

   return (
      <DefaultText
         style={[{ color }, style, { fontFamily: "notosans" }]}
         {...otherProps}
      />
   );
}

export function View(props: ViewProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
   );

   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Icon(props: ThemedIconProps) {
   const { lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

   return (
      <DefaultIcon
         tvParallaxProperties={undefined}
         color={color}
         {...otherProps}
      />
   );
}
