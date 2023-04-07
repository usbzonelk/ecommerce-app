import React from "react";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { useAddNewAdminMutation } from "../../redux/features/users/adminManagement";

const AddNewAdmin = (props) => {
  const { visible, onCancel } = props;
  const [passForm] = Form.useForm();
  const [addNewAdmin, { isLoading: isAdminAdding }] = useAddNewAdminMutation();

  const [submitting, setSubmitting] = useState(false);

  const onFinishPassword = (values) => {
    setSubmitting(true);

    console.log(values);
    addNewAdmin(values);
    setSubmitting(false);
  };

  const onFinishPasswordFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSubmitting(false);
  };

  return (
    <Modal
      title="Add new Admin"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={passForm}
        name="add_new_admin"
        onFinish={onFinishPassword}
        onFinishFailed={onFinishPasswordFailed}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email",
            },
          ]}
        >
          <Input type={"email"} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Name"
          name="adminName"
          rules={[
            {
              required: true,
              message: "Please input admin name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" hidden={true} initialValue={"asdf, xxtz"}>
          <Input />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          hidden={true}
          initialValue={["0777123456"]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="activeState" hidden={true} initialValue={true}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="defualt" htmlType="submit" loading={isAdminAdding}>
            {"Add new Admin"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewAdmin;
