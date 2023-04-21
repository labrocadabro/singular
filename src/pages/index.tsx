import { type NextPage } from "next";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: postData } = api.posts.list.useQuery({ limit: 10 });
  const formatPosts = (posts: Post[]) => {
    return posts.map((post) => <li key={post.id}>{post.body}</li>);
  };
  const posts = postData?.map((post) => (
    <li key={post.id}>
      {post.body}
      <ul>{formatPosts(post.directChildren)}</ul>
    </li>
  ));
  return (
    <>
      <h1>Home</h1>
      <ul>{posts}</ul>
    </>
  );
};

export default Home;
