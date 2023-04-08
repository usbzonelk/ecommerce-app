import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  DesktopOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import AdminManageAdmins from "../components/Admin/AdminManageAdmins";
import UserManagement from "../components/Admin/UserManagement";
import ProductManagement from "../components/Admin/ProductManagement";

import {
  useAddNewAdminMutation,
  useAddNewItemMutation,
  useChangeAdminAddressMutation,
  useChangeAdminMailMutation,
  useChangeAdminPassMutation,
  useDeleteItemMutation,
  useDeleteUserMutation,
  useGetAllCheckoutItemsMutation,
  useGetUserInfoMutation,
  useUpdateItemQtyMutation,
  useVerifyNewAdminMutation,
} from "../redux/features/users/adminManagement";
import { useSelector } from "react-redux";
const { Content, Sider } = Layout;
const renderFk = (hook) => {
  return <div>{hook}</div>;
};

const AdminDashboard = () => {
  const uID = useSelector((state) => state.auth.user);
  console.log(uID);
  const [currentMenu, setCurrentMenu] = useState("user-management");

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };

  const renderContent = () => {
    switch (currentMenu) {
      case "user-management":
        return <UserManagement />;
      case "admin-management":
        return <AdminManageAdmins />;
      case "product-management":
        return <ProductManagement />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={handleMenuClick}
          defaultSelectedKeys={["user-management"]}
          mode="inline"
        >
          <Menu.Item key="user-management" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="admin-management" icon={<DesktopOutlined />}>
            Admin Management
          </Menu.Item>

          <Menu.Item key="product-management" icon={<ShopOutlined />}>
            Product Management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
