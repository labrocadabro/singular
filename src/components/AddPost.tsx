import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
// In component:

interface FormInput {
  body: string;
}

export default function AddPost() {
  const utils = api.useContext();
  const { mutate, isSuccess: isPostAdded } = api.posts.addPost.useMutation({
    onSuccess() {
      utils.posts.list.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormInput>({ defaultValues: { body: "" } });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutate(data.body);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful && isPostAdded) {
      reset({ body: "" });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="post">New post:</label>
      <input {...register("body")} id="post" />
      <input type="submit" />
    </form>
  );
}
