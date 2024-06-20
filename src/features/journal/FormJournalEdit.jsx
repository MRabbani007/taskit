import React, { useContext, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { getDate } from "../../data/utils";
import { JournalContext } from "../../context/JournalState";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { DatePicker, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const colors = ["green", "blue", "red", "grey"];

export default function FormJournalEdit({ journalItem, setEdit }) {
  const { handleJournalUpdate } = useContext(JournalContext);

  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();

  const onCreate = async (values) => {
    const newItem = {
      ...journalItem,
      title: values.title,
      detail: values.detail,
      color: values.color,
    };
    // console.log(values);
    await handleJournalUpdate(newItem);
    toast.success("Item saved");
    setEdit(false);
  };

  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  // const [selectedDates, setSelectedDates] = useState(dayjs(journalItem.onDate));

  // const DATE_FORMAT = "YYYY-MM-DD";

  // const handleDefaultValue = () => {
  //   if (selectedDates) {
  //     return [
  //       dayjs(defaultValue[0], DATE_FORMAT),
  //       dayjs(defaultValue[1], DATE_FORMAT),
  //     ];
  //   }

  //   return [dayjs(), dayjs()];
  // };

  return (
    <Modal
      open={true}
      title="Edit Journal Item"
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setEdit(false)}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={journalItem}
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
      <Form.Item name={"color"} label={"Color"}>
        <Input disabled />
      </Form.Item>
      {/* <Form.Item name={"onDate"} label={"Date"}>
        <DatePicker
          format={DATE_FORMAT}
          onChange={onChange}
          defaultValue={handleDefaultValue}
        />
      </Form.Item> */}
    </Modal>
  );
}
