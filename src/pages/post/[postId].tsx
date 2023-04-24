import { useRouter } from "next/router";
import { api } from "~/utils/api";
import DisplayComments from "../../components/DisplayComments";
import { preparePostData } from "~/utils/preparePostData";

export default function PostDetails() {
  const router = useRouter();
  const { postId } = router.query;
  if (Array.isArray(postId) || !postId) return;
  const { data: postData } = api.posts.byId.useQuery(postId);
  if (!postData) return;
  const formattedPostData = preparePostData(postData, postData?.children);
  return (
    <>
      <h2>Post</h2>
      <p>{postData.body}</p>
      {formattedPostData.children ? (
        <DisplayComments data={formattedPostData.children} />
      ) : null}
    </>
  );
}
