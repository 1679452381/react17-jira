import { User } from "screens/project-list/search-panel";
import { cleanObj, useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (params?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useMount(() => {
    run(client("users", { data: cleanObj(params || {}) }));
  });
  return result;
};
