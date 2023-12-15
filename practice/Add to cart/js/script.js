
//Select element
const productEle = document.querySelector('.products');
const cartEle = document.querySelector('.cart-items');
const subTotal = document.querySelector('.subtotal');

//render products
const randerProducts = () =>{
    products.map((val, ind) =>{
        productEle.innerHTML +=
        `<div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${val.imgSrc}" alt="${val.product_name}">
            </div>
            <div class="desc">
                <h2>${val.product_name}</h2>
                <h2><small>$</small>${val.price}</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, dicta!
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${val.id})">
                <img src="icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
    `
    });
    const productstring = JSON.stringify(products);
    localStorage.setItem("products", productstring);

    const storedString = localStorage.getItem("products");
    const retrive = JSON.parse(storedString)

    console.log(retrive);

}
randerProducts();

//Add to cart
    // let cart = [];
let cart = JSON.parse(localStorage.getItem("CART")) || [];

const addToCart = (id) =>{
    //check product already exist in cart
    if(cart.some((item) => item.id === id)){
        changeUnitNum('plus', id);
    }
    else{
        const item = products.find((products) => products.id === id);
        cart.push(item);
        console.log(cart);
    }
    updateCart();
    
}

const updateCart = ()=>{
    randerCartitem();
    randersubtotal();

    // localStorage.clear();
    localStorage.setItem("CART", JSON.stringify(cart));
}

const randerCartitem = () =>{
    cartEle.innerHTML = "";     //clear cart element
    cart.map((item) =>{   
    cartEle.innerHTML += `
    <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.product_name}">
                <h4>${item.product_name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeUnitNum('minus', ${item.id})">-</div>
                <div class="number">${item.productNumber}</div>
                <div class="btn plus" onclick="changeUnitNum('plus', ${item.id})">+</div>           
            </div>
        </div>`
    }); 
};

const changeUnitNum = (action, id) =>{
    
     cart = cart.map((item)=>{
        let productNumber = item.productNumber;
        if(item.id === id){
        
        if(action === 'minus' && productNumber > 1){
            productNumber--;
        }
        else if(action === 'plus' && productNumber < 15){
            productNumber++;
        }
    }
     return {
        ...item,
        productNumber,
     };       
    });
    updateCart();
}
const randersubtotal = () => {
    let totalPrice = 0, totalItem = 0;
    cart.map((item) =>{
        totalPrice += item.price * item.productNumber;
        totalItem += item.productNumber;
    });

        subTotal.innerHTML = `
        Subtotal (${totalItem} items): $${totalPrice.toFixed(2)}`
    
}











