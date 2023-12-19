import { Col, Menu, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    const navItems = [
        {label: "Container View", value: "/"},
        {label: "Layer View", value: "/layer"}
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }))
    return (
        <Row className="navbar" justify="start">
            <Col>
                <Link to="/">Docker Vista</Link>
            </Col>
            <Col flex="auto">
                <Menu mode="horizontal"
                    defaultSelectedKeys={['/']}
                    items={navMenuItems}
                />
            </Col>
        </Row>
    )
}