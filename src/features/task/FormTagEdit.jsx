import React, { useContext } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// AntD
import { Form, Input, Modal, message } from "antd";
import toast from "react-hot-toast";

export default function FormTagEdit({ task, tag, setEditTag }) {
  const { handleUpdateTag } = useContext(TaskContext);

  const [form] = Form.useForm();

  const onCreate = (values) => {
    handleUpdateTag({
      ...tag,
      name: values?.name,
      id: tag?.id,
      taskID: task?.id,
    });
    setEditTag(false);
    toast.success("Tag updated");
  };

  return (
    <Modal
      open={true}
      title="Edit Tag"
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setEditTag(false)}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={tag}
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name={"name"} label={"Name"}>
        <Input />
      </Form.Item>
    </Modal>
  );
}
