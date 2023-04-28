import type { PostWithCounts } from "~/server/api/routers/posts";
import HomePost from "./HomePost";

type Props = {
  posts: PostWithCounts[];
};

export default function PostList({ posts }: Props) {
  const postsList = posts.map((post) => <HomePost key={post.id} post={post} />);
  return <ul>{postsList}</ul>;
}
