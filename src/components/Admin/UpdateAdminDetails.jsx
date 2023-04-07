import React from "react";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import {
  useChangeAdminAddressMutation,
  useChangeAdminMailMutation,
  useChangeAdminPassMutation,
} from "../../redux/features/users/adminManagement";
import { useSelector } from "react-redux";

const UpdateAdminDetails = (props) => {
  const { visible, onCancel } = props;
  const [passForm] = Form.useForm();
  const [mailForm] = Form.useForm();
  const [changeAdminPass, { isLoading: isPassLoading }] =
    useChangeAdminPassMutation();
  const [changeAdminMail, { isLoading: isMailLoading }] =
    useChangeAdminMailMutation();
  const [submitting, setSubmitting] = useState(false);

  const uID = useSelector((state) => state.auth.user);
  console.log(uID);

  const onFinishPassword = (values) => {
    if (values.currentPass === values.newPass) {
      alert("New password cannot be same as current password");
      return;
    }
    setSubmitting(true);

    console.log(values);
    changeAdminPass(values);
    setSubmitting(false);
  };
  const onFinishMail = (values) => {
    if (values.oldEmail === values.newEmail) {
      alert("New email cannot be same as current email");
      return;
    }
    setSubmitting(true);

    console.log(values);
    changeAdminMail(values);
    setSubmitting(false);
  };

  const onFinishPasswordFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSubmitting(false);
  };
  const onFinishMailFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSubmitting(false);
  };

  return (
    <Modal
      title="Change Details"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={passForm}
        name="password_update"
        onFinish={onFinishPassword}
        onFinishFailed={onFinishPasswordFailed}
        layout="vertical"
      >
        <Form.Item
          name="currentPass"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your old password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPass"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm New Password"
          dependencies={["newPass", "currentPass"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPass") === value) {
                  return Promise.resolve();
                }
                if (getFieldValue("currentPass") === value) {
                  return Promise.reject(
                    new Error(
                      "The new password and old password cannot be the same"
                    )
                  );
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="id" hidden={true} initialValue={uID}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="defualt" htmlType="submit" loading={isPassLoading}>
            {"Update Password"}
          </Button>
        </Form.Item>
      </Form>
      <Form
        form={mailForm}
        name="email_update"
        onFinish={onFinishMail}
        onFinishFailed={onFinishMailFailed}
        layout="vertical"
      >
        <Form.Item
          name="oldEmail"
          label="Current Email"
          rules={[
            {
              required: true,
              message: "Please input your current email",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="newEmail"
          label="New Email"
          rules={[
            {
              required: true,
              message: "Please input your new email",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="defualt" htmlType="submit" loading={isMailLoading}>
            {"Update Email"}
          </Button>
        </Form.Item>
        <Form.Item name="id" hidden={true} initialValue={uID}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateAdminDetails;
