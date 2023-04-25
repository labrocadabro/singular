import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import type { PostWithCounts } from "~/server/api/routers/posts";

type Props = {
  post: PostWithCounts;
};

export default function HomePost({ post }: Props) {
  const [showComments, setShowComments] = useState(false);
  const { data, isLoading } = api.posts.getComments.useQuery(post.id, {
    enabled: showComments,
  });
  function wrapChildren(children: PostWithCounts[]) {
    return children.map((child) => <HomePost key={child.id} post={child} />);
  }

  return (
    <Link key={post.id} href={`post/${post.id}`}>
      <li className="my-2 border p-2">
        {post.body}
        <span
          className="block"
          onClick={(e) => {
            e.preventDefault();
            setShowComments((prevShow: boolean) => !prevShow);
          }}
        >
          {post._count.directChildren > 0 && !showComments && "Show Comments"}
        </span>
        {showComments && isLoading && <span>Loading...</span>}
        {showComments && data && <ul>{wrapChildren(data)}</ul>}
      </li>
    </Link>
  );
}
