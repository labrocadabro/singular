import { type NextPage } from "next";
import { api } from "~/utils/api";
import AddPost from "~/components/AddPost";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import HomePost from "~/components/HomePost";

const Home: NextPage = () => {
  const [showComments, setShowComments] = useState(new Set());
  const [commentData, setCommentData] = useState([]);
  function showReplies(e: SyntheticEvent, postId: string) {
    e.preventDefault();
    // query the db for the needed comments
    // add comment data to commentData
    // add parentId to showComments
    // comments can now be conditionally rendered by checking if the post id is in showComments. if yes, look up the comment data from commentData and display it
    // how to show a loading state while comments are loading?
    // need to check the state of isLoading multiple times. useEffect with a dependency on isLoading? no, with useEffect you can't control when it's rendered
    // the obvious thing to do would be to just add "Loading.." (or a component) to commentData and have it render until the actual comment data comes in but I don't know if that would work? Also it would make typescript more difficult
  }
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
