export interface ContainerInfo {
    name: string
    id: string
    image: string
    lowerDirs: string[]
    createdTime: number
}

export interface FileEntry {
    name: string
    size: number
    isDir: boolean
}