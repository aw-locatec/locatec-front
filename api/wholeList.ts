import axios from "axios";
import { ADDRESS } from "./address";

// 전체 리스트 받기
export const getWholeListApi = async () => {
   try {
      const res = await axios.get(`${ADDRESS}/product/find/registered`);
      return res.data.response;
   } catch (e) {
      throw e;
   }
};
