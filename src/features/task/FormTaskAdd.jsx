import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import { Form, Input, message, Modal } from "antd";

const initialValue = {
  title: "",
  detail: "",
};

export default function FormTaskAdd({ listID, setAdd }) {
  const { handleAddTask } = useContext(TaskContext);
  const [form] = Form.useForm();

  const [state, setState] = useState();

  const onCreate = (values) => {
    if (values?.title === "") {
      message.info("Enter new task");
      return;
    } else {
      handleAddTask(listID ?? "", values.title);
      message.success("Task created");
    }
  };

  return (
    <Modal
      open={true}
      title="Add Task"
      okText="Add"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setAdd(false)}
      destroyOnClose={true}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={initialValue}
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name={"title"} label={"Title"}>
        <Input />
      </Form.Item>
      <Form.Item name={"detail"} label={"Detail"}>
        <Input />
      </Form.Item>
    </Modal>
  );
}
