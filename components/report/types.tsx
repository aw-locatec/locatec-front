import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { CoordType, ImageLibraryReturn, LocationType } from "../../types";

export type ReportViewProps = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<FlatList>;
   position: number;
   locationType: LocationType;
   photo: ImageLibraryReturn;
   addPhoto: boolean;
   sendRequest: () => Promise<void>;
   selectPhoto: (v: boolean) => Promise<void>;
   settingLocationType: (v: LocationType) => void;
   goNext: () => void;
   goPrev: () => void;
   onPressMap: (coord: CoordType) => void;
   settingAddPhoto: (v: boolean) => void;
};
