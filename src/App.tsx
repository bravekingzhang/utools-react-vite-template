import { useState } from "react";
import { Layout, Menu } from "@arco-design/web-react";
import {
  IconWechat,
  IconCalendar,
  IconArchive,
} from "@arco-design/web-react/icon";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFoundPage from "./pages/404";
import WechatArticleWriter from "./pages/WechatArticleWriter";
import "./App.css";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);
  const navigate = useNavigate();

  const onCollapse = (
    collapsed: boolean | ((prevState: boolean) => boolean)
  ) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_: unknown, { width }: { width: number }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  const handelMenuClick = (key: string) => {
    console.log(key);
    navigate(key);
  };

  return (
    <Layout className="main">
      <Sider
        collapsible
        theme="dark"
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={siderWidth}
        resizeBoxProps={{
          directions: ["right"],
          onMoving: handleMoving,
        }}
      >
        <Menu
          theme="dark"
          autoOpen
          style={{ width: "100%" }}
          onClickMenuItem={handelMenuClick}
        >
          <MenuItem key="wechat_article">
            <IconWechat />
            公众号文章
          </MenuItem>
          <MenuItem key="ppt_writer">
            <IconArchive />
            PPT写手
          </MenuItem>
          <MenuItem key="flow_chart">
            <IconCalendar />
            流程图绘制
          </MenuItem>
          <SubMenu
            key="layout"
            title={
              <span>
                <IconCalendar /> 更多期待
              </span>
            }
          >
            <MenuItem key="novel">讲故事</MenuItem>
            <MenuItem key="markdown">写小说</MenuItem>
            <MenuItem key="coder">写代码</MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
      <Content
        style={{
          background: "rgb(240,255,255)",
          textAlign: "center",
          padding: "30px",
        }}
        className={"content"}
      >
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route
            path="/wechat_article"
            element={<WechatArticleWriter></WechatArticleWriter>}
          />
          <Route path="/detail" element={<Detail></Detail>} />
          <Route path="/*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
