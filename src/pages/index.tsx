import { type NextPage } from "next";
import type { Post } from "@prisma/client";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: postData } = api.posts.list.useQuery({ limit: 10 });
  const posts = postData?.map((post) => (
    <li key={post.id}>
      <Link href={`post/${post.id}`}>{post.body}</Link>
    </li>
  ));
  return (
    <section>
      <h2>Feed</h2>
      <AddPost />
      <ul>{posts}</ul>
    </section>
  );
};

export default Home;
