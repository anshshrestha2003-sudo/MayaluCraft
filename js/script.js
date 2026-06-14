
/* =====================================
   MAYALU CRAFTS
   COMPLETE SCRIPT.JS
===================================== */

/* PRODUCT DATABASE */

const products = [
{
    id: 1,
    name: "Custom Name Plaque",
    price: 999,
    image: "images/product1.jpg",
    category: "Custom Crafts",
    stock: 12,
    featured: true,
    bestseller: true,
    active: true,
    description: "Beautiful personalized handmade name plaque."
},
{
    id: 2,
    name: "Handmade Flower Vase",
    price: 1499,
    image: "images/product2.jpg",
    category: "Home Decor",
    stock: 8,
    featured: true,
    bestseller: false,
    active: true,
    description: "Elegant handmade decorative vase."
},
{
    id: 3,
    name: "Wooden Gift Box",
    price: 1299,
    image: "images/product3.jpg",
    category: "Gifts",
    stock: 0,
    featured: false,
    bestseller: true,
    active: true,
    description: "Premium handmade wooden gift box."
},
{
    id: 4,
    name: "Festival Decoration Set",
    price: 1999,
    image: "images/product4.jpg",
    category: "Decor",
    stock: 4,
    featured: false,
    bestseller: true,
    active: true,
    description: "Colorful handmade festive decoration."
},
{
    id: 5,
    name: "Handmade Greeting Card",
    price: 299,
    image: "images/product5.jpg",
    category: "Cards",
    stock: 30,
    featured: false,
    bestseller: false,
    active: true,
    description: "Unique handcrafted greeting card."
},
{
    id: 6,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 0,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 7,
    name: "7 Frame",
    price: 1799,
    image: "images/product7.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: true,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 6,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: true,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 9,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 10,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 11,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 11,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
{
    id: 11,
    name: "Custom Photo Frame",
    price: 1799,
    image: "images/product6.jpg",
    category: "Custom Gifts",
    stock: 6,
    featured: false,
    bestseller: true,
    active: true,
    description: "Personalized handmade photo frame."
},
];

/* =====================================
   CART
===================================== */

let cart = JSON.parse(
    localStorage.getItem("mayaluCart")
) || [];

function saveCart() {
    localStorage.setItem(
        "mayaluCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function updateCartCount() {

    const badge =
        document.querySelector(".cart-count");

    if (!badge) return;

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    badge.textContent = count;
}

/* =====================================
   ADD TO CART
===================================== */

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    if (!product) return;

    if (product.stock <= 0) {

        alert("This product is sold out.");
        return;
    }

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        if (
            existing.quantity <
            product.stock
        ) {

            existing.quantity++;

        } else {

            alert(
                `Only ${product.stock} item(s) available in stock.`
            );

            return;
        }

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });

    }

    saveCart();

    animateCart();

    alert("Added to cart!");
}
/* =====================================
   PRODUCTS PAGE
===================================== */
let currentPage = 1;

const productsPerPage = 8;

function renderProducts() {

    const container =
        document.getElementById(
            "products-grid"
        );

    if (!container) return;

    container.innerHTML = "";

    const activeProducts =
    products.filter(
        product => product.active
    );

const start =
    (currentPage - 1) * productsPerPage;

const end =
    start + productsPerPage;

activeProducts
    .slice(start, end)
    .forEach(product => {

            let badge = "";

            if (product.stock === 0) {

                badge = `
                <span class="badge badge-sold">
                    SOLD OUT
                </span>
                `;

            } else if (product.stock <= 5) {

                badge = `
                <span class="badge badge-low">
                    Only ${product.stock} Left
                </span>
                `;
            }

            container.innerHTML += `

            <div class="product-card">

                ${badge}

                <div class="product-image">

                    <a href="product.html?id=${product.id}">
                        <img
                            src="${product.image}"
                            alt="${product.name}">
                    </a>

                </div>

                <div class="product-info">

                    <h3 class="product-title">

                        <a href="product.html?id=${product.id}">
                            ${product.name}
                        </a>

                    </h3>

                    <p class="product-desc">
                        ${product.description}
                    </p>

                    <div class="product-price">
                        Rs ${product.price}
                    </div>

                    <button
                        class="btn btn-primary"
                        onclick="addToCart(${product.id})"
                        ${product.stock === 0 ? "disabled" : ""}
                    >
                        ${
                            product.stock === 0
                            ? "Sold Out"
                            : "Add To Cart"
                        }
                    </button>

                </div>

            </div>

            `;
        });
}

