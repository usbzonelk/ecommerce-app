import { Button, message, Space, Form, Input } from "antd";
import { useState } from "react";

function ChangePassword() {
  const [newPass0, setnewPass0] = useState("");
  const [oldPass0, setoldPass0] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === "newPass0p") {
      setnewPass0(value);
    } else if (name === "currentPass0p") {
      setoldPass0(value);
    }
  };

  const onFinish = (values) => {
    console.log(values);
    messageApi.open({
      type: "success",
      content: "Password Changed Successfully",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Password Change Failed",
    });
  };

  const matchPassword = (rule, value) => {
    const fieldName = rule.field;

    return new Promise((resolve, reject) => {
      resolve("");
      /*
      if (fieldName === "currentPass") {
        if (value && oldPass0) {
          console.log(value, oldPass0);
          reject("Current Passwords do not match!");
        } else {
          resolve("");
        }
      } else if (fieldName === "newPass") {
        if (value && newPass0) {
          reject("New Passwords do not match!");
        } else {
          resolve("");
        }
      }
      */
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ marginTop: "2rem" }}></div>

        <Form.Item
          label="Current Password"
          name="currentPass0"
          onChange={handleInputChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password name="currentPass0p" />
        </Form.Item>
        <Form.Item
          label="Re-Type Current Password"
          name="currentPass"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { validator: matchPassword },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPass0"
          onChange={handleInputChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password name="newPass0p" />
        </Form.Item>

        <Form.Item
          label="Re-type New Password"
          name="newPass"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { validator: matchPassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="id" hidden>
          {" "}
          <Input hidden value="userID" />
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default ChangePassword;
