import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { MyLocationType } from "../../../modules/myLocation";
import { CoordType, LocationType, MarkerType } from "../../../types";
import isTwoRegionSame from "../../../utils/isTwoRegionSame";
import makeGoogleIcon from "../../../utils/makeGoogleIcon";
import { View } from "../../Themed";

type Props = {
   mapViewRef: React.RefObject<MapView>;
   markers: MarkerType[] | undefined;
   region: Region;
   markerImages: any | undefined;
   myLocation: MyLocationType;
   locationType: LocationType;
   onPressMarker: (v: CoordType) => void;
};

function Main({
   mapViewRef,
   markers,
   region,
   markerImages,
   myLocation,
   locationType,
   onPressMarker,
}: Props) {
   return (
      <View style={{ flex: 1 }}>
         <View style={styles.container}>
            <MapView
               key="Gmap"
               ref={mapViewRef}
               region={region}
               style={styles.map}
               defaultZoom={18}
               options={{ disableDefaultUI: true }}>
               {
                  // 유저 위치에 마커 보여주기. 학교 밖이면 보여주지 않음.
                  // 웹에서는 누르면 그 곳으로 지도의 중심을 이동하도록 onPress 이벤트를 등록함
                  markerImages && myLocation.isInside && (
                     <Marker
                        key="marker_user"
                        coordinate={myLocation.region}
                        icon={makeGoogleIcon(markerImages["user"], [48, 48])}
                        onPress={(v) =>
                           onPressMarker({
                              latitude: v?.latLng?.lat(),
                              longitude: v?.latLng?.lng(),
                           })
                        }
                     />
                  )
               }
               {
                  // marker.filter() 를 통해 현재 보여줄 타입의 마커만 보여줌.
                  markerImages &&
                     markers
                        ?.filter(
                           (marker: MarkerType) => marker.type === locationType
                        )
                        .map((item: MarkerType, idx: number) => (
                           <Marker
                              key={`marker_${idx}`}
                              coordinate={item.coords}
                              icon={
                                 // 현재 center와 marker가 같다면 등록된 이미지를 보여줌.
                                 // 등록된 이미지가 없으면 마커를 보여준다
                                 isTwoRegionSame(region, item.coords) &&
                                 item.image
                                    ? makeGoogleIcon(item.image, [400, 300])
                                    : makeGoogleIcon(
                                         markerImages[`${locationType}`],
                                         [48, 48]
                                      )
                              }
                              onPress={(v) =>
                                 onPressMarker({
                                    latitude: v?.latLng?.lat(),
                                    longitude: v?.latLng?.lng(),
                                 })
                              }
                           />
                        ))
               }
            </MapView>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   map: {
      width: "100%",
      height: "100%",
      zIndex: 1,
   },
});

export default Main;
