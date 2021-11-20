import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import useLayout, { LayoutType } from "../../../hooks/useLayout";
import { View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import StepIndicator from "../elements/StepIndicator";
import { ReportViewProps } from "../types";
import Info from "./Info";
import Map from "./Map";

function Report({
   region,
   mapViewRef,
   pagerRef,
   position,
   locationType,
   settingLocationType,
   selectPhoto,
   photo,
   sendRequest,
   addPhoto,
   settingAddPhoto,
   goNext,
   goPrev,
   onPressMap,
}: ReportViewProps) {
   const layout = useLayout();

   // 각 페이지에 보여줄 화면 배열
   const contentArray = [
      <Map region={region} mapViewRef={mapViewRef} onPressMap={onPressMap} />,
      <Info
         locationType={locationType}
         settingLocationType={settingLocationType}
         selectPhoto={selectPhoto}
         photo={photo}
         sendRequest={sendRequest}
         addPhoto={addPhoto}
         settingAddPhoto={settingAddPhoto}
      />,
   ];

   return (
      <View style={{ flex: 1 }}>
         <View style={{ alignItems: "center" }}>
            <StepIndicator position={position} />
         </View>
         <FlatList
            ref={pagerRef}
            initialScrollIndex={0}
            horizontal={true}
            data={contentArray}
            keyExtractor={(item, index) => `flaylist_content_${index}`}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
               <View
                  key={`flaylist_content_${index}`}
                  style={[stylesFunc(layout).pagerChildCaontainer]}>
                  <View style={stylesFunc(layout).pageChildInside}>{item}</View>
               </View>
            )}
         />
         <View style={{ alignItems: "center" }}>
            <View style={[stylesFunc(layout).pageChildInside, { height: 60 }]}>
               {position !== 2 && (
                  <NaviButtons
                     position={position}
                     last={position === 1}
                     goNext={goNext}
                     goPrev={goPrev}
                  />
               )}
            </View>
         </View>
      </View>
   );
}
const stylesFunc = ({ window: { width }, isSmallDevice }: LayoutType) =>
   StyleSheet.create({
      pagerChildCaontainer: {
         width: width,
         height: "100%",
         alignItems: "center",
         justifyContent: "center",
      },
      pageChildInside: {
         width: isSmallDevice ? width : WEB_REPORT_CONTENT_WIDTH,
         height: "100%",
         overflow: "hidden",
      },
   });

export default Report;
