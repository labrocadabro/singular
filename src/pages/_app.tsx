import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import RootLayout from "~/layouts/RootLayout";
import "~/styles/globals.css";
import { wrapper } from "~/store/store";
import { auth } from "~/auth/lucia";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { User } from "lucia-auth";

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ user: User | null }>> => {
	const authRequest = auth.handleRequest(context.req, context.res);
	const { user } = await authRequest.validateUser();
	return {
		props: {
			user,
		},
	};
};

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);
	const { pageProps } = props;
	return (
		<Provider store={store}>
			<RootLayout user={pageProps?.user}>
				<Component {...pageProps} />
			</RootLayout>
		</Provider>
	);
}

export default api.withTRPC(MyApp);
