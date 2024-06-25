import {
  DownOutlined,
  LoginOutlined,
  SettingOutlined,
  SmileOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";

export default function UserMenu() {
  const { auth } = useAuth();

  const itemsGuest = [
    {
      key: "1",
      label: <Link to="/login">Sign In</Link>,
      icon: <LoginOutlined style={{ fontSize: "25px" }} />,
    },
    {
      key: "2",
      label: <Link to="/register">Register</Link>,
      icon: <UserAddOutlined style={{ fontSize: "25px" }} />,
      disabled: false,
    },
  ];

  const itemsUser = [
    {
      key: "1",
      label: <Link to="/login">Sign Out</Link>,
      icon: (
        <LoginOutlined style={{ fontSize: "25px", transform: "rotate(180)" }} />
      ),
      danger: true,
    },
    {
      key: "2",
      label: <Link to="/register">Register</Link>,
      icon: <UserAddOutlined style={{ fontSize: "25px" }} />,
      disabled: false,
    },
    {
      key: "3",
      label: <Link to="/user/settings">Settings</Link>,
      icon: <SettingOutlined style={{ fontSize: "25px" }} />,
      disabled: false,
    },
  ];

  const itemsAdmin = [
    {
      key: "1",
      label: <Link to="/login">Sign Out</Link>,
      icon: (
        <LoginOutlined
          style={{ fontSize: "25px", transform: "rotate(180deg)" }}
        />
      ),
      danger: true,
    },
    {
      key: "2",
      label: <Link to="/admin">Admin</Link>,
      icon: <RiAdminLine size={30} />,
      disabled: false,
    },
    {
      key: "3",
      label: <Link to="/settings">Settings</Link>,
      icon: <SettingOutlined style={{ fontSize: "25px" }} />,
      disabled: false,
    },
  ];

  const items =
    auth?.roles && auth.roles.includes(5150)
      ? itemsAdmin
      : auth?.user
      ? itemsUser
      : itemsGuest;

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {auth?.user}
          <UserOutlined style={{ fontSize: "30px" }} />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
