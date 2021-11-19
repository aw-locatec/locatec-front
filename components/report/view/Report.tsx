import React from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {};

function Report({}: Props) {
   return (
      <View style={styles.container}>
         <Text>Report Screen</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Report;
