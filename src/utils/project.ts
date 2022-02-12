import { useCallback, useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  //* useQuery(key,()=>{})  key可以是字符串 或者 元组
  // return useQuery('projects', () => client('projects', { data: params }))
  //* 当params变化 useQuery重新触发
  // return useQuery<Project[], Error>(['projects', params], () => client('projects', { data: params }))
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );

  //1.0
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchPrrojects = () =>
  //   client("projects", { data: cleanObj(params || {}) });
  // useEffect(() => {
  //   run(fetchPrrojects(), {
  //     retry: fetchPrrojects,
  //   });
  // }, [params]);
  // return result;
};

export const useEditProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  // const { run, ...asynvRes } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asynvRes,
  // };
};

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  // const { run, ...asynvRes } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asynvRes,
  // };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["projects", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, // Boolean(id)
    }
  );
};
