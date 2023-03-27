import {
  SettingOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { useState } from "react";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Change Password", "1", <SettingOutlined />),
  getItem("Change Address", "2", <MailOutlined />),

  getItem("View Order History", "3", <HistoryOutlined />),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Cart
    </a>,
    "4",
    <ShoppingCartOutlined />
  ),
];

const ChangeSettings = () => {
  const [selectedItem, setSelectedItem] = useState("1");

  const handleMenuSelect = ({ key }) => {
    setSelectedItem(key);
  };

  let content = null;
  switch (selectedItem) {
    case "1":
      content = <div>Navigation Pasword</div>;
      break;
    case "2":
      content = <div>Navigation Address</div>;
      break;
    case "3":
      content = <div>History</div>;
      break;
    default:
      break;
  }

  return (
    <>
      <Menu
        style={{ minWidth: 0, flex: "auto" }}
        defaultSelectedKeys={["1"]}
        mode="horizontal"
        theme="light"
        items={items}
        onSelect={handleMenuSelect}
      />
      {content}
    </>
  );
};

export default ChangeSettings;
