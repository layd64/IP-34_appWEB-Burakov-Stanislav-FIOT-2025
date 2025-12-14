/**
 * BookStore Pro - Main Script
 * Handles global data, home page logic, and catalog functionality
 */

// Global book data source - Single Source of Truth
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

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile menu toggle
    initMobileMenu();

    // 2. Auth state updates (header, etc.)
    updateAuthUI();

    // 3. Cart functionality (simple placeholder logic or real if implemented)
    initCart();

    // 4. Page specific logic
    const path = window.location.pathname;

    if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
        renderHomePageCategories();
        initHomePage();
    } else if (path.endsWith('catalog.html')) {
        initCatalog();
    }
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }
}

/**
 * Update Header UI based on Auth State
 */
function updateAuthUI() {
    if (typeof authSystem === 'undefined') return;

    const currentUser = authSystem.getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');

    if (currentUser) {
        // Desktop
        if (loginLink) {
            loginLink.textContent = 'Профіль';
            loginLink.href = 'profile.html';
        }

        // Mobile
        if (mobileLoginLink) {
            mobileLoginLink.textContent = 'Профіль';
            mobileLoginLink.href = 'profile.html';
        }
    }
}

/**
 * Render Categories on Home Page
 */
function renderHomePageCategories() {
    const categoriesList = document.querySelector('.categories-list ul');
    if (!categoriesList) return;

    // Get unique genres
    const genres = [...new Set(window.catalogBooks.map(book => book.genre))].sort();

    // Render list
    categoriesList.innerHTML = genres.map(genre => `
        <li><a href="catalog.html?category=${encodeURIComponent(genre)}">${genre}</a></li>
    `).join('');
}

/**
 * Initialize Catalog Page
 */
