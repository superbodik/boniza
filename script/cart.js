window.onload = function() {
    loadCartFromStorage();
    cartIcon = document.getElementById('cart-icon'); // Инициализация cartIcon здесь
    cartPopup = document.getElementById('cart-popup'); // Инициализация cartPopup
    cartCount = document.getElementById('cart-count'); // Инициализация cartCount
};

// Объявляем переменные
let cart = [];
let cartPopup = null;
let cartItemsList = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');
let cartCount = null; // Объявляем, но не инициализируем
let cartIcon = null;
const cartIconImage = '../img/cart.png'; // Путь к изображению

// Функция для переключения видимости всплывающего окна корзины
function toggleCartPopup() {
    if (cartPopup.style.display === 'none' || cartPopup.style.display === '') {
        cartPopup.style.display = 'block';
    } else {
        cartPopup.style.display = 'none';
    }
}

// Функция для добавления товара в корзину
function addToCart(productId, productName, productPrice, quantity) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
        });
    }

    updateCartUI();
    saveCartToStorage();
}

// Функция для обновления пользовательского интерфейса корзины
function updateCartUI() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} грам - ${(item.price * item.quantity / 1000).toFixed(2)} грн`;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity / 1000;
    });

    cartTotal.textContent = `Загальна сума: ${total.toFixed(2)} грн`;
    cartCount.textContent = cart.length; // Обновляем количество товаров в корзине
}

// Сохранение корзины в локальное хранилище
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузка корзины из локального хранилища
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Очистка корзины
function clearCart() {
    cart = [];
    updateCartUI();
    localStorage.removeItem('cart');
}

// Обработчик для кнопок добавления в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productId = parseInt(product.getAttribute('data-id'));
        const productName = product.getAttribute('data-name');
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const quantity = parseInt(product.querySelector('input[type="number"]').value);

        if (isNaN(quantity) || quantity <= 0) {
            alert('Пожалуйста, введите корректное количество товара.');
            return;
        }

        addToCart(productId, productName, productPrice, quantity);
        alert(`Товар "${productName}" добавлен в корзину!`);
    });
});

// Открыть окно оформления заказа
document.getElementById('checkout-button').addEventListener('click', function() {
    alert('Оформлення замовлення! Тут можна буде додати серверну логіку для надсилання замовлення.');
});

// Переход в Viber
document.getElementById('viber-button').addEventListener('click', function() {
    window.location.href = 'viber://add?number=%2B380664680114';
});

// Функция для установки куки
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Функция для получения куки
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Пример использования куки: сохраняем идентификатор пользователя
if (!getCookie('userId')) {
    let userId = Math.random().toString(36).substring(2); // Генерация случайного ID пользователя
    setCookie('userId', userId, 30); // Сохраняем куки на 30 дней
}
