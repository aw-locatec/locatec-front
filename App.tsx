import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { RootState } from "./modules";
import SnackBar from "rn-animated-snackbar";
import Navigation from "./navigation";
import Loading from "./components/elements/Loading";
import { clearSnackbar } from "./modules/snackbar";
import { DARK, LIGHT } from "./types";

// 리덕스 사용
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(logger))
);

// 루트 앱. 전체 영역을 감싸고, 리덕스 Provider 적용.
// 이 아래에선 리덕스 사용을 위해 RootApp과 App 분리
export default function RootApp() {
   return (
      <SafeAreaProvider style={{ flex: 1 }}>
         <Provider store={store}>
            <App />
         </Provider>
      </SafeAreaProvider>
   );
}

export function App() {
   // 리덕스 store에서 theme 가져와서 navigation, statusBar에 적용.
   const colorScheme = useSelector(({ theme }: RootState) => theme);
   // 리덕스 store에서 snackbar 상태 가져오기
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const dispatch = useDispatch();

   return (
      <View style={{ height: "100%", width: "100%" }}>
         <Navigation colorScheme={colorScheme} />
         <Loading />
         <SnackBar
            visible={Boolean(snackbarState)}
            onDismiss={() => dispatch(clearSnackbar())}
            text={snackbarState}
            duration={3000}
            containerStyle={{
               position: "absolute",
               bottom: 50,
               left: 10,
               width: "60%",
               zIndex: 200,
               borderRadius: 20,
            }}
         />
         <StatusBar style={colorScheme === LIGHT ? DARK : LIGHT} />
      </View>
   );
}
