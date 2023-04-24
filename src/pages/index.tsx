import { type NextPage } from "next";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: postData } = api.posts.list.useQuery({ limit: 10 });
  const posts = postData?.map((post) => (
    <Link key={post.id} href={`post/${post.id}`}>
      <li className="my-2 border p-2">
        {post.body}
        <span className="block">
          Comments: {post._count.directChildren}, Likes: {post._count.likes}
        </span>
      </li>
    </Link>
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
