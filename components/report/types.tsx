import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { CoordType } from "../../types";

export type ReportViewProps = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<FlatList>;
   position: number;
   goNext: () => void;
   goPrev: () => void;
   onPressMap: (coord: CoordType) => void;
};
