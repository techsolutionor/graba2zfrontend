// --- Wishlist Storage Handling ---
function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge(); // Keep UI synced
}

// --- Wishlist Actions ---
function toggleWishlist(product) {
    const wishlist = getWishlist();
    const index = wishlist.findIndex(p => p.id === product.id);

    if (index === -1) {
        wishlist.push(product);
        saveWishlist(wishlist);
        updateHeartIcon(true);
        showSuccessMessage("Added to wishlist!");
    } else {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        updateHeartIcon(false);
        showSuccessMessage("Removed from wishlist!");
    }
}

function isInWishlist(productId) {
    return getWishlist().some(p => p.id === productId);
}

// --- UI Updates ---
function updateWishlistBadge() {
    const count = getWishlist().length;
    const badge = document.getElementById('wishlist-item-count');
    if (badge) badge.textContent = count;
}

function updateHeartIcon(isActive) {
    const heart = document.getElementById('heart-icon');
    if (heart) heart.style.color = isActive ? 'red' : '';
}

function showSuccessMessage(msg) {
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;top:20px;right:20px;background:green;color:white;padding:10px;border-radius:5px;z-index:1000';
    box.innerText = msg;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
}

// --- Init Badge on Page Load ---
document.addEventListener('DOMContentLoaded', updateWishlistBadge);

// --- Sync across tabs ---
window.addEventListener('storage', function (e) {
    if (e.key === 'wishlist') {
        updateWishlistBadge();
    }
});
