import { Button, Form, Input } from "antd";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <main>
      <header>
        <div>
          <h1>Forgot Password</h1>
        </div>
      </header>
      <div>
        <Form>
          <Form.Item>Enter your email</Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
