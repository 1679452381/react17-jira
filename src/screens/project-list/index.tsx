import { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObj, useMount, useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Retryer } from "react-query/types/core/retryer";
import { ButtonNoPadding } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ProjectListScreen() {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // const [keys, setKeys] = useState <('name' | 'personId')[]>(["name", "personId"])
  // const [keys, setKeys] = useState<('name' | 'personId')[]>(["name", "personId"])

  //封装到util.ts
  // const [param, setParam] = useUrlQueryParam(["name", "personId"])
  // const projectParam = { ...param, personId: Number(param.personId) || undefined }

  const [param, setParam] = useProjectSearchParams();
  // const [param] = useUrlQueryParam(keys)
  const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list, retry } = useProjects(debounceParam);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  // console.log(param);

  const { open } = useProjectModal();

  return (
    <Container>
      <Row justify={"space-between"}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
}
ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
//*抽象到use-async.ts中
//loadiong
// const [isLoading, setIsLoading] = useState(false);
//错误处理
// const [error, setError] = useState<null | Error>(null)
// const [list, setList] = useState([]);
//param 当param变化时执行
// useEffect(() => {
//   setIsLoading(true);
//   client("projects", { data: cleanObj(debounceParam) })
//     .then(setList)
//     .catch(err => {
//       setList([])
//       setError(err)
//     })
//     .finally(() => setIsLoading(false));
// }, [debounceParam]);

//*抽象到project.ts中
// const client = useHttp();
// useEffect(() => {
//   run(client("projects", { data: cleanObj(debounceParam) }))
// }, [debounceParam])

//*抽象到user.ts中
// const [users, setUsers] = useState([]);
// useMount(() => {
//   client("users").then(setUsers);
// });
