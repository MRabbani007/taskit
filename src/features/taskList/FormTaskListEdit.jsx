import { Form, Input, Modal, Radio } from "antd";
import React, { useContext, useState } from "react";
import { listTemplates } from "../../data/templates";
import { ListContext } from "../../context/ListState";

const initialState = { id: "", title: "", detail: "", icon: "", tasks: [] };

export default function FormTaskListEdit({
  edit,
  setEdit,
  taskList = initialState,
}) {
  const { handleUpdateList } = useContext(ListContext);

  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();

  const [state, setState] = useState(taskList);

  const onChange = (event) => {
    setState((curr) => ({ ...curr, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async () => {
    await handleUpdateList(state);

    setEdit(false);
  };

  return (
    <Modal
      open={edit}
      onOk={handleSubmit}
      title="Edit List"
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={() => setEdit(false)}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          // form={form}
          name="form_in_modal"
          initialValues={taskList}
          onFinish={handleSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item name="title" label="Title">
        <Input value={state.title} onChange={onChange} />
      </Form.Item>
      <Form.Item name="detail" label="Detail">
        <Input value={state.detail} onChange={onChange} />
      </Form.Item>
      <Form.Item name="icon" label="icon">
        <Radio.Group
          className="flex flex-wrap items-center gap-2"
          name="icon"
          id="icon"
          value={state.icon}
          onChange={onChange}
        >
          {listTemplates.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <Radio value={item?.icon} />
              <img
                src={item?.icon}
                className={
                  (taskList?.icon === item?.icon ? "bg-yellow-200" : "") +
                  " duration-200 w-12"
                }
              />
            </div>
          ))}
        </Radio.Group>
      </Form.Item>
    </Modal>
  );
}
