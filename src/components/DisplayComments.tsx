import type { Post } from "~/utils/preparePostData";

export default function DisplayComments({ data }: { data: Post[] }) {
  return (
    <div style={{ paddingLeft: "20px" }}>
      {data.map((parent) => {
        return (
          <div key={parent.body}>
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
