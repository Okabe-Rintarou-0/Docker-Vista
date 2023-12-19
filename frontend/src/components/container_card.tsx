import { Avatar, Button, Card, Col, Row, Space } from "antd";
import { ContainerInfo } from "../lib/models";
import { getUUIDFromLowerDir } from "../lib/utils";
import FileBrowser from "./file_browser";
import { useState } from "react";

const ContainerCard = ({ info }: { info: ContainerInfo }) => {
    const [currentRoot, setCurrentRoot] = useState<string>(info.lowerDirs.length > 0 ?
        info.lowerDirs[0] : '');

    return (
        <Card className="container-card">
            <Space direction="horizontal">
                <Avatar src={process.env.PUBLIC_URL + "docker.svg"} size={65}></Avatar>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{info.name}</td>
                            <td>{info.id}</td>
                            <td>{info.image}</td>
                            <td>{(new Date(info.createdTime)).toString()}</td>
                        </tr>
                    </tbody>
                </table>
            </Space>
            {info.lowerDirs.length > 0 &&
                <details>
                    <summary>Layer View</summary>
                    <Row>
                        <Col span={12}>
                            <div className="merged-container">
                                <h3>Merged</h3>
                                <Button
                                    style={{ width: "100%", height: "50px" }}
                                    onDoubleClick={() => setCurrentRoot(info.lowerDirs[0])}
                                    type="primary">{"Upper Directory " + getUUIDFromLowerDir(info.lowerDirs[0])}</Button>
                                {info.lowerDirs.length > 1 &&
                                    info.lowerDirs.slice(1)
                                        .map(lowerDir =>
                                            <Button
                                                onDoubleClick={() => setCurrentRoot(lowerDir)}
                                                key={lowerDir}
                                                style={{ width: "100%", height: "50px" }}
                                            >{"Lower Directory " + getUUIDFromLowerDir(lowerDir)}</Button>)}
                            </div>
                        </Col>
                        <Col span={12}><FileBrowser root={currentRoot} /></Col>
                    </Row>
                </details>
            }
        </Card >
    )
}

export default ContainerCard;