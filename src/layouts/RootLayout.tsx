import Header from "./partials/Header";
import Footer from "./partials/Footer";
import type { ReactNode } from "react";
import Head from "next/head";
import type { User } from "lucia-auth";

type Props = {
	children: ReactNode;
	user: User;
};

export default function Layout({ children, user }: Props) {
	return (
		<>
			<Head>
				<title>Singular</title>
				<meta name="description" content="One word." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header user={user} />
			<main className="mx-auto max-w-[400px] border p-4">{children}</main>
			<Footer />
		</>
	);
}
