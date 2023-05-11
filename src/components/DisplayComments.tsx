import type { PostChildrenUser } from "~/utils/addCommentData";

export default function DisplayComments({
	data,
}: {
	data: PostChildrenUser[];
}) {
	return (
		<div style={{ paddingLeft: "20px" }}>
			{data.map((parent) => {
				return (
					<div key={parent.id} className="border px-3 py-2">
						<p>@{parent.user.username}</p>
						<span>{parent.body}</span>
						{/* Base Condition and Rendering recursive component from inside itself */}
						<div>
							{parent.children && <DisplayComments data={parent.children} />}
						</div>
					</div>
				);
			})}
		</div>
	);
}
