import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { type } from "os";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toLowerCase() === "get") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }
  // console.log(`${apiUrl}`);
  // console.log(`${endpoint}`);
  // console.log(`${apiUrl}/${endpoint}`);

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  //TODO ts操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// //* 联合类型
// let a: number | string

// let c: b
// //* 交叉类型
// type d = number & string

// //* 类型别名，在这种情况下，没法替代type
// type b = number | string

// // interface没法实现 utility type

// type Person = {
//     name: string,
//     age: number
// }

// //utility type
// const zxc: Person = { name: 'zxc', age: 12 }
// //*  Partial 可以将类型的属性变为可选属性
// const zsc: Partial<Person> = { name: 'zxc' }

// //* Omit 可以删除类型中不需要的属性
// const shenmiren: Omit<Person, "name"> = { age: 32 }
// const shenmiren2: Omit<Person, 'name' | 'age'> = {}
