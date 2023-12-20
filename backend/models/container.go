package models

type ContainerInfo struct {
	Name        string   `json:"name"`
	ID          string   `json:"id"`
	CreatedTIme int64    `json:"createdTime"`
	Image       string   `json:"image"`
	LowerDirs   []string `json:"lowerDirs"`
}

type Node struct {
	ID     string `json:"id"`
	IsRoot bool   `json:"isRoot"`
}

type Edge struct {
	Src string `json:"src"`
	Tgt string `json:"tgt"`
}

type TopoGraphy struct {
	Nodes []Node `json:"nodes"`
	Edges []Edge `json:"edges"`
}
