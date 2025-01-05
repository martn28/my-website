
function addToCart(albumName, albumPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ name: albumName, price: albumPrice });

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCounter();
    alert(`${albumName} е добавен в количката!`);
}

function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-counter').innerText = `Количка: ${cart.length}`;
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Вашата количка е празна.</p>';
    } else {
        cart.forEach((item, index) => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p><strong>Име:</strong> ${item.name}</p>
                <p><strong>Цена:</strong> ${item.price} лв.</p>
                <button onclick="removeFromCart(${index})">Премахни</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            totalPrice += item.price;
        });
    }

    document.getElementById('total-price').innerText = `${totalPrice} лв.`;
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
    updateCartCounter();
    alert('Артикулът беше премахнат от количката!');
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
    updateCartCounter();
    alert('Количката беше изчистена!');
}


function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Количката е празна!');
        return;
    }
    alert('Благодарим ви за поръчката! Ще се свържем с вас скоро.');
    localStorage.removeItem('cart');
    displayCart();
    updateCartCounter();
}

if (document.body.id === 'cart-page') {
    displayCart();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

window.onload = function () {
    updateCartCounter();
};

//за кода в джава съм използвал помощ от сайтове и примери!!!