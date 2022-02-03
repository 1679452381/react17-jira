import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export default function LoginScreen() {
  const { user, login } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止默认事件
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user?.name}
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
