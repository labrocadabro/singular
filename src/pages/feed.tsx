import { type NextPage } from "next";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import HomePost from "~/components/HomePost";
import { auth } from "~/auth/lucia";

import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
import type { User } from "lucia-auth";

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ user: User }>> => {
	const authRequest = auth.handleRequest(context.req, context.res);
	const { user } = await authRequest.validateUser();
	return {
		props: {
			user,
		},
	};
};

export default function Feed(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const { data: postData } = api.posts.list.useQuery({
		limit: 10,
	});

	return (
		<section>
			<h2>Feed</h2>
			{props.user && <AddPost user={props.user} />}
			<ul>
				{postData?.map((post) => (
					<HomePost key={post.id} post={post} />
				))}
			</ul>
		</section>
	);
}
