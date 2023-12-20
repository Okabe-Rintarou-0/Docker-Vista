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

export interface Edge {
    src: string
    tgt: string
}

export interface Node {
    id: string
    isRoot: boolean
}

export interface Topography {
    nodes: Node[]
    edges: Edge[]
}