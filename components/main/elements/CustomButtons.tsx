import React from "react";
import { StyleSheet } from "react-native";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";
import {
   Button,
   SpeedDial,
   ThemedButtonProps,
   ThemedSpeedDialProps,
} from "../../Themed";

// 좌측 하단 floating button 스타일 적용을 위한 한번 더 감싸기
export function FloatingButton({ color, ...otherProps }: ThemedButtonProps) {
   return (
      <Button
         containerStyle={styles.buttonContainer}
         buttonStyle={[styles.buttonStyle]}
         color={color}
         raised
         {...otherProps}
      />
   );
}

// 우측 하단 speedDial 스타일 적용을 위한 한번 더 감싸기
export function CustomSpeedDial({
   color,
   actions,
   buttonStyle,
   containerStyle,
   ...otherProps
}: ThemedSpeedDialProps) {
   return (
      <SpeedDial
         buttonStyle={[styles.buttonStyle, buttonStyle]}
         containerStyle={[styles.buttonContainer, containerStyle]}
         color={color}
         actions={actions?.map((item) => ({
            ...item,
            containerStyle: [styles.actionButtonContainer, item.containerStyle],
            buttonStyle: [styles.actionButtonStyle, item.buttonStyle],
         }))}
         raised
         {...otherProps}
      />
   );
}

const styles = StyleSheet.create({
   buttonContainer: {
      width: FLOATING_BUTTON_WIDTH,
      height: FLOATING_BUTTON_WIDTH,
      borderRadius: 30,
      overflow: "hidden",
   },
   buttonStyle: {
      width: FLOATING_BUTTON_WIDTH,
      height: FLOATING_BUTTON_WIDTH,
      borderRadius: 30,
   },
   actionButtonContainer: {
      width: FLOATING_BUTTON_WIDTH - 5,
      height: FLOATING_BUTTON_WIDTH - 5,
      borderRadius: 30,
      overflow: "hidden",
   },
   actionButtonStyle: {
      width: FLOATING_BUTTON_WIDTH - 5,
      height: FLOATING_BUTTON_WIDTH - 5,
      borderRadius: 30,
   },
});
