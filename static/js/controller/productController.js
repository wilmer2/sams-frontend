var $ = require('jquery');
var Products = require('../collection/products');
var ProductForm = require('../view/product/productNewView');
var ProductList = require('../view/product/productTableView');

function ProductCtrl () {
  this.showForm = function () {
    var productForm = new ProductForm();

    appView.showUserView(productForm);
  }

  this.showList = function () {
    var products = new Products();
    var productsData = {collection: products};
    var productList = new ProductList(productsData);
    
    products.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(productList);
    })
  }
}

module.exports = ProductCtrl;