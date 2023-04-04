import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/userAuth/userSlice";

import { PersistPartial } from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ["persist/PERSIST"], // ignore the non-serializable action
  },
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
const persistor = persistStore(store);

export type GetState = RootState;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export { store, persistor };
