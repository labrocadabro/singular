import type { PostWithCounts } from "~/server/api/routers/posts";
import HomePost from "./HomePost";
import type { User } from "lucia-auth";

type Props = {
	posts: PostWithCounts[];
	user?: User;
};

export default function PostList({ posts, user }: Props) {
	const postsList = posts.map((post) => (
		<HomePost key={post.id} post={post} user={user} />
	));
	return <ul>{postsList}</ul>;
}
