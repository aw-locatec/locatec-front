import React from "react";
import { StyleSheet } from "react-native";
import DefaultMapView, { Marker, Region } from "react-native-maps";
import { CoordType } from "../../../types";
import makeGoogleIcon from "../../../utils/makeGoogleIcon";

export type MapViewProps = {
   region: Region;
   mapViewRef: React.RefObject<DefaultMapView>;
   onPressMap: (coord: CoordType) => void;
};

function MapView({ region, mapViewRef, onPressMap }: MapViewProps) {
   return (
      <DefaultMapView
         key="Gmap"
         ref={mapViewRef}
         region={region}
         style={styles.map}
         defaultZoom={18}
         options={{ disableDefaultUI: true }}
         onPress={(v: any) => {
            onPressMap({
               latitude: v.latLng.lat(),
               longitude: v.latLng.lng(),
            });
         }}>
         <Marker
            coordinate={region}
            icon={makeGoogleIcon(
               require("../../../assets/images/map_marker.png"),
               [48, 48]
            )}
         />
      </DefaultMapView>
   );
}

const styles = StyleSheet.create({
   map: {
      width: "100%",
      height: "100%",
      zIndex: 1,
   },
});

export default MapView;
