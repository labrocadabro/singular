import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

interface FormInput {
  body: string;
}

export default function AddPost() {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    mutate(data.body);
  };
  const { mutate } = api.posts.addPost.useMutation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="post">New post:</label>
      <input {...register("body")} id="post" />
      <input type="submit" />
    </form>
  );
}
