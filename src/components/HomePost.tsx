import Link from "next/link";
import { api } from "~/utils/api";
import type { PostWithCounts } from "~/server/api/routers/posts";
import AddPost from "./AddPost";
import type { AppState } from "~/store/store";
import { useSelector } from "react-redux";
import PostList from "./PostList";
import ShowCommentsButton from "./ShowCommentsButton";
import { BiCommentDetail, BiHeart } from "react-icons/bi";
import type { User } from "lucia-auth";

type Props = {
	post: PostWithCounts;
	user?: User;
};

export default function HomePost({ post, user }: Props) {
	const commentsState = useSelector((state: AppState) => state.comments);
	const { data: commentData, isLoading } = api.posts.getComments.useQuery(
		post.id,
		{
			enabled: !!commentsState[post.id]?.visibleComments,
		}
	);
	return (
		<li className="my-2 border p-2">
			<p>@{post.user.username}</p>
			<Link href={`post/${post.id}`} className="block">
				{post.body}
			</Link>
			{post._count.directChildren > 0 &&
			!commentsState[post.id]?.visibleComments ? (
				<ShowCommentsButton postId={post.id}>
					<BiCommentDetail className="inline" /> {post._count.directChildren}
				</ShowCommentsButton>
			) : (
				<>
					<BiCommentDetail className="inline" /> {post._count.directChildren}
				</>
			)}
			<BiHeart className="ml-10 inline" /> {post._count.likes}
			<AddPost parentId={post.id} user={user} />
			{((!!commentsState[post.id]?.visibleComments && isLoading) ||
				!!commentsState[post.id]?.addingNewComment) &&
				"Loading..."}
			{commentData && <PostList posts={commentData} user={user} />}
		</li>
	);
}
