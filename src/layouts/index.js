import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  UserAddOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem("Dashboard", "/", <DashboardOutlined />),
  getItem("View Customers", "/customers", <UserOutlined />),
  getItem("Add Customer", "/customers/new", <UserAddOutlined />),
];

const LayoutContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (item) => {
    if (item.key) {
      setSelectedKey(item.key);
      navigate(item.key);
    }
  };
  return (
    <Layout className="main-layout">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          defaultSelectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2023 Reserved</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