function initCatalog() {
    const catalogGrid = document.getElementById('catalogGrid');
    const genreFilter = document.getElementById('genreFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetFilters');
    const noResults = document.getElementById('noResults');

    if (!catalogGrid) return;

    // 1. Populate Genre Filter
    const genres = [...new Set(window.catalogBooks.map(book => book.genre))].sort();
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

    // 2. Check URL params for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && genres.includes(categoryParam)) {
        genreFilter.value = categoryParam;
    }

    // 3. Render function
    function renderBooks() {
        // Collect filter values
        const genreValue = genreFilter.value;
        const ratingValue = parseInt(ratingFilter.value) || 0;
        const priceValue = priceFilter.value;
        const sortValue = sortBy.value;
        const searchValue = searchInput.value.toLowerCase().trim();

        // Filter books
        let filteredBooks = window.catalogBooks.filter(book => {
            // Genre
            if (genreValue && book.genre !== genreValue) return false;

            // Rating
            if (book.rating < ratingValue) return false;

            // Price
            if (priceValue) {
                const [min, max] = priceValue.split('-').map(v => v === '+' ? Infinity : parseInt(v));
                if (priceValue.includes('+')) {
                    if (book.price < 600) return false;
                } else {
                    if (book.price < min || book.price > max) return false;
                }
            }

            // Search
            if (searchValue) {
                const searchMatch = book.title.toLowerCase().includes(searchValue) ||
                    book.author.toLowerCase().includes(searchValue);
                if (!searchMatch) return false;
            }

            return true;
        });

        // Sort books
        if (sortValue === 'rating-desc') {
            filteredBooks.sort((a, b) => b.rating - a.rating);
        } else if (sortValue === 'rating-asc') {
            filteredBooks.sort((a, b) => a.rating - b.rating);
        }
        // Add Price sorting if needed (not in HTML select currently but good practice)

        // Render
        if (filteredBooks.length === 0) {
            catalogGrid.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            catalogGrid.innerHTML = filteredBooks.map(book => `
                <div class="book-card" data-book-id="${book.id}">
                    <a href="book.html?id=${book.id}" class="book-card-link">
                        <img src="${book.image}" alt="${book.title}" class="book-image">
                        <div class="book-info">
                            <h3>${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <p class="book-genre-small">${book.genre}</p>
                            <div class="book-rating-card">
                                <span class="book-rating-stars">${'⭐'.repeat(Math.round(book.rating))}</span>
                                <span class="book-rating-value">${book.rating}</span>
                            </div>
                            <p class="book-price">${book.price} грн</p>
                        </div>
                    </a>
                    <div class="card-actions">
                         <button class="add-to-cart-btn" onclick="addToCart({
                            id: ${book.id},
                            title: '${book.title.replace(/'/g, "\\'")}',
                            price: '${book.price} грн',
                            image: '${book.image}'
                         })">В КОШИК</button>
                         <button class="favorite-btn ${isFavorite(book.id) ? 'active' : ''}" 
                                 onclick="const btn = this; const isAdded = toggleFavorite(${book.id}); isAdded ? btn.classList.add('active') : btn.classList.remove('active');" 
                                 aria-label="Toggle favorite">
                            <svg viewBox="0 0 24 24" class="heart-icon">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // 4. Event Listeners
    genreFilter.addEventListener('change', renderBooks);
    ratingFilter.addEventListener('change', renderBooks);
    priceFilter.addEventListener('change', renderBooks);
    sortBy.addEventListener('change', renderBooks);
    searchInput.addEventListener('input', renderBooks);

    resetBtn.addEventListener('click', function () {
        genreFilter.value = '';
        ratingFilter.value = '0';
        priceFilter.value = '';
        sortBy.value = 'none';
        searchInput.value = '';

        // Clear URL param without reload
        const newUrl = window.location.pathname;
        window.history.pushState({ path: newUrl }, '', newUrl);

        renderBooks();
    });

    // Initial Render
    renderBooks();
}

/**
 * Cart Functionality Placeholder (or simple implementation)
 */
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = cartModal ? cartModal.querySelector('.modal-close') : null;
    const countSpan = document.getElementById('cartCount');
    const mobileCountSpan = document.getElementById('mobileCartCount');

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('bookstore_cart')) || [];
    updateCartCount();

    // Open Modal
    function openCart() {
        if (cartModal) {
            cartModal.style.display = 'flex';
            renderCartItems();
        }
    }

    if (cartBtn) cartBtn.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', (e) => { e.preventDefault(); openCart(); });

    // Close Modal
    if (closeBtn) closeBtn.addEventListener('click', () => { cartModal.style.display = 'none'; });
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal || e.target.classList.contains('modal-backdrop')) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Global add to cart function
    window.addToCart = function (book) {
        cart.push(book);
        localStorage.setItem('bookstore_cart', JSON.stringify(cart));
        updateCartCount();
        alert('Книгу додано до кошика!');
    };

    function updateCartCount() {
        if (countSpan) countSpan.textContent = cart.length;
        if (mobileCountSpan) mobileCountSpan.textContent = `(${cart.length})`;
    }

    function renderCartItems() {
        const container = document.querySelector('.cart-items-container');
        const totalAmountEl = document.getElementById('cartTotalAmount');
        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = '<p class="empty-cart-message">Ваш кошик порожній</p>';
            if (totalAmountEl) totalAmountEl.textContent = '0 грн';
            return;
        }

        let total = 0;
        container.innerHTML = cart.map((item, index) => {
            const price = parseInt(item.price.replace(/\D/g, ''));
            total += price;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.price}</p>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">Видалити</button>
                    </div>
                </div>
            `;
        }).join('');

        if (totalAmountEl) totalAmountEl.textContent = `${total} грн`;
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('bookstore_cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    };
}

/**
 * Initialize Home Page Logic
 */
function initHomePage() {
    // Add to Cart Buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const bookId = parseInt(this.getAttribute('data-book-id'));
            const book = window.catalogBooks.find(b => b.id === bookId);
            if (book) {
                addToCart({
                    id: book.id,
                    title: book.title,
                    price: book.price + ' грн',
                    image: book.image
                });
            }
        });
    });

    // Favorite Buttons
    const favBtns = document.querySelectorAll('.favorite-btn');
    favBtns.forEach(btn => {
        // Initialize state
        const bookId = parseInt(btn.getAttribute('data-book-id'));
        if (isFavorite(bookId)) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const isAdded = toggleFavorite(bookId);
            if (isAdded) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    });
}

/**
 * Check if book is favorite
 */
function isFavorite(bookId) {
    if (typeof authSystem !== 'undefined' && authSystem.isAuthenticated()) {
        return authSystem.isFavorite(bookId);
    }
    const favorites = JSON.parse(localStorage.getItem('bookstore_favorites')) || [];
    return favorites.includes(bookId);
}

/**
 * Toggle Favorite
 */
window.toggleFavorite = function (bookId) {
    if (typeof authSystem !== 'undefined' && authSystem.isAuthenticated()) {
        const result = authSystem.toggleFavorite(bookId);
        return result.success && result.action === 'added';
    }

    let favorites = JSON.parse(localStorage.getItem('bookstore_favorites')) || [];
    let added = false;

    if (!favorites.includes(bookId)) {
        favorites.push(bookId);
        added = true;
    } else {
        favorites = favorites.filter(id => id !== bookId);
        added = false;
    }

    localStorage.setItem('bookstore_favorites', JSON.stringify(favorites));
    return added;
    // Alerts removed as per request
};

// For backward compatibility if needed, or just remove old function
window.addToFavorites = window.toggleFavorite;
