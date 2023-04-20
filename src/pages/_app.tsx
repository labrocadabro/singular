import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import RootLayout from "~/layouts/RootLayout";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
