import { smokingPlace, trashcan } from "../constants/Strings";
import { LocationType, SMOKE, TRASHCAN } from "../types";

// location type 을 해당하는 문자열로 바꾸어주는 함수
export default function mapLocTypeToStr(type: LocationType) {
   switch (type) {
      case SMOKE:
         return smokingPlace;
      case TRASHCAN:
         return trashcan;
      default:
         return smokingPlace;
   }
}

// 문자열을 해당하는 location type으로 바꾸어주는 함수
export function mapStrToLocType(str: string) {
   switch (str) {
      case smokingPlace:
         return SMOKE;
      case trashcan:
         return TRASHCAN;
      default:
         return SMOKE;
   }
}
