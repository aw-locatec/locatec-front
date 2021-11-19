import React, { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { deltas } from "../../../constants/Constants";
import { RootState } from "../../../modules";
import { CoordType, RootStackScreenProps } from "../../../types";
import Report from "../view/Report";

function ReportContainer({}: RootStackScreenProps<"Report">) {
   const [position, setPosition] = useState<number>(0); // 현재 페이지
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference
   const pagerRef = useRef<FlatList>() as React.RefObject<FlatList>; // 페이지 reference
   const myLocation = useSelector(({ myLocation }: RootState) => myLocation); // 현재 유저의 위치

   const [region, setRegion] = useState<Region>(myLocation.region); // 현재 지도의 중심
   const dispatch = useDispatch();

   /**
    * 페이지 스크롤 함수
    */
   const scrollToIndex = (to: number) => {
      pagerRef.current?.scrollToIndex({
         index: to,
         animated: true,
         viewPosition: 0,
      });
      setPosition(to);
   };

   /**
    * 다음 페이지, 이전 페이지 이동 함수
    */
   const goNext = useCallback((): void => {
      scrollToIndex(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      scrollToIndex(position - 1);
   }, [pagerRef, position]);

   // 지도를 눌렀을때 그쪽으로 이동 및 region 세팅 함수.
   // 웹일 경우 animateToRegion이 작동하지 않아, 애니메이션없이 세팅만 해준다.
   const onPressMap = (coordinate: CoordType) => {
      setRegion({ ...coordinate, ...deltas });
   };

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         position={position}
         goNext={goNext}
         goPrev={goPrev}
         onPressMap={onPressMap}
      />
   );
}

export default ReportContainer;
