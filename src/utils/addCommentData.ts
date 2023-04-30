export type Post = {
  id: string;
  parentId: string | null;
  body: string;
  children?: Post[];
};

export function addCommentData(post: Post, allChildren: Post[]): Post {
  const directChildren: Post[] = [];
  const descendents: Post[] = [];
  allChildren.forEach((child) => {
    if (child.parentId === post.id) directChildren.push(child);
    else descendents.push(child);
  });
  return {
    id: post.id,
    parentId: post.parentId,
    body: post.body,
    children: directChildren.length
      ? directChildren.map((child) => addCommentData(child, descendents))
      : undefined,
  };
}
