//错误边界处理

import React, { Component } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  any
> {
  state = { error: null };

  //* 当子组件抛出异常 这里会接收到并处理
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}
