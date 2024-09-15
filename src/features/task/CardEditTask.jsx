import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskState";
import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import { getDate } from "../../data/utils";
import { ListContext } from "../../context/ListState";

const CardEditTask = ({ task, setEdit }) => {
  const { handleUpdateTask } = useContext(TaskContext);
  const { lists } = useContext(ListContext);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await handleUpdateTask({ ...task, ...values });
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <Modal
      open={true}
      title="Edit Task"
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={handleReset}
      destroyOnClose={true}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={task}
          clearondestroy
          onFinish={handleSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please enter task",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="details" label="Details">
        <Input type="text" />
      </Form.Item>
      <Form.Item name="listID" label="List">
        <Select value={task?.listID}>
          <Select.Option value={"task_list"}>Select List</Select.Option>
          {lists.map((item, idx) => (
            <Select.Option value={item.id} key={idx}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
};

export default CardEditTask;
