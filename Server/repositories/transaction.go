package repositories

import (
	"backEnd/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	UpdateTransaction(Status string, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error
	return transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Cart.Product").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID int) (models.Transaction, error) {
	// get data from db product

	var transaction models.Transaction
	r.db.Preload("Cart").First(&transaction.ID)
	// If is different & Status is "success" decrement product quantity
	if status != transaction.Status && status == "success" {
		for _, v := range transaction.Cart {
			var product models.Product
			r.db.First(&product, v.ProductID)
			product.Stock = product.Stock - 1
			r.db.Save(&product)
		}
	}
	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return transaction, err
}
