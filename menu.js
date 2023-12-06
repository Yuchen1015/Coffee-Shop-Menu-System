if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// need to be fixed

// const itemAmount = document.getElementsByClassName("cart-item-title");
// var itemCounting = document.getElementById("cartNum");

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("menu-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  var buttonCLicked = event.target;
  buttonCLicked.parentElement.parentElement.remove();
  updateCartTotal();
  // itemCounting.innerHTML = itemAmount.length;
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  // insert to cart showing info
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName("menu-title")[0].innerText;
  var imgsrc = shopItem.getElementsByClassName("item-image")[0].src;

  if (shopItem.classList == "menu-feature-card coffee") {
    addonMath();
  } else {
    foodSection();
  }
  // itemCounting.innerHTML = itemAmount.length;
  // itemCount++;
  // itemAmount = itemCount.innerHTML;
  function addonMath() {
    // get the addup value
    const listChildren = shopItem.children;
    const size = listChildren.item(2);
    const syrup = listChildren.item(3);
    const shot = listChildren.item(4);

    var sizeSelection = size.querySelector("select");
    var sizePicked = parseFloat(sizeSelection.value);

    var syrupSelection = syrup.querySelector("select");
    var syrupPicked = syrupSelection.value;

    var shotSelection = shot.querySelector("select");
    var shotPicked = shotSelection.value;
    var syrupPrice = 0;
    var shotPrice = 0;

    if (syrupPicked == "None") {
      syrupPrice = 0;
    } else {
      syrupPrice = 0.5;
    }

    if (shotPicked == "single") {
      shotPrice = 1.55;
    } else if (shotPicked == "Double") {
      shotPrice = 3.1;
    } else if (shotPicked == "Triple") {
      shotPrice = 4.65;
    }
    var addonTotal = "$" + (sizePicked + syrupPrice + shotPrice).toFixed(2);

    // insert the addup cart info
    var sizeContent = sizeSelection.options[sizeSelection.selectedIndex].innerText;
    var syrupContent = syrupSelection.options[syrupSelection.selectedIndex].innerText;
    var shotContent = shotSelection.options[shotSelection.selectedIndex].innerText;

    addItemToCart(title, addonTotal, imgsrc, sizeContent, syrupContent, shotContent);
  }

  function foodSection() {
    const listChildren = shopItem.children;
    const flavor = listChildren.item(3);
    var flavorPicked = flavor.value;
    var priceSection = listChildren.item(2);
    var foodPrice = priceSection.children.item(2).innerText;
    console.log(foodPrice);
    foodPickedToCart(title, foodPrice, imgsrc, flavorPicked);
  }
}

function foodPickedToCart(title, price, imgsrc, flavorPicked) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRowContents = `
  <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imgsrc}" width="100" height="100" />
    <span class="cart-item-title">${title}</span>
    <div class="addoncontent">
      <p class="flavorPicked">${flavorPicked}</p>
    </div>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  updateCartTotal();
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

function addItemToCart(title, price, imgsrc, sizeContent, syrupContent, shotContent) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRowContents = `
  <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imgsrc}" width="100" height="100" />
    <span class="cart-item-title">${title}</span>
    <div class="addoncontent">
      <p class="content-size">${sizeContent}</p>
      <p class="content-syrup">${syrupContent}</p>
      <p class="content-shot">${shotContent}</p>
    </div>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  updateCartTotal();
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

// var selection = document.getElementsByClassName("syrup-select").value;

// console.log(updateCartTotal(quantity));

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  var quantityEach = [];
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;

    total = total + price * quantity;
    // How to put the strings in one string
    quantityEach.push(parseFloat(quantity));
  }

  console.log(quantityEach.length);
  var quantitySum = document.getElementById("cartNum");
  if (quantityEach.length > 0) {
    quantitySum.innerText = quantityEach.reduce((a, b) => a + b);
  } else {
    quantitySum.innerText = 0;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total.toFixed(2);
  const cartPointsEarnedElem = document.querySelector(".cart-points-earned");
  cartPointsEarnedElem.innerHTML = (total * 100).toFixed(0);
}

