export type PostChildrenUser = {
	id: string;
	parentId: string | null;
	body: string;
	children?: PostChildrenUser[];
	user: { username: string };
};

export function addCommentData(
	post: PostChildrenUser,
	allChildren: PostChildrenUser[]
): PostChildrenUser {
	const directChildren: PostChildrenUser[] = [];
	const descendents: PostChildrenUser[] = [];
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
		user: post.user,
	};
}
