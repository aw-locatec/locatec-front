/**
 * 요청 완료시 나오는 화면
 */
import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../../Themed";
import Colors from "../../../constants/Colors";
import {
   apply_after_inspect,
   thankyou_for_using,
} from "../../../constants/Strings";

// 애니메이션 로드
const completion_animation = require("../../../assets/animations/completion.json");

type Props = {
   gotoHome: () => void;
   gotoReport: () => void;
};

function Complete({ gotoHome, gotoReport }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.lottieContainer}>
            <LottieView
               source={completion_animation}
               autoPlay={true}
               loop={true}
               style={{ width: 300, height: 225 }}
            />
            <View style={styles.textContainer}>
               <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  {thankyou_for_using}
               </Text>
               <Text style={{ fontSize: 20 }}>{apply_after_inspect}</Text>
            </View>
         </View>
         <View style={styles.goBackContainer}>
            <Button
               title="홈으로"
               containerStyle={styles.buttonContainer}
               onPress={gotoHome}
               color={Colors.colorSet.stBlue}
            />
            <Button
               title="다시 요청"
               containerStyle={styles.buttonContainer}
               onPress={gotoReport}
               color={Colors.colorSet.stGray}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   lottieContainer: {
      width: "100%",
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      right: 10,
   },
   textContainer: {
      width: "100%",
      alignItems: "center",
   },
   goBackContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      alignItems: "center",
   },
   buttonContainer: {
      width: 100,
   },
});

export default Complete;
