import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();

  const { open } = useProjectModal();

  const pinProjects = projects?.filter((project) => project.pin);
  const content = (
    <Container>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <Divider />
      <List>
        {pinProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </Container>
  );
  return (
    <Popover trigger={"hover"} placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 25rem;
`;
