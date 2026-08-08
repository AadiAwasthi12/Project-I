const products = [
    { name: "Rose Collection", price: 30, stock: 10 },
    { name: "Daisy Collection", price: 30, stock: 10 },
    { name: "Lavander Collection", price: 30, stock: 10 }
];


let quantities = [1, 1, 1];


let cart = [];



function increase(index) {
    if (quantities[index] < products[index].stock) {
        quantities[index]++;
        document.getElementById("qty" + index).textContent = quantities[index];
    }
}

function decrease(index) {
    if (quantities[index] > 1) {
        quantities[index]--;
        document.getElementById("qty" + index).textContent = quantities[index];
    }
}


function addToCart(index) {
    const qtyWanted = quantities[index];
    const product = products[index];

    if (qtyWanted > product.stock) {
        alert("Sorry, not enough stock left for " + product.name + "!");
        return;
    }

    product.stock -= qtyWanted;

    const existingItem = cart.find(item => item.index === index);

    if (existingItem) {
        existingItem.qty += qtyWanted;
    } else {
        cart.push({
            index: index,
            name: product.name,
            price: product.price,
            qty: qtyWanted
        });
    }

    quantities[index] = 1;
    document.getElementById("qty" + index).textContent = 1;

    updateStockDisplay(index);
    updateCartDisplay();
}


function updateStockDisplay(index) {
    const product = products[index];
    const stockText = document.getElementById("stock" + index);
    const addButton = document.getElementById("btn" + index);

    if (product.stock <= 0) {
        stockText.textContent = "Out of Stock";
        addButton.disabled = true;
        addButton.textContent = "Out of Stock";
    } else {
        stockText.textContent = "Stock : " + product.stock;
        addButton.disabled = false;
        addButton.textContent = "Add to Cart";
    }
}



function removeFromCart(index) {
    const item = cart.find(item => item.index === index);
    if (!item) return;

    products[index].stock += item.qty;
    cart = cart.filter(cartItem => cartItem.index !== index);

    updateStockDisplay(index);
    updateCartDisplay();
}



function updateCartDisplay() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceSpan.textContent = "0";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        html += `
            <div class="cart-item">
                <p>${item.name} (x${item.qty}) - $${itemTotal}</p>
                <button onclick="removeFromCart(${item.index})">Remove</button>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = html;
    totalPriceSpan.textContent = total;
}



function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some flowers first.");
        return;
    }
 
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
        
        sessionStorage.setItem("pendingCart", JSON.stringify(cart));
        sessionStorage.setItem("pendingProducts", JSON.stringify(products));
        sessionStorage.setItem("redirectAfterLogin", "gallery.html");
 
        alert("Please login to complete your order.");
        window.location.href = "login.html";
        return;
    }
 
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
    });
 
    alert("Thank you for your order! Your total bill is : $" + total);
 
    cart = [];
    updateCartDisplay();
}
 

 
function initGallery() {
    const pendingCart = sessionStorage.getItem("pendingCart");
    const pendingProducts = sessionStorage.getItem("pendingProducts");
 
    if (pendingCart && pendingProducts) {
        cart = JSON.parse(pendingCart);
        const restoredProducts = JSON.parse(pendingProducts);
        restoredProducts.forEach((p, i) => {
            products[i].stock = p.stock;
        });
 
        sessionStorage.removeItem("pendingCart");
        sessionStorage.removeItem("pendingProducts");
        sessionStorage.removeItem("redirectAfterLogin");
    }
 
    products.forEach((product, index) => {
        updateStockDisplay(index);
    });
    updateCartDisplay();
}
 
window.onload = initGallery;