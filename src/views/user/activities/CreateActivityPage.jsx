import { Button, Form, Input, Select, Space } from "antd";
import React, { useContext } from "react";
import { BsActivity } from "react-icons/bs";
import { ActivityContext } from "../../../context/ActivityState";
import useAuth from "../../../hooks/useAuth";
const { Option } = Select;

export default function CreateActivityPage() {
  const { auth } = useAuth();
  const { handleActivityCreate } = useContext(ActivityContext);
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };

  const onFinish = async (values) => {
    const newActivity = {
      id: crypto.randomUUID(),
      ...values,
      ownername: auth?.user,
      color: "",
      icon: "",
    };
    console.log(newActivity);
    const result = await handleActivityCreate(newActivity);
    if (result) {
      alert("Activity Created");
    } else {
      alert("Can not create activity");
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      title: "New Activity",
      detail: "Details about the activity",
    });
  };

  return (
    <main>
      <header className="py-2 px-4 bg-gradient-to-br from-amber-900 to-amber-900 text-white gap-4">
        <BsActivity size={40} />
        <h1 className="font-normal">Create Activity</h1>
      </header>
      <div>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="detail"
            label="Detail"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
