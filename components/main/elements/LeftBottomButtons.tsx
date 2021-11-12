import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";
import { View } from "../../Themed";
import { FloatingButton } from "./CustomButtons";

type Props = {
   goToReport: () => void;
   animateToClosest?: () => void;
};

function LeftBottomButtons({ goToReport, animateToClosest }: Props) {
   return (
      <View style={[styles.buttonCol, { left: 0 }]}>
         <FloatingButton
            color={Colors.colorSet.stRed}
            icon={{
               name: "location-arrow",
               type: "font-awesome",
               color: "white",
            }}
            onPress={animateToClosest}
         />
         <FloatingButton
            color={Colors.colorSet.stBlue}
            icon={{
               name: "plus",
               type: "font-awesome",
               color: "white",
            }}
            onPress={goToReport}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   buttonCol: {
      position: "absolute",
      bottom: 10,
      height: FLOATING_BUTTON_WIDTH * 2 + 20,
      backgroundColor: "transparent",
      justifyContent: "space-around",
      paddingLeft: 20,
      paddingRight: 20,
      zIndex: 1,
   },
});

export default LeftBottomButtons;
