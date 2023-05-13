import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { BiCommentAdd, BiCommentMinus } from "react-icons/bi";
import { modifyOne } from "~/store/commentsSlice";
import { useDispatch } from "react-redux";
import type { User } from "lucia-auth";

interface FormInput {
	body: string;
}

type Props = {
	parentId?: string;
	user?: User;
};

export default function AddPost({ parentId, user }: Props) {
	if (!user) return <></>;
	const [showForm, setShowForm] = useState(false);
	const utils = api.useContext();
	const dispatch = useDispatch();
	const { mutateAsync } = api.posts.addPost.useMutation({
		async onSuccess() {
			reset({ body: "" });
			await utils.posts.list.invalidate();
			if (parentId) {
				await utils.posts.getComments.invalidate(parentId);
			}
			dispatch(
				modifyOne({
					id: parentId as string,
					addingNewComment: false,
					visibleComments: true,
				})
			);
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<FormInput>({
		defaultValues: { body: "" },
	});
	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		dispatch(
			modifyOne({
				id: parentId as string,
				addingNewComment: true,
			})
		);
		await mutateAsync({ body: data.body, parentId, userId: user.userId });
	};
	return (
		<>
			{!!parentId &&
				(showForm ? (
					<BiCommentMinus
						onClick={() => {
							setShowForm((prevState) => !prevState);
						}}
					/>
				) : (
					<BiCommentAdd
						onClick={() => {
							setShowForm((prevState) => !prevState);
						}}
					/>
				))}

			{(showForm || !parentId) && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="post">New {parentId ? "comment" : "post"}:</label>
					<input
						{...register("body")}
						id="post"
						className="mx-1"
						autoComplete="off"
					/>
					<button type="submit" disabled={isSubmitting} className="button">
						Add
					</button>
				</form>
			)}
			{!parentId && isSubmitting && "Loading..."}
		</>
	);
}
