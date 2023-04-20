import Header from "./partials/Header";
import Footer from "./partials/Footer";
import type { ReactNode } from "react";
import Head from "next/head";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Singular</title>
        <meta name="description" content="One word." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-3">{children}</main>
      <Footer />
    </>
  );
}
