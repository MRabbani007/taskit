import { DatePicker, Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { getDate } from "../../data/utils";

const initialValue = {
  title: "",
  detail: "",
  color: "",
  id: "",
};

export default function FormJournalAdd({ setAdd }) {
  const { handleJournalCreate } = useContext(JournalContext);
  const [form] = Form.useForm();
  const [date, setDate] = useState(getDate());

  console.log(getDate());
  const onCreate = async (values) => {
    const newItem = {
      id: crypto.randomUUID(),
      title: values.title,
      detail: values.detail,
      // color: values.color,
      onDate: date,
      planDate: date,
      timeFrom: "",
      timeTo: "",
    };

    await handleJournalCreate(newItem);
    toast.success("Item added");
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <Modal
      open={true}
      title="Add Journal Item"
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setAdd(false)}
      destroyOnClose
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
      <Form.Item name={"detail"} label={"Activity"}>
        <Input />
      </Form.Item>
      {/* <Form.Item name={"color"} label={"Color"}>
        <Input disabled />
      </Form.Item> */}
      <Form.Item name={"onDate"} label={"Date"}>
        <DatePicker
          format={"YYYY-MM-DD"}
          value={dayjs(date, "YYYY-MM-DD")}
          onChange={onChange}
        />
      </Form.Item>
    </Modal>
  );
}
