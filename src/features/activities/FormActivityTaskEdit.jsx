import { DatePicker, Form, Input, Modal, Radio } from "antd";
import React, { useState } from "react";

export default function FormActivityTaskEdit({ task, edit, setEdit }) {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setEdit(false);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Modal
      open={edit}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setEdit(false)}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={task}
          clearOnDestroy
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
      <Form.Item name={"dueDate"} label={"DueDate"}>
        <DatePicker onChange={onChange} />
      </Form.Item>
    </Modal>
  );
}
