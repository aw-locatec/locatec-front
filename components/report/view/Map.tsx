import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../Themed";
import MapView, { MapViewProps } from "../elements/MapView";

type Props = {} & MapViewProps;

function Map({ region, mapViewRef, onPressMap }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>
               지도를 클릭해서 위치를 선택해주세요.
            </Text>
         </View>
         <MapView
            region={region}
            mapViewRef={mapViewRef}
            onPressMap={onPressMap}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   labelContainer: {
      height: 70,
      justifyContent: "center",
   },
   label: {
      fontSize: 16,
      margin: 10,
   },
});

export default React.memo(Map);
