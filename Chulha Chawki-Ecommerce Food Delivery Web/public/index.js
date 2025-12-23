// Loader and container logic
const loader = document.querySelector(".loadPage");
const container = document.querySelector(".container");
const cards = document.querySelectorAll(".card");

// Responsive food detail modal
cards.forEach(card => {
  card.addEventListener("click", () => {
    // Create overlay for food detail
    const overlay = document.createElement("div");
    overlay.className = "food-detail-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(44,83,100,0.65)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    // Responsive food detail card
    const div = document.createElement("div");
    div.classList.add("foodDetail");
    div.style.maxWidth = "95vw";
    div.style.width = "400px";
    div.style.boxSizing = "border-box";
    div.innerHTML = `
      <img src="${card.firstElementChild.src}" alt="" style="width:100%;max-width:340px;border-radius:20px;">
      <div class="detailText">
        <h1 style="font-size:2rem;">Foods You Like</h1>
        <h2 style="font-size:1.2rem;">Upto 40% OFF</h2>
        <p>Pay on delivery might be available</p>
        <p>Pay on delivery might be available</p>
        <p>Pay on delivery might be available</p>
        <p>Pay on delivery might be available</p>
        <button style="width:100%;margin-top:12px;">Add To Cart</button>
        <a href="#" class="back-btn" style="display:block;margin-top:10px;color:#6a82fb;">Back</a>
      </div>
    `;

    overlay.appendChild(div);
    document.body.appendChild(overlay);

    // Back button closes overlay
    div.querySelector(".back-btn").onclick = function(e) {
      e.preventDefault();
      document.body.removeChild(overlay);
    };

    // Close overlay on outside click
    overlay.onclick = function(e) {
      if (e.target === overlay) document.body.removeChild(overlay);
    };
  });
});

// Loader effect
container.style.display = "none";
setTimeout(() => {
  container.style.display = "block";
  loader.style.display = "none";
}, 1500);

// Login button/user icon responsive toggle
let isLoggedIn = false;
function toggleLoginButton() {
  const loginBtn = document.querySelector('.login-btn');
  const userIcon = document.querySelector('.fa-user');
  if (loginBtn && userIcon) {
    if (isLoggedIn) {
      loginBtn.style.display = 'none';
      userIcon.style.display = 'inline-block';
    } else {
      loginBtn.style.display = 'inline-block';
      userIcon.style.display = 'none';
    }
  }
}
toggleLoginButton();
function loginUser() {
  isLoggedIn = true;
  toggleLoginButton();
}

// Explore modal logic (responsive)
const exploreBtn = document.querySelector('.mainText button');
const exploreModal = document.getElementById('explore-modal');
const closeModalBtn = document.querySelector('.close-modal');
if (exploreBtn && exploreModal && closeModalBtn) {
  exploreBtn.addEventListener('click', () => {
    exploreModal.style.display = 'flex';
    exploreModal.style.alignItems = 'center';
    exploreModal.style.justifyContent = 'center';
  });
  closeModalBtn.addEventListener('click', () => {
    exploreModal.style.display = 'none';
  });
  exploreModal.addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
}

// Responsive adjustments for modal and overlays
window.addEventListener('resize', () => {
  document.querySelectorAll('.food-detail-overlay .foodDetail').forEach(div => {
    if (window.innerWidth < 500) {
      div.style.width = "98vw";
      div.style.maxWidth = "98vw";
    } else {
      div.style.width = "400px";
      div.style.maxWidth = "95vw";
    }
  });
});
// Add this to your JS file
document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    btn.classList.add('clicked');
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'order-popup-overlay';
    overlay.innerHTML = `
      <div class="order-popup">
        <span class="close-order-popup">&times;</span>
        <h2>Order Placed!</h2>
        <p>Your order has been added to the cart.<br>Thank you for choosing Chulha Chawki!</p>
      </div>
    `;
    document.body.appendChild(overlay);
    // Close popup
    overlay.querySelector('.close-order-popup').onclick = () => {
      document.body.removeChild(overlay);
      btn.classList.remove('clicked');
    };
    overlay.onclick = function(e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        btn.classList.remove('clicked');
      }
    };
  });
});
// ...existing code...

// --- Cart Functionality ---
let cart = [];

// Utility: Update cart count badge
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Utility: Calculate total price
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// Utility: Render cart modal items
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">₹${item.price}</div>
        </div>
        <button class="cart-item-remove" data-idx="${idx}">&times;</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }
  document.getElementById('cart-total-price').textContent = `₹${getCartTotal()}`;
  // Remove item event
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    };
  });
}

// Show cart modal
function showCartModal() {
  document.getElementById('cart-modal').style.display = 'flex';
  renderCart();
}

// Hide cart modal
function hideCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Cart icon click
document.getElementById('cart-icon').onclick = showCartModal;
document.querySelector('.close-cart-modal').onclick = hideCartModal;
document.getElementById('cart-modal').onclick = function(e) {
  if (e.target === this) hideCartModal();
};

// Checkout button
document.getElementById('checkout-btn').onclick = function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout successful! Thank you for ordering.');
  cart = [];
  updateCartCount();
  renderCart();
  hideCartModal();
};

// Add to cart from food cards
document.querySelectorAll('.foodCard .card').forEach(card => {
  const btn = card.querySelector('.order-btn');
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    // Get food info
    const img = card.querySelector('img').src;
    const title = card.querySelector('p').textContent;
    const priceText = card.querySelector('.price') ? card.querySelector('.price').textContent : '0';
    const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
    cart.push({ img, title, price });
    updateCartCount();
    // Show popup
    btn.classList.add('clicked');
    const overlay = document.createElement('div');
    overlay.className = 'order-popup-overlay';
    overlay.innerHTML = `
      <div class="order-popup">
        <span class="close-order-popup">&times;</span>
        <h2>Order Added!</h2>
        <p>${title} has been added to your cart.<br>Go to cart to checkout.</p>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.close-order-popup').onclick = () => {
      document.body.removeChild(overlay);
      btn.classList.remove('clicked');
    };
    overlay.onclick = function(ev) {
      if (ev.target === overlay) {
        document.body.removeChild(overlay);
        btn.classList.remove('clicked');
      }
    };
  });
});
// ...existing code...

// Hamburger menu toggle for mobile navigation
const hamburger = document.getElementById('bar');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger icon
    hamburger.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// Optional: Close nav when clicking outside
document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ...existing code...

// ...existing code...