function nextPage(){

    const totalPages =
        Math.ceil(
            products.filter(
                p => p.active
            ).length /
            productsPerPage
        );

    if(currentPage < totalPages){

        currentPage++;

        renderProducts();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
}

function previousPage(){

    if(currentPage > 1){

        currentPage--;

        renderProducts();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
}


/* =====================================
   FEATURED PRODUCTS
===================================== */

function renderFeaturedProducts() {

    const container =
        document.getElementById(
            "featured-products"
        );

    if (!container) return;

    container.innerHTML = "";

    products
        .filter(
            p =>
                p.featured &&
                p.active
        )
        .forEach(product => {

            container.innerHTML += `

            <div class="product-card">

                <span class="badge badge-featured">
                    Featured
                </span>

                <div class="product-image">

                    <a href="product.html?id=${product.id}">
                        <img
                            src="${product.image}"
                            alt="${product.name}">
                    </a>

                </div>

                <div class="product-info">

                    <h3>
                        <a href="product.html?id=${product.id}">
                            ${product.name}
                        </a>
                    </h3>

                    <div class="product-price">
                        Rs ${product.price}
                    </div>

                    <button
                        class="btn btn-primary"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

            `;
        });
}

/* =====================================
   CART PAGE
===================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();
    renderCart();
}

function increaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );

    if (!item) return;

    const product =
        products.find(
            p => p.id === id
        );

    if (!product) return;

    if (item.quantity >= product.stock) {

       showToast(
    "Stock limit reached",
    "error"
);
        

        return;
    }

    item.quantity++;

    saveCart();
    renderCart();
}



function decreaseQuantity(id) {

    const item =
        cart.find(
            item => item.id === id
        );

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(id);
        return;
    }

    saveCart();
    renderCart();
}

function renderCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );

    if (!cartItems || !cartTotal)
        return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img
                src="${item.image}"
                alt="${item.name}">

            <div>

                <h3>${item.name}</h3>

                <p>
                    Rs ${item.price}
                </p>

                <br>

                <button
                    onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

                <br><br>

                <p>
                    Subtotal:
                    Rs ${subtotal}
                </p>

                <br>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;
    });

    cartTotal.textContent =
        `Rs ${total}`;cartTotal.textContent =
    `Rs ${total}`;

const finalTotal =
    document.getElementById(
        "cart-final-total"
    );

if(finalTotal){

    finalTotal.textContent =
        `Rs ${total}`;
}
}

/* =====================================
   CHECKOUT
===================================== */
function handleCheckout() {

const form =
    document.getElementById(
        "checkout-form"
    );

if (!form) return;

form.addEventListener(
    "submit",
    function (e) {

        if (cart.length === 0) {

            e.preventDefault();

            alert(
                "Your cart is empty."
            );

            return;
        }

        localStorage.removeItem(
            "mayaluCart"
        );

    }
);


}

/* =====================================
   FAQ
===================================== */

function initializeFAQ() {

    document
        .querySelectorAll(".faq-item")
        .forEach(item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );

            const answer =
                item.querySelector(
                    ".faq-answer"
                );

            question.addEventListener(
                "click",
                () => {

                    if (answer.style.maxHeight) {

                        answer.style.maxHeight =
                            null;

                    } else {

                        answer.style.maxHeight =
                            answer.scrollHeight + "px";
                    }
                }
            );
        });
}

/* =====================================
   NEWSLETTER
===================================== */

function initializeNewsletter() {

    const form =
        document.getElementById(
            "newsletter-form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Thank you for subscribing!"
            );

            form.reset();
        }
    );
}

/* =====================================
   SCROLL ANIMATIONS
===================================== */

function initializeAnimations() {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );
                    }
                });

            }
        );

    document
        .querySelectorAll(".fade-up")
        .forEach(element => {

            observer.observe(element);

        });
}
/* =====================================
   TOAST NOTIFICATIONS
===================================== */

function showToast(message,type="success"){

    const toast =
        document.getElementById("toast");

    if(!toast){
        console.log("Toast missing");
        return;
    }

    toast.textContent = message;

    toast.className =
        `toast ${type} show`;

    setTimeout(() => {

        toast.classList.remove("show");

    },2500);
}

/* =====================================
   STARTUP
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        renderProducts();

        renderFeaturedProducts();

        renderCart();

        initializeFAQ();

        initializeNewsletter();

        initializeAnimations();

        handleCheckout();
    }
);