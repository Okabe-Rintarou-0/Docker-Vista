package utils

import (
	"context"
	"strings"
	"time"
	"vista/models"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

var (
	cli client.APIClient
	ctx = context.Background()
)

func init() {
	var err error
	cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
}

func GetContainerInfo(containerId string) (*models.ContainerInfo, error) {
	var (
		ret         models.ContainerInfo
		exists      bool
		data        string
		createdTime time.Time
	)

	containerInfo, err := cli.ContainerInspect(ctx, containerId)
	if err != nil {
		return nil, err
	}

	createdTime, err = time.Parse(time.RFC3339Nano, containerInfo.Created)
	ret.CreatedTIme = createdTime.UnixMilli()

	ret.Name = containerInfo.Name
	ret.ID = containerInfo.ID
	ret.Image = containerInfo.Config.Image

	if data, exists = containerInfo.GraphDriver.Data["LowerDir"]; exists {
		ret.LowerDirs = strings.Split(data, ":")
	} else {
		ret.LowerDirs = []string{}
	}

	return &ret, nil
}

func GetAllContainerInfo() ([]*models.ContainerInfo, error) {
	var infoList []*models.ContainerInfo
	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{})
	if err != nil {
		return nil, err
	}
	for _, container := range containers {
		info, err := GetContainerInfo(container.ID)
		if err != nil {
			return nil, err
		}
		infoList = append(infoList, info)
	}
	return infoList, nil
}
