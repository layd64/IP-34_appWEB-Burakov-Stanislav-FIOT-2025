document.addEventListener('DOMContentLoaded', function () {
    // Update navigation based on authentication status
    function updateNavigation() {
        // Check if auth.js is loaded
        if (typeof authSystem === 'undefined') {
            return;
        }

        const currentUser = authSystem.getCurrentUser();
        const authNavItem = document.getElementById('authNavItem');
        const mobileAuthNavItem = document.getElementById('mobileAuthNavItem');
        const loginLink = document.getElementById('loginLink');
        const mobileLoginLink = document.getElementById('mobileLoginLink');
        const profileLink = document.getElementById('profileLink');
        const mobileProfileLink = document.getElementById('mobileProfileLink');

        if (currentUser) {
            // User is logged in
            if (authNavItem && loginLink) {
                loginLink.textContent = 'Профіль';
                loginLink.href = 'profile.html';
            }
            if (mobileAuthNavItem && mobileLoginLink) {
                mobileLoginLink.textContent = 'Профіль';
                mobileLoginLink.href = 'profile.html';
            }
        } else {
            // User is not logged in
            if (authNavItem && loginLink) {
                loginLink.textContent = 'Вхід';
                loginLink.href = 'login.html';
            }
            if (mobileAuthNavItem && mobileLoginLink) {
                mobileLoginLink.textContent = 'Вхід';
                mobileLoginLink.href = 'login.html';
            }
        }
    }

    // Update navigation on page load (with delay to ensure auth.js is loaded)
    setTimeout(updateNavigation, 100);

    // Also update when auth.js loads
    if (typeof authSystem !== 'undefined') {
        updateNavigation();
    } else {
        // Wait for auth.js to load
        window.addEventListener('load', function () {
            setTimeout(updateNavigation, 100);
        });
    }

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

    // Only initialize cart if elements exist
    if (cartBtn || mobileCartBtn) {

        const itemsPerPage = 5;
        let currentPage = 1;

        function updateCartUI() {
            const count = cart.length;
            if (cartCount) cartCount.textContent = count;
            if (mobileCartCount) mobileCartCount.textContent = `(${count})`;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(book) {
            // Check if user is authenticated
            if (typeof authSystem === 'undefined' || !authSystem.isAuthenticated()) {
                alert('Будь ласка, увійдіть до облікового запису, щоб додавати книги до кошика.');
                const loginUrl = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
                if (confirm('Перейти на сторінку входу?')) {
                    window.location.href = loginUrl;
                }
                return false;
            }

            cart.push(book);
            updateCartUI();
            // Optional: Show a toast or notification
            alert(`Книгу "${book.title}" додано до кошика!`);
            return true;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
            renderCart();
        }

        function renderCart() {
            if (!cartItemsContainer || !cartPaginationContainer) return;
            cartItemsContainer.innerHTML = '';
            cartPaginationContainer.innerHTML = '';
            let total = 0;

            // Calculate total price for ALL items
            cart.forEach(item => {
                const priceValue = parseInt(item.price.replace(/\D/g, ''));
                total += priceValue;
            });
            if (cartTotalAmount) cartTotalAmount.textContent = `${total} грн`;

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
            if (!cartModal || !cartItemsContainer) return;
            renderCart();
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        if (cartBtn) {
            cartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                openCartModal();
            });
        }

        if (mobileCartBtn) {
            mobileCartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                openCartModal();
                // Close mobile menu if open
                if (burgerIcon && mobileMenu) {
                    burgerIcon.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        }

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

        // Delegate click event on parent element .books-grid (if exists)
        if (booksGrid) {
            booksGrid.addEventListener('click', function (event) {
                const bookCard = event.target.closest('.book-card');
                const addToCartBtn = event.target.closest('button');
                const bookCardLink = event.target.closest('.book-card-link');

                // If clicking on link, let it navigate naturally
                if (bookCardLink) {
                    return;
                }

                if (bookCard) {
                    // Get data from book card
                    const image = bookCard.querySelector('.book-image').src;
                    const price = bookCard.querySelector('.book-price').textContent;
                    const title = bookCard.querySelector('h3').textContent;
                    const author = bookCard.querySelector('.book-author').textContent;
                    const description = bookCard.getAttribute('data-description');
                    const bookId = bookCard.getAttribute('data-book-id');

                    const bookData = { image, price, title, author, description };

                    if (addToCartBtn) {
                        // Add to cart directly
                        event.stopPropagation();
                        addToCart(bookData);
                    } else if (bookId && modalCartBtn && bookModal) {
                        // Open modal (only if modal exists)
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
                    } else if (bookId) {
                        // Navigate to book page if modal doesn't exist
                        window.location.href = `book.html?id=${bookId}`;
                    }
                }
            });
        }

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
    } // End of cart initialization block

    // --- Catalog Logic ---
    const catalogGrid = document.getElementById('catalogGrid');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortBy = document.getElementById('sortBy');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const noResults = document.getElementById('noResults');

    // Only initialize catalog if elements exist (catalog page)
    if (catalogGrid && searchInput && genreFilter && ratingFilter && priceFilter && sortBy && resetFiltersBtn && noResults) {
        // Book catalog data with detailed information
        // Make it globally available for book-details.js
        window.catalogBooks = [
            {
                id: 1,
                title: 'Кобзар',
                author: 'Тарас Шевченко',
                genre: 'Поезія',
                price: 300,
                rating: 5,
                image: 'assets/kobzar.png',
                description: 'Збірка віршів видатного українського поета Тараса Шевченка. "Кобзар" є символом боротьби українського народу за свободу і незалежність, втіленням народної мудрості та духовності.'
            },
            {
                id: 2,
                title: 'Кайдашева сім\'я',
                author: 'Іван Нечуй-Левицький',
                genre: 'Художня література',
                price: 450,
                rating: 4,
                image: 'assets/book2.png',
                description: 'Соціально-побутова повість Івана Нечуя-Левицького про непросте життя селянської родини. Гумористичний та водночас драматичний твір, що розкриває традиції та звичаї українського села XIX століття.'
            },
            {
                id: 3,
                title: 'Енеїда',
                author: 'Іван Котляревський',
                genre: 'Поезія',
                price: 249,
                rating: 5,
                image: 'assets/book3.png',
                description: 'Іван Котляревський створив травестійну поему на основі "Енеїди" Вергілія. Це перший твір написаний живою українською мовою, що поклав початок новій українській літературі. Гумористичний твір про пригоди троянців.'
            },
            {
                id: 4,
                title: 'Лісова пісня',
                author: 'Леся Українка',
                genre: 'Драма',
                price: 320,
                rating: 5,
                image: 'assets/book1.webp',
                description: 'Поетична драма-феєрія Лесі Українки, яка поєднує фольклорні мотиви з глибокою філософією. Твір про кохання, природу та вічну боротьбу добра зі злом.'
            },
            {
                id: 5,
                title: 'Код майбутнього',
                author: 'Сара Джонсон',
                genre: 'Наукова фантастика',
                price: 550,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Захоплюючий роман про штучний інтелект та майбутнє технологій. Головний герой намагається розгадати таємницю коду, який може змінити світ.'
            },
            {
                id: 6,
                title: 'Таємниця океану',
                author: 'Майкл Чен',
                genre: 'Детектив',
                price: 480,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Загадковий детектив про зникнення корабля та таємниці глибин океану. Детектив намагається розкрити правду про загадкову подію.'
            },
            {
                id: 7,
                title: 'Цифрова революція',
                author: 'Емма Девіс',
                genre: 'Наукова фантастика',
                price: 520,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Футуристичний роман про технологічну революцію, яка змінює суспільство. Автор досліджує етичні питання майбутнього.'
            },
            {
                id: 8,
                title: 'Космічна одіссея',
                author: 'Роберт Вілсон',
                genre: 'Наукова фантастика',
                price: 600,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Епічна космічна сага про подорож до далеких галактик. Герої стикаються з невідомими цивілізаціями та викликами космосу.'
            },
            {
                id: 9,
                title: 'Загадка старого замку',
                author: 'Олена Петренко',
                genre: 'Детектив',
                price: 380,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Детективна історія про таємниці старого замку та зниклі скарби. Читач разом з героями розгадує загадки минулого.'
            },
            {
                id: 10,
                title: 'Шлях до успіху',
                author: 'Андрій Коваленко',
                genre: 'Саморозвиток',
                price: 350,
                rating: 3,
                image: 'assets/slideshow/books.png',
                description: 'Практичний посібник з саморозвитку та досягнення цілей. Автор ділиться досвідом та ефективними стратегіями успіху.'
            },
            {
                id: 11,
                title: 'Життя видатних людей',
                author: 'Марія Іваненко',
                genre: 'Біографія',
                price: 420,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Збірка біографій видатних особистостей, які змінили світ. Натхненні історії про досягнення та подолання перешкод.'
            },
            {
                id: 12,
                title: 'Романтика вічності',
                author: 'Софія Мороз',
                genre: 'Романтика',
                price: 290,
                rating: 3,
                image: 'assets/slideshow/books.png',
                description: 'Романтична історія про кохання, яке долає всі перешкоди. Емоційний твір про вічні почуття та пристрасть.'
            },
            {
                id: 13,
                title: 'Захар Беркут',
                author: 'Іван Франко',
                genre: 'Художня література',
                price: 380,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Історична повість про боротьбу українського народу за незалежність. Епічний твір про мужність та патріотизм.'
            },
            {
                id: 14,
                title: 'Тіні забутих предків',
                author: 'Михайло Коцюбинський',
                genre: 'Художня література',
                price: 340,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Поетична повість про життя гуцулів, їхні традиції та звичаї. Твір про кохання, смерть та вічність.'
            },
            {
                id: 15,
                title: 'Майстер і Маргарита',
                author: 'Михайло Булгаков',
                genre: 'Художня література',
                price: 520,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Філософський роман про добро і зло, кохання та жертву. Один з найвизначніших творів світової літератури.'
            },
            {
                id: 16,
                title: '1984',
                author: 'Джордж Орвелл',
                genre: 'Антиутопія',
                price: 450,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Класичний роман-антиутопія про тоталітарне суспільство та боротьбу за свободу думки.'
            },
            {
                id: 17,
                title: 'Гаррі Поттер і філософський камінь',
                author: 'Дж. К. Роулінг',
                genre: 'Фентезі',
                price: 480,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Перша книга про пригоди юного чарівника Гаррі Поттера у світі магії та чарівництва.'
            },
            {
                id: 18,
                title: 'Володар перснів',
                author: 'Дж. Р. Р. Толкін',
                genre: 'Фентезі',
                price: 550,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Епічна трилогія про боротьбу добра зі злом у вигаданому світі Середзем\'я.'
            },
            {
                id: 19,
                title: 'Шерлок Холмс',
                author: 'Артур Конан Дойл',
                genre: 'Детектив',
                price: 420,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Збірка детективних оповідань про знаменитого детектива Шерлока Холмса та його друга доктора Ватсона.'
            },
            {
                id: 20,
                title: 'Анна Кареніна',
                author: 'Лев Толстой',
                genre: 'Художня література',
                price: 490,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Класичний роман про кохання, зраду та суспільні норми в Росії XIX століття.'
            },
            {
                id: 21,
                title: 'Війна і мир',
                author: 'Лев Толстой',
                genre: 'Художня література',
                price: 680,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Епічний роман про російське суспільство під час наполеонівських воєн. Один з найбільших творів світової літератури.'
            },
            {
                id: 22,
                title: 'Пригоди Тома Сойєра',
                author: 'Марк Твен',
                genre: 'Пригоди',
                price: 320,
                rating: 4,
                image: 'assets/slideshow/books.png',
                description: 'Захоплюючі пригоди хлопчика Тома Сойєра та його друга Гекльберрі Фінна на Міссісіпі.'
            },
            {
                id: 23,
                title: 'Гра престолів',
                author: 'Джордж Р. Р. Мартін',
                genre: 'Фентезі',
                price: 560,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Перша книга серії "Пісня льоду та полум\'я" про боротьбу за залізний трон у вигаданому світі Вестеросу.'
            },
            {
                id: 24,
                title: 'Дюна',
                author: 'Френк Герберт',
                genre: 'Наукова фантастика',
                price: 540,
                rating: 5,
                image: 'assets/slideshow/books.png',
                description: 'Епічний науково-фантастичний роман про пустельну планету Арракіс та боротьбу за контроль над спецією.'
            }
        ];

        // Get unique genres for filter
        const genres = [...new Set(window.catalogBooks.map(book => book.genre))].sort();
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });

        // Function to get book rating (from reviews if available, otherwise default)
        function getBookRating(bookId) {
            // Try to get average rating from reviews
            try {
                const reviewsJson = localStorage.getItem('bookstore_reviews');
                if (reviewsJson) {
                    const allReviews = JSON.parse(reviewsJson);
                    const bookReviews = allReviews.filter(review => review.bookId === parseInt(bookId));
                    if (bookReviews.length > 0) {
                        const sum = bookReviews.reduce((acc, review) => acc + review.rating, 0);
                        return parseFloat((sum / bookReviews.length).toFixed(1));
                    }
                }
            } catch (e) {
                // If error, fall back to default rating
            }
            // Fallback to default rating
            const book = window.catalogBooks.find(b => b.id === parseInt(bookId));
            return book ? book.rating : 0;
        }

        function renderCatalog(books = window.catalogBooks) {
            catalogGrid.innerHTML = '';
            noResults.style.display = 'none';

            if (books.length === 0) {
                noResults.style.display = 'block';
                return;
            }

            books.forEach(book => {
                const bookRating = getBookRating(book.id);
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');
                bookCard.setAttribute('data-description', book.description);
                bookCard.innerHTML = `
                <a href="book.html?id=${book.id}" class="book-card-link">
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                    <p class="book-price">${book.price} грн</p>
                    <div class="book-rating-card">
                        <span class="book-rating-stars">${'⭐'.repeat(Math.round(bookRating))}</span>
                        <span class="book-rating-value">${bookRating.toFixed(1)}</span>
                    </div>
                    <h3>${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </a>
                <button data-book-id="${book.id}">В КОШИК</button>
            `;

                // Add to cart button handler
                const addToCartBtn = bookCard.querySelector('button');
                addToCartBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const bookData = {
                        image: book.image,
                        price: `${book.price} грн`,
                        title: book.title,
                        author: book.author,
                        description: book.description
                    };
                    addToCart(bookData);
                });

                catalogGrid.appendChild(bookCard);
            });
        }

        function openBookModal(book) {
            const bookData = {
                image: book.image,
                price: `${book.price} грн`,
                title: book.title,
                author: book.author,
                description: book.description
            };

            modalImage.src = bookData.image;
            modalPrice.textContent = bookData.price;
            modalTitle.textContent = bookData.title;
            modalAuthor.textContent = bookData.author;
            modalDescription.textContent = bookData.description;

            modalCartBtn.onclick = function () {
                addToCart(bookData);
                bookModal.classList.remove('active');
                document.body.style.overflow = '';
            };

            bookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function filterBooks() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedGenre = genreFilter.value;
            const minRating = parseInt(ratingFilter.value) || 0;
            const priceRange = priceFilter.value;
            const sortOption = sortBy.value;

            let filtered = window.catalogBooks.filter(book => {
                // Search filter
                const matchesSearch = !searchTerm ||
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm);

                // Genre filter
                const matchesGenre = !selectedGenre || book.genre === selectedGenre;

                // Rating filter - use actual rating from reviews or default
                const bookRating = getBookRating(book.id);
                const matchesRating = bookRating >= minRating;

                // Price filter
                let matchesPrice = true;
                if (priceRange) {
                    if (priceRange === '0-200') {
                        matchesPrice = book.price <= 200;
                    } else if (priceRange === '200-400') {
                        matchesPrice = book.price > 200 && book.price <= 400;
                    } else if (priceRange === '400-600') {
                        matchesPrice = book.price > 400 && book.price <= 600;
                    } else if (priceRange === '600+') {
                        matchesPrice = book.price > 600;
                    }
                }

                return matchesSearch && matchesGenre && matchesRating && matchesPrice;
            });

            // Sort books
            if (sortOption === 'rating-desc') {
                filtered.sort((a, b) => {
                    const ratingA = getBookRating(a.id);
                    const ratingB = getBookRating(b.id);
                    return ratingB - ratingA; // Descending
                });
            } else if (sortOption === 'rating-asc') {
                filtered.sort((a, b) => {
                    const ratingA = getBookRating(a.id);
                    const ratingB = getBookRating(b.id);
                    return ratingA - ratingB; // Ascending
                });
            }

            renderCatalog(filtered);
        }

        // Event listeners for filters
        searchInput.addEventListener('input', filterBooks);
        genreFilter.addEventListener('change', filterBooks);
        ratingFilter.addEventListener('change', filterBooks);
        priceFilter.addEventListener('change', filterBooks);
        sortBy.addEventListener('change', filterBooks);

        resetFiltersBtn.addEventListener('click', function () {
            searchInput.value = '';
            genreFilter.value = '';
            ratingFilter.value = '0';
            priceFilter.value = '';
            sortBy.value = 'none';
            filterBooks();
        });

        // Initial render
        renderCatalog();

        // Add event delegation for catalog grid if booksGrid doesn't exist
        if (catalogGrid && !booksGrid) {
            catalogGrid.addEventListener('click', function (event) {
                const bookCard = event.target.closest('.book-card');
                const addToCartBtn = event.target.closest('button');
                const bookCardLink = event.target.closest('.book-card-link');

                // If clicking on link, let it navigate naturally
                if (bookCardLink) {
                    return;
                }

                if (bookCard) {
                    // Get data from book card
                    const image = bookCard.querySelector('.book-image').src;
                    const price = bookCard.querySelector('.book-price').textContent;
                    const title = bookCard.querySelector('h3').textContent;
                    const author = bookCard.querySelector('.book-author').textContent;
                    const description = bookCard.getAttribute('data-description');
                    const bookId = bookCard.getAttribute('data-book-id');

                    const bookData = { image, price, title, author, description };

                    if (addToCartBtn) {
                        // Add to cart directly
                        event.stopPropagation();
                        addToCart(bookData);
                    } else if (bookId) {
                        // Navigate to book page
                        window.location.href = `book.html?id=${bookId}`;
                    }
                }
            });
        }
    }
});
