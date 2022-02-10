import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  const fetchPrrojects = () =>
    client("projects", { data: cleanObj(params || {}) });
  useEffect(() => {
    run(fetchPrrojects(), {
      retry: fetchPrrojects,
    });
  }, [params]);
  return result;
};

export const useEditProjects = () => {
  const { run, ...asynvRes } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asynvRes,
  };
};

export const useAddProjects = () => {
  const { run, ...asynvRes } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asynvRes,
  };
};
