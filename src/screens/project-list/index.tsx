import { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import * as qs from "qs";

import { cleanObj, useMount, useDebounce } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectListScreen() {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debounceParam = useDebounce(param, 2000);
  //param 当param变化时执行
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(debounceParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debounceParam]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </>
  );
}
