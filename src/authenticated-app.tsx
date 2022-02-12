import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
// import softwareLogo from 'assets/software-logo.svg'
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { reSetRoute } from "utils";
import { ProjectModal } from "screens/project-list/porject-modal";
import { ProjectPopover } from "components/porject-popover";

export const AuthenticatedApp = () => {
  // const [projectModalopen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"projects"} element={<ProjectListScreen />} />
          <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          <Route index element={<Navigate to={"/projects"} />} />
        </Routes>
      </Main>
      <ProjectModal></ProjectModal>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          style={{ padding: 0 }}
          type={"link"}
          onClick={reSetRoute}
        >
          <SoftwareLogo width={"18rem"} color={"rgb(32,138,255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              退出登录
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <a onClick={(evt) => evt.preventDefault()}>Hi,{user?.name}</a>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  /* grid-template-columns:20rem 1fr 20rem;
        grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer"; */
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
// grid - area 给grid子元素起名
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.div``;
