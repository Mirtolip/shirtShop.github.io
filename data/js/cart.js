var data = [{
  id: 1,
  brand: 'product1',
  price: 100000,
  //Image: "/data/images/3.jpg"
  Image: "/shirtShop.github.io/data/images/3.jpg"
},{
  id: 2,
  brand: 'product2',
  price: 145000,
  //Image: '/data/images/4.jpg'
  Image: '/shirtShop.github.io/data/images/4.jpg'
},{
  id: 3,
  brand: 'product3',
  price: 132000,
  //Image: '/data/images/5.jpg'
  Image: '/shirtShop.github.io/data/images/5.jpg'
},{
  id: 4,
  brand: 'product4',
  price: 99900,
  //Image: '/data/images/6.jpg'
  Image: '/shirtShop.github.io/data/images/6.jpg'
}];


angular.module('shirtShop', ['ngAnimate']);
var app = angular.module("shirtShop", []);

app.controller("productController", ["$scope", function ($products,) {
  $products.product = data;
  
      // define list of items
  // $product.productBrand = productBrand;
	// $product.productColor = productColor;

	// $product.productFilter = {};
  // // reset the filter
  // $product.resetFilter = function() {
  // // set filter object as blank
  // 	$product.productFilter = {};
  // }
}]);

app.controller('cart', function ($scope) {
  
  $scope.cart = [];
 	$scope.total = 0;

  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify($scope.cart));
  }

  function loadCart() {
    $scope.cart = JSON.parse(localStorage.getItem("shoppingCart"));
    if ($scope.cart === null) {
      $scope.cart = []
    }
  }
  loadCart();

	$scope.countCart = function () { // -> return total count
    var totalCount = 0;
    for (var i in $scope.cart) {
        totalCount += $scope.cart[i].count;
    }
    totalCount;
    $('#counter').innerHTML = totalCount;
  };
	
  $scope.getCost = function(item) {
    return (item.count * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    
  };

  $scope.addItem = function (product) {
    if ($scope.cart.length === 0){
	 		product.count = 1;
	 		$scope.cart.push(product);
	 	} else {
	 		var repeat = false;
	 		for(var i = 0; i< $scope.cart.length; i++){
	 			if($scope.cart[i].id === product.id && $scope.cart[i].type === product.type){
	 				repeat = true;
	 				$scope.cart[i].count +=1;
	 			}
	 		}
	 		if (!repeat) {
	 			product.count = 1;
	 		 	$scope.cart.push(product);	
	 		}
	 	}
    saveCart();
  };
  
  $scope.getTotal = function() {
    var total = 0;
    angular.forEach($scope.cart, function(item) {
      // if ($('.delivery').value === 'express') {
      //   total += (item.price * item.count)+15000;
      // }
      // else{
        total += item.price * item.count;
      //}
    })
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    saveCart();
  }
  app.filter('nospace', function () {
    return function (value) {
      return (!value) ? '' : value.replace(/ /g, '');
    };
	});

  $scope.clearCart = function() {
    $scope.cart.length = 0;
    $scope.total = 0;
    saveCart();
  };
  
	$scope.removeItemCart = function(product){
	  if(product.count > 1){
	    product.count -= 1;
	  }
	  else if(product.count === 1){
	    var index = $scope.cart.indexOf(product);
			$scope.cart.splice(index, 1);
	  }
	  saveCart();
  };

  $scope.removeItem = function(item) {
    var index = $scope.cart.indexOf(item);
    $scope.cart.splice(index, 1);
  	$scope.total = $scope.total - (item.price * item.count);
  	saveCart();
  };
});

