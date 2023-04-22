import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

interface FormInput {
  body: string;
}

export default function AddPost() {
  const utils = api.useContext();
  const { mutate, isSuccess: isPostAdded } = api.posts.addPost.useMutation({
    async onSuccess() {
      await utils.posts.list.invalidate();
    },
  });

  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: { body: "" },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutate(data.body);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful && isPostAdded) {
      reset({ body: "" });
    }
  }, [formState, reset, isPostAdded]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="post">New post:</label>
      <input {...register("body")} id="post" className="mx-1" />
      <button type="submit">Add post</button>
    </form>
  );
}
