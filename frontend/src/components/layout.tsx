import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

export default function BasicLayout({children}: React.PropsWithChildren<{}>) {
    return (
        <Layout className="basic-layout">
            <Header className="header"><NavBar /></Header>
            <Content>
                {children}
            </Content>
            <Footer className="footer">
                <Space>
                    <Link to="/"></Link>
                </Space>
                <div>Docker Vista</div>
            </Footer>
        </Layout>
    )
}