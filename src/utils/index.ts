//工具函数不要改变参数

import { useEffect, useRef, useState } from "react";

//判断请求参数的值是否为0
const isFalsy = (value: unknown) => (value === 0 ? false : !value);
const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObj = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

//自定义 hook

//页面挂载执行一次
//TODO 依赖里加上callback会无限循环 这个和useCallback 和useMemo 有关
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
// 防抖 节流
// const debounce = (fn, delay) => {
//     let t = null
//     return () => {
//         if (t) {
//             clearTimeout(t)
//         }
//         if (!t) fn.apply(this);
//         t = setTimeout(() => {
//             t = null
//         }, delay)
//     }
// }
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceParam, setDebounceParam] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounceParam(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounceParam;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // const oldTitle = document.title
  //使用useRef()保存 document.title
  const oldTitle = useRef(document.title).current;
  //页面加载时 oldTilte为 React app
  // 加载后 oldTitle 为 加载后的title

  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖 此时oldTitle为加载时的oldTitle :React app
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

//重置路由
export const reSetRoute = () => (window.location.href = window.location.origin);
