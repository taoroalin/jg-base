package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

var (
	dataDir = "./data"
)

func setupFile(str string) {
	path := dataDir + str
	if _, err := os.Stat(path); os.IsNotExist(err) {
		ioutil.WriteFile(path, []byte("{}"), 0644)
	}
}

func setupFolder(str string) {
	path := dataDir + str
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.Mkdir(path, 0644)
	}
}

func main() {
	// setup data dir
	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		os.Mkdir(dataDir, 0644)
	}

	fmt.Println("Starting JG Base Server")
	server := fiber.New()

	server.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("hi")
	})

	log.Fatal(server.Listen(":3000"))
}
