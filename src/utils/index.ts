//工具函数不要改变参数

import { useEffect, useState } from "react";

//判断请求参数的值是否为0
const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObj = (obj: Object) => {
  const result = { ...obj };
  // Object.keys(result).forEach(key => {
  //     const value = result[key]
  //     if (isFalsy(value)) {
  //         delete result[key]
  //     }
  // })
  console.log(result);

  return result;
};

//自定义 hook

//页面挂载执行一次
export const useMount = (callback: () => void) => {
  useEffect(callback, []);
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
