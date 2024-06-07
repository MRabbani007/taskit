import { Button, Form, Input, Space } from "antd";
import React, { useContext } from "react";
import { ActivityContext } from "../../context/ActivityState";

export default function FormActivityTaskAdd({ activity, addTask, setAddTask }) {
  const { handleTaskCreate } = useContext(ActivityContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const newActivityTask = {
      id: crypto.randomUUID(),
      activityID: activity?.id,
      resposible: "",
      ...values,
    };
    const result = await handleTaskCreate(newActivityTask);
    if (result) {
      alert("Activity Created");
      // setAddTask(false);
    } else {
      alert("Can not create activity");
    }
  };

  const onReset = () => {
    setAddTask(false);
  };

  return (
    <Form
      layout="vertical"
      name="create_activity_task"
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      className={
        (addTask ? "" : "-translate-y-4 opacity-0 invisible") + " duration-200"
      }
    >
      <Form.Item name={"title"} label={"Title"}>
        <Input />
      </Form.Item>
      <Form.Item name={"detail"} label={"Detail"}>
        <Input />
      </Form.Item>
      <Form.Item name={"responsible"} label={"Responsible"}>
        <Input />
      </Form.Item>
      <Form.Item name={"time"} label={"Time"}>
        <Input disabled />
      </Form.Item>
      <Form.Item name={"dueDate"} label={"DueDate"}>
        <Input disabled />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Close
          </Button>
          {/* <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button> */}
        </Space>
      </Form.Item>
    </Form>
  );
}
