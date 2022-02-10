import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModal: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={props.onClose} visible={props.projectModal} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
