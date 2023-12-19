package handlers

import (
	"net/http"
	"vista/models"
	"vista/utils"

	"github.com/gin-gonic/gin"
)

func HandleGetContainerInfo(ctx *gin.Context) {
	var (
		containerId string
		info        *models.ContainerInfo
		err         error
	)

	containerId = ctx.Param("id")
	info, err = utils.GetContainerInfo(containerId)
	if err != nil {
		ctx.Status(http.StatusBadRequest)
	} else {
		ctx.JSON(http.StatusOK, info)
	}
}

func HandleGetAllContainerInfo(ctx *gin.Context) {
	var (
		infoList []*models.ContainerInfo
		err      error
	)

	infoList, err = utils.GetAllContainerInfo()
	if err != nil {
		ctx.Status(http.StatusBadRequest)
	} else {
		ctx.JSON(http.StatusOK, infoList)
	}
}
