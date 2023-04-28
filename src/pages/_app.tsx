/* eslint-disable */

import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import RootLayout from "~/layouts/RootLayout";
import "~/styles/globals.css";
import { wrapper } from "../store/store";
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <ClerkProvider {...pageProps}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ClerkProvider>
    </Provider>
  );
}

export default api.withTRPC(MyApp);