// Cart trigger button
const cartCloseBtn = document.querySelector(".cartCloseBtn");
const elseContainer = document.querySelector(".elseContainer");
const CartBtn = document.querySelector(".shopCartBtn");
CartBtn.addEventListener("click", () => {
  elseContainer.classList.toggle("pupUp");
});
cartCloseBtn.addEventListener("click", () => {
  elseContainer.classList.toggle("pupUp");
});

window.onscroll = function () {
  stickToTop();
};

var header = document.querySelector("header");
console.log(header);
var sticky = header.offsetTop;

function stickToTop() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// change locations

var map = document.getElementById("map");
var locationSelect = document.getElementById("mapSelect").addEventListener("change", function () {
  var locationChoise = this.selectedIndex;
  if (locationChoise == 0) {
    map.src =
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d43823.30495723069!2d-93.13625681775066!3d35.276485871958876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1680485938019!5m2!1sen!2sus";
  } else if (locationChoise == 1) {
    map.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13026.424960705523!2d-93.13149246376535!3d35.290915062728246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc53071e379551%3A0xaf9bb3b6b6894e7!2s1950%20N%20Arkansas%20Ave%2C%20Russellville%2C%20AR%2072802%E7%BE%8E%E5%9B%BD!5e0!3m2!1szh-CN!2sca!4v1681176765643!5m2!1szh-CN!2sca";
  } else if (locationChoise == 2) {
    map.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.420204490379!2d-93.12310848445651!3d35.295539058634404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc53176431dfe5%3A0x9b520ff082c73743!2s2001%20N%20Parker%20Rd%2C%20Russellville%2C%20AR%2072801%E7%BE%8E%E5%9B%BD!5e0!3m2!1szh-CN!2sca!4v1681176897623!5m2!1szh-CN!2sca";
  } else if (locationChoise == 3) {
    map.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.3621144772137!2d-93.16268348445789!3d35.22235476260775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc543432e37031%3A0x20011936a1dd93ce!2zNDEwIFVuaW9uIFN0LCBEYXJkYW5lbGxlLCBBUiA3MjgzNOe-juWbvQ!5e0!3m2!1szh-CN!2sca!4v1681177078723!5m2!1szh-CN!2sca";
  }
});
// var selection = locationSelect.addEventListener("change", locationSelect.selectedIndex);

// login page access
let loginPage = document.querySelector(".menu-container03");
let registerBtn = document.querySelector(".menu-register.button");
let LoginBtn = document.querySelector(".menu-login.button");
var loginIframe = document.querySelector(".loginPage");
var closeBtn = loginIframe.contentWindow.document.querySelector(".closeBtn");
var registerSide = loginIframe.contentWindow.document.querySelector("#main");
const logContainer = document.querySelector(".loginContainer");
var r = loginIframe.contentWindow.document.querySelector(":root");
var rs = getComputedStyle(r);

// need to figure out how to change the transition time after the iframe has been actived

registerBtn.addEventListener("click", () => {
  // r.style.setProperty("--transitionTime", "0.8s");
  registerSide.classList.add("right-panel-active");
  loginPage.classList.toggle("pupUp");
});
LoginBtn.addEventListener("click", () => {
  registerSide.classList.remove("right-panel-active");
  loginPage.classList.toggle("pupUp");
});
closeBtn.addEventListener("click", () => {
  loginPage.classList.toggle("pupUp");
});

var purchasepass = document.querySelector(".btn-purchase");
purchasepass.addEventListener("click", () => {
    // Get the cart data
    var cart = JSON.parse(localStorage.getItem('cart'));

    // Send the cart data to the PHP page using AJAX
    $.ajax({
        type: 'POST',
        url: 'menu.php',
        data: { cart: cart },
        success: function (response) {
            // Display the response from the PHP page
            alert(response);
        },
        error: function (xhr, status, error) {
            // Display an error message if the AJAX request fails
            alert('Error: ' + error);
        }
    });
});

var purchasePage = document.querySelector(".btn-purchase");
purchasePage.addEventListener("click", () => {
    var message = "Order Sent";
    alert(message);
    window.location = "payment.html";
});

