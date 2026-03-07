document.addEventListener("DOMContentLoaded",()=> {
const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");
const cartCount = document.querySelector(".cart-count");

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

function bload() {
  const cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((a) => {
    a.addEventListener('click',addCart);
  })

  const removeBtn = document.querySelectorAll('.cart-remove');
  removeBtn.forEach((a) => {
    a.addEventListener('click',removeItem);
  });

  const quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change",updateTotal);
  });
}


function removeItem() {
  if ( confirm('Are you sure you want to remove this item? ')) {
    let title = this.parentElement.querySelector('.cart-plant-title').innerHTML;
    items = items.filter(el => el.title != title);
    this.parentElement.remove();
    cartCount.innerHTML = items.length;
    localStorage.setItem("items",JSON.stringify(items));
    updateTotal();
  }
}


let items = JSON.parse(localStorage.getItem("items")) || [];
items.forEach(item=> {
  let newCartElement = createCartItem(item.title,item.price,item.imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newCartElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.appendChild(element);
});
cartCount.innerHTML=items.length;
bload();
updateTotal();

function addCart() {
  let food = this.parentElement;
  let title = food.querySelector(".plant-title").innerHTML;
  let price = food.querySelector(".plant-price").innerHTML;
  let imgSrc = food.querySelector(".plant-img").src;

  let newProduct = {title,price,imgSrc};

  if ( items.find((el) => el.title == newProduct.title )) {
    alert('The product is already in the cart. ');
    return;
  }
  else {
    items.push(newProduct);
    cartCount.innerHTML = items.length;
  }
  localStorage.setItem("items",JSON.stringify(items));

  let newCartElement = createCartItem(title,price,imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newCartElement;

  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  bload();
  updateTotal();
  cartCount.innerHTML = items.length;
}
function updateTotal() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(box => {
    let priceElement = box.querySelector(".price-box");
    let quantityElement = box.querySelector(".cart-quantity");
    let price = parseFloat(priceElement.innerHTML);
    let quantity = parseInt(quantityElement.value);

    total += price * quantity;
  });
  document.querySelector(".total-price").innerHTML = total + "€";
}


function createCartItem(title,price,imgSrc) {
  return `
  <div class = "cart-box">
  <img src = ${imgSrc} class = "cart-img">
  <div class = "cart-plant-title">${title}</div>
  <div class = "price-box">${price}</div>
  <input type = "number" value = "1" class = "cart-quantity">
  <ion-icon name = "trash" class= "cart-remove"></ion-icon>
  </div>
  `;
}
});