import { useContext } from "react";
// Context
import { TaskContext } from "../../context/TaskState";
// AntD
import { Form, Input, Modal, message } from "antd";

export default function FormTagAdd({ task, addTag, setAddTag }) {
  const { handleCreateTag } = useContext(TaskContext);

  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    handleCreateTag({
      name: values?.name,
      id: task?.tags.length,
      taskID: task?.id || "",
    });
    toast.success("Tag added");
    setAddTag(false);
  };

  return (
    <Modal
      open={true}
      title="Create Tag"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setAddTag(false)}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={task}
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
