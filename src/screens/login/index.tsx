import React, { FormEvent } from "react";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginScreen() {
  interface LoginInfo {
    username: string;
    password: string;
  }
  const login = (param: LoginInfo) => {
    // console.log(JSON.stringify(param));

    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止默认事件
    event.preventDefault();
    // console.log(event);
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">账号</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
}
