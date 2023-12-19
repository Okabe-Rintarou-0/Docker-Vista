package utils

import (
	"os"
	"vista/models"
)

func ListDir(path string) ([]*models.FileEntry, error) {
	var (
		files   []os.DirEntry
		entries []*models.FileEntry
		info    os.FileInfo
		err     error
	)

	files, err = os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		info, err = file.Info()
		if err != nil {
			return nil, err
		}
		entries = append(entries, &models.FileEntry{
			Name:  info.Name(),
			Size:  info.Size(),
			IsDir: info.IsDir(),
		})
	}
	return entries, nil
}
