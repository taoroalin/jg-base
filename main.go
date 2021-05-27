package main

import (
	"fmt"

	"github.com/valyala/fasthttp"
)

func rootHandler(ctx *fasthttp.RequestCtx) {

}

func main() {
	fmt.Println("Starting JG Base Server")
	fasthttp.ListenAndServe(":3000", rootHandler)
}
