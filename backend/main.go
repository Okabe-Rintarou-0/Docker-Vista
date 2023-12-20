package main

import (
	"vista/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.New()
	corsCfg := cors.DefaultConfig()
	corsCfg.AllowOrigins = []string{"http://localhost:3000"}
	engine.Group("/api").
		Use(cors.New(corsCfg)).
		GET("/containers/:id/info", handlers.HandleGetContainerInfo).
		GET("/containers/info", handlers.HandleGetAllContainerInfo).
		GET("/containers/topography", handlers.HandleGetTopography).
		GET("/layers/dir", handlers.HandleGetDirEntries)
	engine.Run()
}
