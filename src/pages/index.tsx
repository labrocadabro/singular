import { useRouter } from "next/router";
import { auth } from "~/auth/lucia";

import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
import type { User } from "lucia-auth";
import Link from "next/link";

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

export default function Index(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const router = useRouter();
	return (
		<>
			{props.user ? (
				<>
					<p>You are logged in.</p>
					<button
						onClick={async () => {
							try {
								await fetch("/api/logout", {
									method: "POST",
								});
								router.push("/login");
							} catch (e) {
								console.log(e);
							}
						}}
					>
						Sign out
					</button>
				</>
			) : (
				<Link href="/login">Login</Link>
			)}
		</>
	);
}
