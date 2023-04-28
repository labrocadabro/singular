import { useDispatch } from "react-redux";
import { modifyOne } from "~/store/commentsSlice";
import type { ReactNode } from "react";

type Props = {
  postId: string;
  children: ReactNode;
};

export default function ShowCommentsButton({ postId, children }: Props) {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="border-none p-0"
      onClick={() => {
        {
          dispatch(
            modifyOne({
              id: postId,
              visibleComments: true,
            })
          );
        }
      }}
    >
      {children}
    </button>
  );
}
