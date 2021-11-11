import { combineReducers } from "redux";
import loading from "./loading";
import theme from "./theme";
import snackbar from "./snackbar";
import markers from "./markers";
import myLocation from "./myLocation";

// redux reducer 결합
const rootReducer = combineReducers({
   loading,
   theme,
   snackbar,
   markers,
   myLocation,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
