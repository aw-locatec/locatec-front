/**
 * 기초 스타일 element를 다크모드 또는 디자인 통일을 위해 한번 감싼 파일.
 */

import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import {
   IconProps,
   Icon as DefaultIcon,
   Button as DefaultButton,
   ButtonProps,
   SpeedDialProps,
   SpeedDial as DefaultSpeedDial,
   ListItemProps,
   ListItem as DefaultListItem,
} from "react-native-elements";
import useThemeColor from "../hooks/useThemeColor";

// themed elements 의 Props 타입 선언
type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
};
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export type ThemedIconProps = ThemeProps & IconProps;
export type ThemedButtonProps = ThemeProps & ButtonProps & { color?: string };
export type ThemedSpeedDialProps = ThemeProps &
   SpeedDialProps & { color?: string; actions?: ButtonProps[] };
export type ThemedListItemProps = ThemeProps & ListItemProps;

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

export function Button(props: ThemedButtonProps) {
   const {
      lightColor,
      darkColor,
      color,
      buttonStyle,
      type,
      titleStyle,
      ...otherProps
   } = props;
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
   );
   const titleColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonTitle"
   );

   const font = {
      fontFamily: "notosans",
   };

   return (
      <DefaultButton
         type={type}
         titleStyle={[font, titleStyle]}
         {...(() => {
            if (type === "clear") {
               return {
                  titleStyle: [{ color: titleColor, ...font }, titleStyle],
               };
            } else {
               return {
                  buttonStyle: [
                     {
                        backgroundColor: color ? color : backgroundColor,
                        height: 50,
                     },
                     buttonStyle,
                  ],
               };
            }
         })()}
         {...otherProps}
      />
   );
}

export function SpeedDial(props: ThemedSpeedDialProps) {
   const {
      style,
      lightColor,
      darkColor,
      color,
      buttonStyle,
      containerStyle,
      actions,
      ...otherProps
   } = props;

   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
   );

   return (
      <DefaultSpeedDial
         buttonStyle={[
            buttonStyle,
            { backgroundColor: color ? color : backgroundColor },
         ]}
         containerStyle={containerStyle}
         style={style}
         {...otherProps}>
         {actions?.map((item, idx) => (
            <DefaultSpeedDial.Action
               {...item}
               key={idx}
               buttonStyle={[
                  {
                     backgroundColor: color ? color : backgroundColor,
                  },
                  item.buttonStyle,
               ]}
               containerStyle={item.containerStyle}
            />
         ))}
      </DefaultSpeedDial>
   );
}

export function ListItem(props: ThemedListItemProps) {
   const { lightColor, darkColor, containerStyle, children, ...otherProps } =
      props;

   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
   );

   return (
      <DefaultListItem
         containerStyle={[containerStyle, { backgroundColor: backgroundColor }]}
         {...otherProps}>
         {children}
      </DefaultListItem>
   );
}
