import { Breadcrumb, Button, Card, Space } from "antd";
import { useEffect, useState } from "react";
import { useDirEntries } from "../service/container";
import FileButton from "./file_btn";
import { LeftOutlined } from "@ant-design/icons";
import { FileEntry } from "../lib/models";

export default function FileBrowser({ root }: { root: string }) {
    useEffect(() => {
        setCurrentPath(root);
    }, [root])

    const [currentPath, setCurrentPath] = useState(root);
    const { entries, mutate } = useDirEntries(currentPath);
    const [selectedEntry, setSelectedEntry] = useState<FileEntry | null>(null);

    const getBreadcrumbItems = () => {
        const parts = currentPath.split("/");
        return parts.map((part, index) => ({
            title: index !== parts.length - 1 && index > 4 ?
                <a onClick={(e) => {
                    e.preventDefault();
                    setCurrentPath(parts.slice(0, index + 1).join("/"));
                }}>{part}</a> : part
        }));
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <Card style={{ height: "100%", maxHeight: "100%", margin: "10px", overflowY: "scroll" }}>
            <Breadcrumb items={getBreadcrumbItems()}></Breadcrumb>
            <Space direction="horizontal" style={{ display: "flex" }} wrap>{
                entries?.map(entry => <FileButton
                    onClick={() => setSelectedEntry(entry)}
                    onDoubleClick={() => setCurrentPath(currentPath + "/" + entry.name)}
                    key={entry.name}
                    entry={entry} />)
            }   {currentPath.split("/").length > 6 &&
                <Button size="large" type="primary" icon={<LeftOutlined />} onClick={() => {
                    const parts = currentPath.split("/");
                    setCurrentPath(parts.slice(0, parts.length - 1).join("/"));
                }}>Back</Button>}
            </Space>
            {selectedEntry && !selectedEntry.isDir && <h3>File size: {formatBytes(selectedEntry.size)}</h3>}
        </Card>
    )
}