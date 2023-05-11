import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import type { User } from "lucia-auth";

interface FormInput {
	body: string;
}

type Props = {
	postId?: string;
	user?: User;
};

export default function AddReply({ postId, user }: Props) {
	if (!user) return <></>;
	const utils = api.useContext();
	const { mutateAsync } = api.posts.addPost.useMutation({
		async onSuccess() {
			reset({ body: "" });
			await utils.posts.byId.invalidate(postId);
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
		await mutateAsync({
			body: data.body,
			parentId: postId,
			userId: user.userId,
		});
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="post">Reply:</label>
				<input
					{...register("body")}
					id="post"
					className="mx-1"
					autoComplete="off"
				/>
				<button type="submit" disabled={isSubmitting}>
					Add
				</button>
			</form>
			{isSubmitting && "Loading..."}
		</>
	);
}
