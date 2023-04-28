import { type NextPage } from "next";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import HomePost from "~/components/HomePost";

const Home: NextPage = () => {
  const { data: postData } = api.posts.list.useQuery({
    limit: 10,
  });

  return (
    <section>
      <h2>Feed</h2>
      <AddPost />
      <ul>
        {postData?.map((post) => (
          <HomePost key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default Home;
