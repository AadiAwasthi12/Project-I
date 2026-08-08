
function toggleMenu() {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        navMenu.classList.toggle("active");
    }
}


function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    const overlay = document.getElementById("cart-overlay");

    if (cartPanel) cartPanel.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}


function closeIfOverlayClicked(event) {
    if (event.target.id === "cart-overlay") {
        toggleCart();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        navMenu.addEventListener("click", function (event) {
            if (event.target.tagName === "A") {
                navMenu.classList.remove("active");
            }
        });
    }
});