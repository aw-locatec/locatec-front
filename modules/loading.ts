// 액션 타입
const LOADING = "loading/LOADING" as const;
const UNLOADING = "loading/UNLOADING" as const;

// 액션
export const loading = () => ({ type: LOADING });
export const unloading = () => ({ type: UNLOADING });
type LoadingAction = ReturnType<typeof loading> | ReturnType<typeof unloading>;

//초기 상태
export type LoadingState = boolean;
const initialState: LoadingState = false;

// 리듀서
function loadingReducer(
   state: LoadingState = initialState,
   action: LoadingAction
): LoadingState {
   switch (action.type) {
      case LOADING:
         return true;
      case UNLOADING:
         return false;
      default:
         return state;
   }
}

export default loadingReducer;
