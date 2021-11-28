import axios from "axios";
import { LocationType } from "../types";
import { ADDRESS } from "./address";

// 요청 보내기
export const sendRequestApi = async (item: {
   type: LocationType;
   latitude: number;
   longitude: number;
   image: string | null | undefined;
}) => {
   try {
      await axios.post(`${ADDRESS}/product/register/request`, item);
   } catch (e) {
      throw e;
   }
};
