$(document).ready(function() {
  $(".slideshow-container").hide().fadeIn(1000);
  showSlides();
  loadCartItemsFromLocalstorage();
});

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "styles.css";
document.head.appendChild(link);

var slideIndex = 0;
showSlides();

function showSlides() {
  var slides = $(".mySlides");
  slides.hide();
  slides.eq(slideIndex).show();
}

function plusSlides(n) {
  slideIndex += n;
  var slides = $(".mySlides");
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides.hide();
  slides.eq(slideIndex).show();
}

function currentSlide(n) {
  slideIndex = n;
  var slides = $(".mySlides");
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  slides.hide();
  slides.eq(slideIndex).show();
}

function openCartPage() {
  window.location.href = "cart.html";
}

function goToHomePage() {
  window.location.href = "index.html";
}

$(document).ready(function() {
  $(".slideshow-container").hide().fadeIn(1000);
  showSlides();
  loadCartItemsFromLocalstorage();
});

// Sepet işlemleri
var cartItems = [];

function addToCart(name, image, price) {
  cartItems.push({ name: name, image: image, price: price });
  updateCart();
  saveCartItemsToLocalstorage();
}

function saveCartItemsToLocalstorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartItemsFromLocalstorage() {
  var cartItemsData = localStorage.getItem('cartItems');
  if (cartItemsData) {
    cartItems = JSON.parse(cartItemsData);
    updateCart();
  }
}

function updateCart() {
  var cartTable = document.getElementById("cart-table");
  var cartBody = cartTable.getElementsByTagName("tbody")[0];
  var totalAmount = 0;

  while (cartBody.firstChild) {
    cartBody.removeChild(cartBody.firstChild);
  }

  cartItems.forEach(function(item, index) {
    var row = cartBody.insertRow();

    var nameCell = row.insertCell(0);
    nameCell.innerHTML = '<img src="' + item.image + '" alt="' + item.name + '"><br>' + item.name;

    var priceCell = row.insertCell(1);
    priceCell.innerHTML = item.price + " $";

    var actionCell = row.insertCell(2);
    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.className = "cbutton";
    removeButton.onclick = function() {
      removeFromCart(index);
    };
    actionCell.appendChild(removeButton);

    totalAmount += item.price;
  });

  var totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.innerHTML = totalAmount;

  var cartItemCountElement = document.getElementById("cart-item-count");
  cartItemCountElement.innerHTML = cartItems.length + " items";
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  saveCartItemsToLocalstorage();
}

function checkout() {
  cartItems = [];
  updateCart();
  saveCartItemsToLocalstorage();
  alert("Payment completed!");
  window.location.href = "index.html";
}

// Product JSON dosyasını yükleme
$.getJSON("carrental/products.JSON", function(data) {
  // JSON dosyası yüklendikten sonra çalışacak kodlar buraya gelecek
  console.log(data); // JSON verilerini konsola yazdır

  // JSON verilerini kullanarak add to cart vb. fonksiyonlarınızı çağırabilirsiniz
  addToCart(data[0].name, data[0].image, data[0].price);
});
