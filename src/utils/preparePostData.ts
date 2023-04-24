export type Post = {
  id: string;
  parentId: string | null;
  body: string;
  children?: Post[];
};

export function preparePostData(data: Post, allChildren: Post[]): Post {
  const directChildren: Post[] = [];
  const descendents: Post[] = [];
  allChildren.forEach((child) => {
    if (child.parentId === data.id) directChildren.push(child);
    else descendents.push(child);
  });
  return {
    id: data.id,
    parentId: data.parentId,
    body: data.body,
    children: directChildren.length
      ? directChildren.map((child) => preparePostData(child, descendents))
      : undefined,
  };
}
