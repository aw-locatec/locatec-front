import React, { useEffect, useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { deltas } from "../../../constants/Constants";
import { RootState } from "../../../modules";
import {
   CoordType,
   LocationType,
   RootStackScreenProps,
   SMOKE,
   TRASHCAN,
} from "../../../types";
import Main from "../view/Main";

function MainContainer({}: RootStackScreenProps<"Main">) {
   const [locationType, setLocationType] = useState<LocationType>(SMOKE); // 보여줄 마커 타입. 흡연장소 또는 쓰레기통
   const [markerImages, setMarkerImages] = useState<any>(); // 마커 이미지들
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference
   const markers = useSelector(({ markers }: RootState) => markers); // 리덕스에 저장된 마커 불러들이기
   const myLocation = useSelector(({ myLocation }: RootState) => myLocation); // 현재 유저의 위치

   const [region, setRegion] = useState<Region>(myLocation.region); // 화면 중심 region

   /**
    * 현재 유저의 좌표가 학교 중심좌표에서 0.007 이상 벗어난 위도 경도면 학교 중심을,
    * 아니면 본인위치를 보여주기
    */
   useEffect(() => {
      const mainInit = async () => {
         // 마커 이미지 로드.
         let obj: any = {};
         obj["user"] = require(`../../../assets/images/map_marker_user.png`);
         obj[
            `${SMOKE}`
         ] = require(`../../../assets/images/map_marker_smoking.png`);
         obj[
            `${TRASHCAN}`
         ] = require(`../../../assets/images/map_marker_trash.png`);

         setMarkerImages(obj);
      };
      mainInit();
   }, []);

   useEffect(() => {
      if (myLocation.isInside) {
         setRegion(myLocation.region);
      }
   }, [myLocation, mapViewRef]);

   const onPressMarker = (coord: CoordType) => {
      mapViewRef.current?.animateToRegion(
         {
            ...coord,
            ...deltas,
         },
         1000
      );
   };
   return (
      <Main
         myLocation={myLocation}
         markers={markers}
         markerImages={markerImages}
         region={region}
         mapViewRef={mapViewRef}
         locationType={locationType}
         onPressMarker={onPressMarker}
      />
   );
}

export default MainContainer;
