import { combineReducers } from "redux";
import loading from "./loading";
import theme from "./theme";
import snackbar from "./snackbar";

// redux reducer 결합
const rootReducer = combineReducers({
   loading,
   theme,
   snackbar,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
