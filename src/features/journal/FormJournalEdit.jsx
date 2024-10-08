import React, { useContext, useState } from "react";
import { JournalContext } from "../../context/JournalState";
import { DatePicker, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { getDate } from "../../data/utils";
import dayjs from "dayjs";

const colors = ["green", "blue", "red", "grey"];

export default function FormJournalEdit({ journalItem, setEdit }) {
  const { handleJournalUpdate } = useContext(JournalContext);

  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();
  const [date, setDate] = useState(journalItem?.onDate ?? getDate());

  const onCreate = async (values) => {
    const newItem = {
      ...journalItem,
      title: values.title,
      detail: values.detail,
      // color: values.color,
      onDate: date,
      planDate: date,
    };
    // console.log(values);
    await handleJournalUpdate(newItem);
    toast.success("Item saved");
    setEdit(false);
  };

  const onChange = (date, dateString) => {
    // console.log(date, dateString);
    setDate(dateString);
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
      {/* <Form.Item name={"color"} label={"Color"}>
        <Input disabled />
      </Form.Item> */}
      <Form.Item label={"Date"}>
        <DatePicker
          format={"YYYY-MM-DD"}
          value={dayjs(date, "YYYY-MM-DD")}
          onChange={onChange}
        />
      </Form.Item>
    </Modal>
  );
}
