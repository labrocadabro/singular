export default function DisplayComments({ data }: { data: any }) {
  return (
    <div style={{ paddingLeft: "20px" }}>
      {data.map((parent: any) => {
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
