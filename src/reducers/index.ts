import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Store,
  Reducer,
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import appReducer, { State as AppState } from "./app";

export interface ApplicationState {
  app: AppState | undefined;
}

const rootPersistConfig = {
  key: "root",
  whitelist: ["app"],
  storage: AsyncStorage,
};

export const rootApplicationReducerMap = {
  // user: userReducer,
  // plan: planReducer,
  // common: commonReducer,
  app: appReducer,
};

export const rootReducer: Reducer = combineReducers<ApplicationState>(
  rootApplicationReducerMap as any
);

const persistedReducer = persistReducer<ApplicationState>(
  rootPersistConfig,
  rootReducer
);

export const getStore: () => Store = () => {
  return createStore(persistedReducer, applyMiddleware(thunk));
};

export const store = getStore();
export const persistor = persistStore(store);
