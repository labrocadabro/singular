import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiCommentAdd, BiX } from "react-icons/bi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { modifyOne } from "~/store/commentsSlice";
import type { User } from "lucia-auth";
import { api } from "~/utils/api";

interface FormInput {
	body: string;
}

type Props = {
	parentId?: string;
	user?: User;
};

export default function DialogDemo({ parentId, user }: Props) {
	if (!user) return <></>;
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();
	const utils = api.useContext();
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
			setOpen(false);
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
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className="cursor-pointer border-none p-0 hover:bg-white">
					<BiCommentAdd />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="DialogOverlay" />
				<Dialog.Content className="DialogContent">
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="post">New comment:</label>
						<input
							{...register("body")}
							id="post"
							className="w-full"
							autoComplete="off"
						/>
						<div className="mt-4 flex justify-end">
							<button type="submit" disabled={isSubmitting} className="button">
								Add
							</button>
						</div>
					</form>
					<Dialog.Close asChild>
						<button
							aria-label="Close"
							className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-200"
						>
							<BiX />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
