document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.querySelector('.burger-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Toggle mobile menu
    burgerIcon.addEventListener('click', function () {
        burgerIcon.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            burgerIcon.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.burger-menu') && !event.target.closest('.mobile-menu')) {
            burgerIcon.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // --- Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cartBtn');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartPaginationContainer = document.querySelector('.cart-pagination');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const checkoutBtn = document.querySelector('.checkout-btn');

    const itemsPerPage = 5;
    let currentPage = 1;

    function updateCartUI() {
        const count = cart.length;
        cartCount.textContent = count;
        mobileCartCount.textContent = `(${count})`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(book) {
        cart.push(book);
        updateCartUI();
        // Optional: Show a toast or notification
        alert(`Книгу "${book.title}" додано до кошика!`);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        cartPaginationContainer.innerHTML = '';
        let total = 0;

        // Calculate total price for ALL items
        cart.forEach(item => {
            const priceValue = parseInt(item.price.replace(/\D/g, ''));
            total += priceValue;
        });
        cartTotalAmount.textContent = `${total} грн`;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Ваш кошик порожній</p>';
            return;
        }

        // Pagination Logic
        const totalPages = Math.ceil(cart.length / itemsPerPage);

        // Validate currentPage
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = cart.slice(startIndex, endIndex);

        itemsToShow.forEach((item, i) => {
            const actualIndex = startIndex + i;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-author">${item.author}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <button class="cart-item-remove" data-index="${actualIndex}" aria-label="Remove item">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });

        // Render Pagination Controls if needed
        if (totalPages > 1) {
            renderPaginationControls(totalPages);
        }
    }

    function renderPaginationControls(totalPages) {
        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('pagination-btn');
        prevBtn.textContent = '<';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCart();
            }
        });
        cartPaginationContainer.appendChild(prevBtn);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.classList.add('pagination-btn');
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderCart();
            });
            cartPaginationContainer.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('pagination-btn');
        nextBtn.textContent = '>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCart();
            }
        });
        cartPaginationContainer.appendChild(nextBtn);
    }

    function openCartModal() {
        renderCart();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openCartModal();
    });

    mobileCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openCartModal();
        // Close mobile menu if open
        burgerIcon.classList.remove('active');
        mobileMenu.classList.remove('active');
    });

    // Initial UI update
    updateCartUI();


    // --- Book Modal Logic ---
    const bookModal = document.getElementById('bookModal');
    const booksGrid = document.querySelector('.books-grid');
    const modalImage = document.getElementById('modalImage');
    const modalPrice = document.getElementById('modalPrice');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDescription = document.getElementById('modalDescription');
    const modalCartBtn = document.querySelector('.modal-cart-btn');

    // Delegate click event on parent element .books-grid
    booksGrid.addEventListener('click', function (event) {
        const bookCard = event.target.closest('.book-card');
        const addToCartBtn = event.target.closest('button');

        if (bookCard) {
            // Get data from book card
            const image = bookCard.querySelector('.book-image').src;
            const price = bookCard.querySelector('.book-price').textContent;
            const title = bookCard.querySelector('h3').textContent;
            const author = bookCard.querySelector('.book-author').textContent;
            const description = bookCard.getAttribute('data-description');

            const bookData = { image, price, title, author, description };

            if (addToCartBtn) {
                // Add to cart directly
                addToCart(bookData);
            } else {
                // Open modal
                modalImage.src = image;
                modalPrice.textContent = price;
                modalTitle.textContent = title;
                modalAuthor.textContent = author;
                modalDescription.textContent = description;

                // Store current book data on the modal button for adding to cart later
                modalCartBtn.onclick = function () {
                    addToCart(bookData);
                    bookModal.classList.remove('active');
                    document.body.style.overflow = '';
                };

                bookModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Generic Modal Closing Logic
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const backdrops = document.querySelectorAll('.modal-backdrop');

    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', closeAllModals);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

    // Checkout button (placeholder)
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cart.length > 0) {
                alert('Дякуємо за замовлення!');
                cart = [];
                updateCartUI();
                closeAllModals();
            } else {
                alert('Ваш кошик порожній!');
            }
        });
    }
});
