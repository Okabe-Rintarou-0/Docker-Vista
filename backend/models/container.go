package models

type ContainerInfo struct {
	Name        string   `json:"name"`
	ID          string   `json:"id"`
	CreatedTIme int64    `json:"createdTime"`
	Image       string   `json:"image"`
	LowerDirs   []string `json:"lowerDirs"`
}
