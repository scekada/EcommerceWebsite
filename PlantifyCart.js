const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');

btnCart.addEventListener('click',() => {
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',() => {
    cart.classList.remove('cart-active');
});

function loadContent() {
let cartBtns = document.querySelectorAll('.add-cart');
cartBtns.forEach((btn) => {
  btn.addEventListener('click',addCart);
});
}
loadContent();

let itemList = [];

function addCart(){
  let food=this.parentElement;
  let title=food.querySelector('.food-title').innerHTML;
  let price=food.querySelector('.food-price').innerHTML;
  let imgSrc=food.querySelector('.food-img').src;
  //console.log(title,price,imgSrc);
  
  let newProduct={title,price,imgSrc}
 
  //Check Product already Exist in Cart
  if(itemList.find((el)=>el.title==newProduct.title)){
   alert("Product Already added in Cart");
   return;
  }else{
   itemList.push(newProduct);
  }
 
 
 let newProductElement= createCartProduct(title,price,imgSrc);
 let element=document.createElement('div');
 element.innerHTML=newProductElement;
 let cartBasket=document.querySelector('.cart-content');
 cartBasket.append(element);
 loadContent();
 }
 function createCartProduct(title,price,imgSrc) {
  return `
  <div class = "cart-box">
  <img src = "${imgSrc}" class = "cart-img">
  <div class = "detail-box">
  <div class = "cart-food-title">${title}</div>
  <div class = "price-box">
  <div class = "cart-price">${price}</div>
  <div class = "cart-amt">${price}</div>
  </div>
  <input type = "number" value = "1" class = "cart-quantity">
  </div>
  <ion-icon name = "trash" class = "cart-remove"></ion-icon>
  </div>
  `;
}
