/**
 * 현재 유저의 위치를 얻고, 지도에 활용하기 위해 Region 타입으로 바꿔서 리턴해줌
 */

import * as Location from "expo-location";
import { centerSchool } from "../constants/Constants";
import { INSIDE_SHCOOL } from "../constants/Size";
import { parseToRegion } from "./parseLocation";

export default async function getMyRegion() {
   let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== "granted") {
      throw Error();
   }

   // 위치 불러오기 메소드가 불안정하여, 성공할때까지 반복.
   // 50회 반복하면 실패로 도림
   let location;
   let locationSuccess = false;
   let tryCount = 0;
   while (!locationSuccess && tryCount < 50) {
      try {
         location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
         });
         locationSuccess = true;
      } catch (e) {
         tryCount++;
      }
   }
   const parsed = parseToRegion(location);

   // 학교 중심을 중심으로 하는, 길이 0.014 의 정사각형 안에 있을 경우 학교 안이라고 판정
   let isInside = false;
   if (
      parsed.latitude <= centerSchool.latitude + INSIDE_SHCOOL &&
      parsed.longitude <= centerSchool.longitude + INSIDE_SHCOOL &&
      parsed.latitude >= centerSchool.latitude - INSIDE_SHCOOL &&
      parsed.longitude >= centerSchool.longitude - INSIDE_SHCOOL
   ) {
      isInside = true;
   }
   return { parsed, isInside };
}
