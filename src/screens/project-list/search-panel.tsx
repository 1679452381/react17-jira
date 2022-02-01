export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    personId: string;
    name: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export default function SearchPanel({
  param,
  setParam,
  users,
}: SearchPanelProps) {
  return (
    <>
      <form action="">
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>请选择负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
