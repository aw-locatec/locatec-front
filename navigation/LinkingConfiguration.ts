import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
   prefixes: ["https://aw-locatec.github.io"],
   config: {
      screens: {
         Main: "locatec-main-front/",
         Report: "locatec-main-front/report",
         NotFound: "locatec-main-front/notfound",
      },
   },
};

export default linking;
