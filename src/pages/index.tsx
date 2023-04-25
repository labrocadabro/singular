import { type NextPage } from "next";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import HomePost from "~/components/HomePost";

const Home: NextPage = () => {
  const { data: postData } = api.posts.list.useQuery({ limit: 10 });
  const posts = postData?.map((post) => <HomePost key={post.id} post={post} />);
  return (
    <section>
      <h2>Feed</h2>
      <AddPost />
      <ul>{posts}</ul>
    </section>
  );
};

export default Home;
