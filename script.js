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

    // ============================================
    // Делегування подій для модального вікна
    // ============================================

    const modal = document.getElementById('bookModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalClose = document.querySelector('.modal-close');
    const booksGrid = document.querySelector('.books-grid');

    // Отримання елементів модального вікна для заповнення даними
    const modalImage = document.getElementById('modalImage');
    const modalPrice = document.getElementById('modalPrice');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDescription = document.getElementById('modalDescription');

    // Делегування події click на батьківському елементі .books-grid
    booksGrid.addEventListener('click', function (event) {
        // Знаходимо найближчу book-card, якщо клік відбувся всередині неї
        const bookCard = event.target.closest('.book-card');

        // Перевіряємо, що клік був на book-card і не на кнопці "В КОРЗИНУ"
        if (bookCard && !event.target.closest('button')) {
            // Отримуємо дані з книжкової картки
            const image = bookCard.querySelector('.book-image').src;
            const imageAlt = bookCard.querySelector('.book-image').alt;
            const price = bookCard.querySelector('.book-price').textContent;
            const title = bookCard.querySelector('h3').textContent;
            const author = bookCard.querySelector('.book-author').textContent;
            const description = bookCard.getAttribute('data-description');

            // Заповнюємо модальне вікно даними
            modalImage.src = image;
            modalImage.alt = imageAlt;
            modalPrice.textContent = price;
            modalTitle.textContent = title;
            modalAuthor.textContent = author;
            modalDescription.textContent = description;

            // Відкриваємо модальне вікно
            modal.classList.add('active');
            // Блокуємо прокрутку body коли модалка відкрита
            document.body.style.overflow = 'hidden';
        }
    });

    // Функція закриття модального вікна
    function closeModal() {
        modal.classList.remove('active');
        // Відновлюємо прокрутку body
        document.body.style.overflow = '';
    }

    // Закриття модалки при кліку на кнопку закриття
    modalClose.addEventListener('click', closeModal);

    // Закриття модалки при кліку на backdrop (темний фон)
    modalBackdrop.addEventListener('click', closeModal);

    // Закриття модалки при натисканні клавіші Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
