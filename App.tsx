import React from "react";
import Application from "@md/index";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store, persistor } from "@md/reducers";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Application />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
