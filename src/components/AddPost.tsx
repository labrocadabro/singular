import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

interface FormInput {
  body: string;
}

type Props = {
  parentId?: string;
  setCommentAdded?: Dispatch<SetStateAction<number>>;
};

export default function AddPost({ parentId, setCommentAdded }: Props) {
  const utils = api.useContext();
  const { mutateAsync, isSuccess: isPostAdded } = api.posts.addPost.useMutation(
    {
      async onSuccess() {
        await utils.posts.list.invalidate();
        if (setCommentAdded)
          setCommentAdded((prevAdded: number) => prevAdded + 1);
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: { body: "" },
  });
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await mutateAsync({ body: data.body, parentId });
  };

  useEffect(() => {
    if (isSubmitSuccessful && isPostAdded) {
      reset({ body: "" });
    }
  }, [formState, reset, isPostAdded, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting ? (
        "Posting..."
      ) : (
        <>
          <label htmlFor="post">New {parentId ? "comment" : "post"}:</label>
          <input
            {...register("body")}
            id="post"
            className="mx-1"
            autoComplete="off"
          />
          <button type="submit">Add</button>
        </>
      )}
    </form>
  );
}
