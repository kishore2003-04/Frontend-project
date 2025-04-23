document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.featured-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu filtering
    const menuFilters = document.querySelectorAll('.menu-filters .btn');
    const menuItems = document.querySelectorAll('.menu-item');

    menuFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            menuFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const category = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.parentElement.getAttribute('data-category') === category) {
                    item.parentElement.style.display = 'block';
                } else {
                    item.parentElement.style.display = 'none';
                }
            });
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const formElements = contactForm.elements;
            let isValid = true;
            
            for (let element of formElements) {
                if (element.required && !element.value.trim()) {
                    isValid = false;
                    element.classList.add('is-invalid');
                } else {
                    element.classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim()) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }

    // Gallery modal
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    window.openGalleryModal = function(element) {
        const modalImg = document.querySelector('#galleryModal img');
        modalImg.src = element.querySelector('img').src;
        galleryModal.show();
    };
});

// Shopping cart functionality
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    
    // Show feedback
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="toast-body bg-success text-white">
            ${name} added to cart
        </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    setTimeout(() => toast.remove(), 3000);
}

function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = cart.length;
    
    // Update cart items
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h6>${item.name}</h6>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">×</button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! We will prepare it right away.');
    cart = [];
    updateCart();
    
    const offcanvas = document.getElementById('cartOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
    bsOffcanvas.hide();
}

// Add the missing showOrderModal function
function showOrderModal() {
    alert('Order online functionality is not implemented yet.');
}