import React, { useState } from "react";
import LoginScreen from "./login";
import Registercreen from "./register";

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);
  return (
    <div>
      {isRegister ? <Registercreen /> : <LoginScreen />}
      <button onClick={() => setIsregister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
