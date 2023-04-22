import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function PostDetails() {
  const router = useRouter();
  const { postId } = router.query;
  if (Array.isArray(postId) || !postId) return;
  const { data: postData } = api.posts.byId.useQuery(postId);
  return (
    <>
      <h2>Post</h2>
      <p>{postData && postData.body}</p>
    </>
  );
}
