import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  // const close = () => setProjectCreate({ projectCreate: false })
  const close = () => setProjectCreate({ projectCreate: undefined });

  //*返回 元组类型 使用时可以按照顺序自定义命名
  // return [
  //   projectCreate === ' true',
  //   open,
  //   close
  //*当返回内容比较多的时候，用对象
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
