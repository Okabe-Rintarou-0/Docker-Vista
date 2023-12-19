package handlers

import (
	"net/http"
	"strings"
	"vista/models"
	"vista/utils"

	"github.com/gin-gonic/gin"
)

func HandleGetDirEntries(ctx *gin.Context) {
	var (
		path    string
		entries []*models.FileEntry
		err     error
	)

	path = ctx.Request.URL.Query().Get("path")
	if strings.HasPrefix(path, "/var/lib/docker/overlay2") {
		entries, err = utils.ListDir(path)
		if err != nil {
			ctx.Status(http.StatusBadRequest)
		} else {
			ctx.JSON(http.StatusOK, entries)
		}
	} else {
		ctx.Status(http.StatusForbidden)
	}
}
