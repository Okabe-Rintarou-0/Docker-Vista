import { Col, Menu, Row } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        {label: "Container View", value: "/"},
        {label: "Topological View", value: "/topo"}
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));



    return (
        <Row className="navbar" justify="start">
            <Col>
                <Link to="/">Docker Vista</Link>
            </Col>
            <Col flex="auto">
                <Menu mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    items={navMenuItems}
                    selectedKeys={[selectedKey]}
                />
            </Col>
        </Row>
    )
}