import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { Button, Modal, Form, Table, Input } from "antd";
import {
  useChangeUserAddressMutation,
  useChangeUserMailMutation,
  useChangeUserPassMutation,
  useViewOrdersMutation,
} from "../redux/features/users/userManagement";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const uID = useSelector((state) => state.auth.user);
  console.log(uID);
  const [visible, setVisible] = useState(false);
  const [visibleOrderHistory, setVisibleOrderHistory] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [pastOrders, setPastOrders] = useState({ data: [] });

  const oldUserMail = "ad@lk.lk";
  const oldUserAddress = "01, Main Road, Colombo";
  const userName = "Johnn Doe";

  const [
    changeUserMail,
    { isLoading: isMailLoading, isError: isMailError, error: mailError },
  ] = useChangeUserMailMutation();
  const [
    changeUserAddress,
    {
      isLoading: isAddressLoading,
      isError: isAddressError,
      error: addressError,
    },
  ] = useChangeUserAddressMutation();
  const [
    changeUserPass,
    { isLoading: isPassLoading, isError: isPassError, error: passError },
  ] = useChangeUserPassMutation();
  const [
    viewOrders,
    { isLoading: isOrderLoading, isError: isOrderError, error: orderError },
  ] = useViewOrdersMutation();

  const onFinish = (values) => {
    console.log(values);
    if (values.newAddress != oldUserAddress && values.newEmail != oldUserMail) {
      changeUserAddress(values);
      changeUserMail(values);
    } else if (values.newAddress != oldUserAddress) {
      changeUserAddress(values);
    } else if (values.newEmail != oldUserMail) {
      changeUserMail(values);
    }
  };
  const onFinishPassword = (values) => {
    if (values.currentPass === values.newPass) {
      alert("New password cannot be same as current password");
      return;
    }
    setSubmitting(true);

    console.log(values);
    changeUserPass(values);
    setSubmitting(false);
  };

  const onFinishPasswordFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSubmitting(false);
  };

  return (
    <section className="user-dashboard">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <IoPersonOutline size={150} />
                <h5 className="my-3">{userName}</h5>
                <p className="text-muted mb-1">{oldUserMail}</p>
                <p className="text-muted mb-4">{oldUserAddress}</p>
                <Button type="default" onClick={() => setVisible(true)}>
                  Edit
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setVisibleOrderHistory(true);
                    setPastOrders(viewOrders(uID));
                  }}
                >
                  View Order History
                </Button>
                <Button type="default" onClick={() => setPasswordVisible(true)}>
                  Change Password
                </Button>
                <Modal
                  title="Change Password"
                  open={passwordVisible}
                  onCancel={() => setPasswordVisible(false)}
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
                              new Error(
                                "The two passwords that you entered do not match"
                              )
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
                      <Button
                        type="defualt"
                        htmlType="submit"
                        loading={isPassLoading}
                      >
                        {"Update Password"}
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>

                <Modal
                  title="Edit Details"
                  open={visible}
                  onCancel={() => setVisible(false)}
                  footer={null}
                >
                  <Form onFinish={onFinish}>
                    <Form.Item
                      name="newEmail"
                      label="Email"
                      rules={[{ required: true }]}
                      initialValue={oldUserMail}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="newAddress"
                      label="Address"
                      rules={[{ required: true }]}
                      initialValue={oldUserAddress}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name="id" hidden={true} initialValue={uID}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="oldEmail"
                      hidden={true}
                      initialValue={oldUserMail}
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      type="default"
                      htmlType="submit"
                      loading={isAddressLoading || isMailLoading}
                    >
                      Save
                    </Button>
                  </Form>
                </Modal>

                <Modal
                  title="Your orders"
                  open={visibleOrderHistory}
                  onCancel={() => setVisibleOrderHistory(false)}
                  footer={null}
                >
                  <>
                    {" "}
                    {isOrderLoading && <p>Loading...</p>}
                    {isOrderError && <p>Error loading orders</p>}
                    {"data" in pastOrders ? (
                      pastOrders.data.length < 1 ? (
                        <p>No orders yet</p>
                      ) : (
                        <>
                          <div className="hidden overflow-auto rounded-lg shadow md:block">
                            <table className="w-full">
                              <thead className="border-b-2 border-gray-200 bg-gray-50">
                                <tr>
                                  <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                                    #
                                  </th>

                                  <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                                    Status
                                  </th>
                                  <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                                    Quantity
                                  </th>
                                  <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {pastOrders.data.map((order) => (
                                  <tr className="bg-white">
                                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                                      <a
                                        href="#"
                                        className="font-bold text-blue-500 hover:underline"
                                      >
                                        {order.checkoutID}
                                      </a>
                                    </td>

                                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                                      <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                                        Shipped
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                                      {order.quantity}
                                    </td>
                                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                                      LKR {order.totalPrize}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                            {pastOrders.data.map((order) => (
                              <div className="space-y-3 rounded-lg bg-white p-4 shadow">
                                <div className="flex items-center space-x-2 text-sm">
                                  <div>
                                    <a
                                      href="#"
                                      className="font-bold text-blue-500 hover:underline"
                                    >
                                      {order.checkoutID}
                                    </a>
                                  </div>
                                  <div>
                                    <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                                      Shipped
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                  Quantity: {order.quantity}
                                </div>
                                <div className="text-sm font-medium text-black">
                                  LKR {order.totalPrize}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )
                    ) : (
                      <p>No orders yet</p>
                    )}
                  </>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{oldUserMail}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{oldUserAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
