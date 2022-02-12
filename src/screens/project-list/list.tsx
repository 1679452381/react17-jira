import { render } from "@testing-library/react";
import { Button, Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Pin } from "./pin";
import { User } from "./search-panel";
import { useProjectModal, useProjectsQueryKey } from "./util";

//TODO 把所有id改为number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

// interface ListProps {
//   list: Project[];
//   users: User[];
// }

interface ListProps extends TableProps<Project> {
  users: User[];
  // refresh?: () => void;
  // setProjectModalOpen: (isOpen: boolean) => void;
  // projectButton: JSX.Element;
}

export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "项目",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => {
            return <Link to={`${String(project.id)}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personName",
          key: "personName",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render: (value, project) => {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <Button type={"link"} onClick={editProject(project.id)}>
              编辑
            </Button>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <Button
              type={"link"}
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
