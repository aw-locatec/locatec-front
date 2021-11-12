import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { deltas } from "../../../constants/Constants";
import { RootState } from "../../../modules";
import {
   CoordType,
   LocationType,
   MarkerType,
   RootStackScreenProps,
   SMOKE,
   TRASHCAN,
} from "../../../types";
import calculateEuclidean from "../../../utils/calculateEuclidean";
import isTwoRegionSame from "../../../utils/isTwoRegionSame";
import Main from "../view/Main";

function MainContainer({ navigation }: RootStackScreenProps<"Main">) {
   const [locationType, setLocationType] = useState<LocationType>(SMOKE); // 보여줄 마커 타입. 흡연장소 또는 쓰레기통
   const [markerImages, setMarkerImages] = useState<any>(); // 마커 이미지들
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference
   const markers = useSelector(({ markers }: RootState) => markers); // 리덕스에 저장된 마커 불러들이기
   const myLocation = useSelector(({ myLocation }: RootState) => myLocation); // 현재 유저의 위치
   const [isOpen, setIsOpen] = useState<boolean>(false); // 오른쪽 하단 speedDial이 열려있는지 닫혀있는지

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

   /**
    *  지도의 중심과 이 파일에서 관리하는 region의 상태를 일치시키기 위한 함수
    *
    *
    *  region(지도 중심) 이동이 완료되었을 때 호출되는 이벤트인
    *  onRegionChangeComplete의 콜백함수로 활용.
    *
    *  웹에서는 이미지를 닫기 위해 사용되기도 함.
    *
    *  앱에서는 동작이 불안정하여 사용하지 않음
    */
   const onAnimateRegion = (reg: Region) => {
      if (!isTwoRegionSame(reg, region)) {
         setRegion(reg);
      }
   };
   // 좌측 아래 + 버튼 눌렀을때 호출. 추가요청 페이지로 가기
   const goToReport = () => {
      navigation.navigate("Report");
   };

   const onPressMarker = (coord: CoordType) => {
      mapViewRef.current?.animateToRegion(
         {
            ...coord,
            ...deltas,
         },
         1000
      );
   };
   // 좌측 아래 버튼 중 위 버튼을 눌렀을때 호출.
   // 현재 유저 위치 또는 학교중심에서 가장 가까운 marker로 지도 이동
   const animateToClosest = () => {
      if (markers && myLocation) {
         const center = myLocation.region;
         const curType = markers.filter(
            (marker: MarkerType) => marker.type === locationType
         );
         let closestRegion = curType.length > 0 ? curType[0].coords : center;
         let minLength = calculateEuclidean(center, closestRegion);
         curType.forEach((item) => {
            const curLength = calculateEuclidean(item.coords, center);
            if (curLength < minLength) {
               minLength = curLength;
               closestRegion = item.coords;
            }
         });

         const reg = {
            ...closestRegion,
            ...deltas,
         };
         mapViewRef.current?.animateToRegion(reg, 1000);
         setTimeout(() => setRegion(reg), 1000);
      }
   };

   // 우측하단 speedDial 버튼 열기 닫기 함수
   const toggleIsOpen = useCallback(() => {
      setIsOpen((prev) => !prev);
   }, []);
   // speedDial 을 열었을 때 나오는 버튼을 눌렀을 때 호출됨. 보여줄 marker를 바꿈
   const changeLocationType = (v: LocationType) => {
      setLocationType(v);
      setIsOpen(false);
   };

   return (
      <Main
         myLocation={myLocation}
         markers={markers}
         markerImages={markerImages}
         region={region}
         mapViewRef={mapViewRef}
         locationType={locationType}
         isOpen={isOpen}
         toggleIsOpen={toggleIsOpen}
         changeLocationType={changeLocationType}
         onPressMarker={onPressMarker}
         onAnimateRegion={onAnimateRegion}
         goToReport={goToReport}
         animateToClosest={animateToClosest}
      />
   );
}

export default MainContainer;
