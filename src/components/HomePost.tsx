import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { PostWithCounts } from "~/server/api/routers/posts";
import AddPost from "./AddPost";

type Props = {
  post: PostWithCounts;
};

export default function HomePost({ post }: Props) {
  const [showComments, setShowComments] = useState(false);
  const [commentAdded, setCommentAdded] = useState(0);
  const utils = api.useContext();
  const { data, isLoading, fetchStatus } = api.posts.getComments.useQuery(
    post.id,
    {
      enabled: showComments || commentAdded > 0,
    }
  );
  function wrapChildren(posts: PostWithCounts[]) {
    return posts.map((child) => <HomePost key={child.id} post={child} />);
  }
  useEffect(() => {
    void utils.posts.getComments.invalidate();
    // eslint-disable-next-line
  }, [commentAdded]);

  return (
    <li className="my-2 border p-2">
      <Link href={`post/${post.id}`}>{post.body}</Link>
      {!isLoading || fetchStatus === "idle" ? (
        <AddPost parentId={post.id} setCommentAdded={setCommentAdded} />
      ) : (
        <div></div>
      )}
      {post._count.directChildren > 0 &&
        !showComments &&
        !(commentAdded > 0) && (
          <button
            className="mt-2"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowComments((prevShow: boolean) => !prevShow);
            }}
          >
            Show Comments
          </button>
        )}
      {(showComments || commentAdded > 0) && isLoading && (
        <span>Loading...</span>
      )}
      {(showComments || commentAdded > 0) && data && (
        <ul>{wrapChildren(data)}</ul>
      )}
    </li>
  );
}
