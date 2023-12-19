import { Button, Space } from "antd";
import { FileEntry } from "../lib/models";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";

export default function FileButton({ entry, onDoubleClick, onClick }: {
    entry: FileEntry,
    onDoubleClick: () => void
    onClick: () => void
}) {
    return (
        entry.isDir ? <Button onClick={onClick} onDoubleClick={onDoubleClick} size="large" icon={<FolderOutlined />}>{entry.name}</Button> :
            <Button onClick={onClick} size="large" icon={<FileOutlined />}>{entry.name}</Button>
    )
}