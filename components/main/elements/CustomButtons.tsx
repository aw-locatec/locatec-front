import React from "react";
import { StyleSheet } from "react-native";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";
import { Button, ThemedButtonProps } from "../../Themed";

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
