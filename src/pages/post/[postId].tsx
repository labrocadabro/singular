import { useRouter } from "next/router";
import { api } from "~/utils/api";
import DisplayComments from "~/components/DisplayComments";
import { addCommentData } from "~/utils/addCommentData";
import AddReply from "~/components/AddReply";
import { auth } from "~/auth/lucia";
import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
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

export default function PostDetails(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const router = useRouter();
	let { postId } = router.query;
	if (Array.isArray(postId)) postId = postId[0];
	const { data: postData } = api.posts.byId.useQuery(postId ?? "", {
		enabled: !!postId,
	});
	// TODO: Would prefer to 404 at the API level if possible, otherwise deal with it here
	if (!postData) return <></>;
	const formattedPostData = addCommentData(postData, postData.children);
	return (
		<>
			<h2>Post</h2>
			{postData.parents.map((parent) => (
				<p key={parent.id}>{parent.body}</p>
			))}
			<p>{postData.body}</p>
			<AddReply postId={postData.id} user={props.user ?? undefined} />
			{formattedPostData.children ? (
				<DisplayComments data={formattedPostData.children} />
			) : null}
		</>
	);
	return <p>Test</p>;
}
