import { useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idel" | "success" | "error" | "loading";
}

const defaulInitialState: State<null> = {
  stat: "idel",
  error: null,
  data: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaulInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };
  const setError = (error: Error) => {
    setState({
      error,
      stat: "error",
      data: null,
    });
  };
  //记录组件状态
  const mountedRef = useMountedRef();

  const run = (
    promise: Promise<D>,
    retryConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise数据类型");
    }
    setRetry(() => () => {
      if (retryConfig?.retry) {
        run(retryConfig?.retry(), retryConfig);
      }
    });
    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((data) => {
        if (mountedRef.current) setData(data);
        return data;
        //catch会消化异常
      })
      .catch((error) => {
        setError(error);
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdel: state.stat === "idel",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    //retry被调用时重新运行run ,刷新state
    retry,
    ...state,
  };
};
