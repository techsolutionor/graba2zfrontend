// --- Cart Storage Handling ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge(); // Keep UI synced
}

// --- Cart Actions ---
function addToCart(product, qty = 1) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }

    saveCart(cart);
    showSuccessMessage(`Item added to cart.`);
}

// NEW FUNCTION - Add this to handle the Add to Cart button clicks
function handleAddToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);
    const qtyInput = document.getElementById("qty");
    const qty = parseInt(qtyInput?.value || "1");

    // First check if product exists with same or higher quantity
    if (existingProduct) {
        showSuccessMessage("This product is already in your cart.");
        return; // Exit the function early
    }

    // If not in cart, add it
    cart.push({ ...product, quantity: qty });
    saveCart(cart);
    showSuccessMessage(`Item added to cart.`);
    updateAddToCartUI(product.id, qty);
}

function changeCartQty(productId, change) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart.splice(index, 1); // Remove product if qty < 1
            showSuccessMessage("Item removed from cart");
        } else {
            showSuccessMessage(`Quantity updated to ${cart[index].quantity}`);
        }
        saveCart(cart);
    } else if (change === 1) {
        // If not in cart and + clicked → add it
        // You can handle this in your button logic if needed
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showSuccessMessage("Item removed from cart.");
}

// --- UI Updates ---
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    document.querySelectorAll('.cart-item-count').forEach(el => {
        el.textContent = totalItems;
    });

    // Optional: store it too
    localStorage.setItem('cartItemCount', totalItems);
}

// Add this function if not already present
function updateAddToCartUI(productId, quantity) {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.style.display = 'none';
    }

    const inCartMessage = document.querySelector('.in-cart-message');
    if (inCartMessage) {
        inCartMessage.style.display = 'block';
    }

    const qtyInput = document.getElementById("qty");
    if (qtyInput) {
        qtyInput.value = quantity;
    }
}

function showSuccessMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px';
    messageContainer.style.right = '20px';
    messageContainer.style.backgroundColor = 'green';
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '10px 20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.zIndex = '1000';
    messageContainer.textContent = message;

    document.body.appendChild(messageContainer);

    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}

// --- Init Badge on Page Load ---
document.addEventListener('DOMContentLoaded', updateCartBadge);

// --- Sync across tabs ---
window.addEventListener('storage', function (e) {
    if (e.key === 'cart') {
        updateCartBadge();
    }
});