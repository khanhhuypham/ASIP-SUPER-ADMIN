import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";
import { userSlice } from "./userSlice";
import { loadingSlice } from "./loadingSlice";

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    userData: userSlice.reducer,
    loadingData: loadingSlice.reducer,
});
export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
// // Define RootState type
// export type RootState = ReturnType<typeof rootReducer>;