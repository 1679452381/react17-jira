import React from "react";
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  justify-content: ${(poprs) => (poprs.between ? "space-between" : undefined)};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const Fullpage = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => {
  return (
    <Fullpage>
      <Spin size="large" />
    </Fullpage>
  );
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <Fullpage>
      {/* <Typography.Text type="danger">{error?.message}</Typography.Text> */}
      <ErrorBox error={error}></ErrorBox>
    </Fullpage>
  );
};

//类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error?.message}</Typography.Text>;
  }
  return null;
};

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
