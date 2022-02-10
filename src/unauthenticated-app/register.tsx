import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export default function LoginScreen({
  onError,
}: {
  onError: (err: Error) => void;
}) {
  const { user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    // //阻止默认事件
    // event.preventDefault();
    // console.log(event);
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    const { username, password, cpassword } = values;

    if (password === cpassword) {
      try {
        await run(register({ username, password }));
      } catch (err: any) {
        onError(err);
      }
    } else {
      return onError(new Error("密码不一致"));
    }
  };
  const onFinishFailed = (errinfo: any) => {};
  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input placeholder="请输入账号" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input.Password placeholder="请确认密码" />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
}
