"use client";
import React, { PropsWithChildren } from "react";
import ProviderChakra from "./ProviderChakra";
import ProviderStarknet from "./ProviderStarknet";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProviderScript from "./ProviderScript";
import DefaultLayout from "@/layouts";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderChakra>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProviderStarknet>
            <DefaultLayout>{children}</DefaultLayout>
          </ProviderStarknet>
        </PersistGate>
      </Provider>
      <ProviderScript />
    </ProviderChakra>
  );
};

export default ProviderApp;
