package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// connection database
func DatabaseInit() {
	var err error
	// var DB_HOST = os.Getenv("DB_HOST")
	// var DB_USER = os.Getenv("DB_USER")
	// var DB_PASSWORD = os.Getenv("DB_PASSWORD")
	// var DB_NAME = os.Getenv("DB_NAME")
	// var DB_PORT = os.Getenv("DB_PORT")

	dsn := "root:@tcp(localhost:3306)/waysbeens_app?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	fmt.Println("connected to database")
}
