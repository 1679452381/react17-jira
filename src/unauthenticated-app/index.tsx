import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import LoginScreen from "./login";
import Registercreen from "./register";

import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

export const UnAuthenticatedApp = () => {
  useDocumentTitle("请登录");

  const [isRegister, setIsregister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <Registercreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type="link" onClick={() => setIsregister(!isRegister)}>
          {isRegister ? "已有帐号？请登录" : "未注册账号？点击注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 50rem;
  min-height: 50rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  text-align: center;
  padding: 3.2rem 3.2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
