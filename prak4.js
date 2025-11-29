document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.prak4-button');

    // Завдання 1
    buttons[0].addEventListener('click', function () {
        const value = prompt('Введіть число:');

        if (value === null) {
            console.log('Введення скасовано');
            return;
        }

        console.log(`Введене значення: ${value}`);

        const numValue = Number(value);

        if (isNaN(numValue)) {
            alert('Введено не числове значення');
        } else if (numValue < 0) {
            alert('Число від\'ємне');
        } else if (numValue > 0) {
            alert('Число додатнє');
        } else {
            alert('Число дорівнює нулю');
        }
    });

    // Завдання 2
    buttons[1].addEventListener('click', function () {
        const number = prompt('Введіть число від 1 до 4:');
        let result;

        switch (number) {
            case '1':
                result = 'зима';
                break;
            case '2':
                result = 'весна';
                break;
            case '3':
                result = 'літо';
                break;
            case '4':
                result = 'осінь';
                break;
            default:
                result = 'невідомий місяць';
        }

        console.log(`Результат: ${result}`);
        alert(`Результат: ${result}`);
    });

    // Завдання 3
    buttons[2].addEventListener('click', function () {
        const adminLogin = 'Admin';
        const adminPassword = 'admin123';
        const userLogin = 'User';
        const userPassword = 'user123';

        const login = prompt('Введіть логін:');

        console.log(`Введений логін: ${login}`);

        if (login === null || login === '') {
            alert('Cancelled');
            return;
        }

        const trimmedLogin = login.trim();

        if (trimmedLogin === 'Admin') {
            const password = prompt('Введіть пароль:');
            if (password === adminPassword) {
                alert('Hello, Admin');
            } else if (password === null || password === '') {
                alert('Cancelled');
            } else {
                alert('I don\'t know you');
            }
        } else if (trimmedLogin === 'User') {
            const password = prompt('Введіть пароль:');
            if (password === userPassword) {
                alert('Hello, User');
            } else if (password === null || password === '') {
                alert('Cancelled');
            } else {
                alert('I don\'t know you');
            }
        } else {
            alert('I don\'t know you');
        }
    });

    // Завдання 4
    buttons[3].addEventListener('click', function () {
        function makeTransaction(quantity, pricePerDroid) {
            const totalPrice = quantity * pricePerDroid;
            return `You ordered ${quantity} droids worth ${totalPrice} credits!`;
        }

        const quantityInput = prompt('Введіть кількість дроїдів:');
        if (quantityInput === null) {
            alert('Операцію скасовано');
            return;
        }

        const priceInput = prompt('Введіть ціну одного дроїда:');
        if (priceInput === null) {
            alert('Операцію скасовано');
            return;
        }

        const quantity = Number(quantityInput);
        const pricePerDroid = Number(priceInput);

        if (isNaN(quantity) || isNaN(pricePerDroid)) {
            alert('Будь ласка, введіть числові значення');
            return;
        }

        const result = makeTransaction(quantity, pricePerDroid);
        console.log(result);
        alert(result);
    });

    // Завдання 5
    buttons[4].addEventListener('click', function () {
        function checkForSpam(message) {
            const lowerMessage = message.toLowerCase();
            return lowerMessage.includes('spam') || lowerMessage.includes('sale');
        }

        const message = prompt('Введіть повідомлення для перевірки:');

        if (message === null) {
            alert('Операцію скасовано');
            return;
        }

        const hasSpam = checkForSpam(message);
        const result = hasSpam ? 'Знайдено заборонені слова (spam або sale)' : 'Заборонених слів не знайдено';

        console.log(`Повідомлення: "${message}"`);
        console.log(`Результат перевірки: ${hasSpam}`);
        alert(result);
    });

    // Завдання 6
    buttons[5].addEventListener('click', function () {
        function filterArray(numbers, value) {
            const filteredArray = [];

            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] > value) {
                    filteredArray.push(numbers[i]);
                }
            }

            return filteredArray;
        }

        const numbersInput = prompt('Введіть числа через кому (наприклад: 1, 2, 3, 4, 5):');
        if (numbersInput === null) {
            alert('Операцію скасовано');
            return;
        }

        const valueInput = prompt('Введіть значення для фільтрації:');
        if (valueInput === null) {
            alert('Операцію скасовано');
            return;
        }

        const numbersStrings = numbersInput.split(',').map(item => item.trim());
        const numbers = numbersStrings.map(Number);
        const value = Number(valueInput);

        if (numbers.some(isNaN) || isNaN(value)) {
            alert('Будь ласка, введіть правильні числові значення');
            return;
        }

        const filtered = filterArray(numbers, value);
        console.log('Початковий масив:', numbers);
        console.log('Значення для фільтрації:', value);
        console.log('Відфільтрований масив:', filtered);
        alert(`Результат: [${filtered.join(', ')}]`);
    });

    // Завдання 7
    buttons[6].addEventListener('click', function () {
        // Функція для знаходження мін/макс для парних/непарних індексів
        function findMinMaxForIndices(arr) {
            const evenValues = [];
            const oddValues = [];

            for (let i = 0; i < arr.length; i++) {
                if (i % 2 === 0) {
                    evenValues.push(arr[i]);
                } else {
                    oddValues.push(arr[i]);
                }
            }

            const evenMax = evenValues.length > 0 ? Math.max(...evenValues) : null;
            const evenMin = evenValues.length > 0 ? Math.min(...evenValues) : null;
            const oddMax = oddValues.length > 0 ? Math.max(...oddValues) : null;
            const oddMin = oddValues.length > 0 ? Math.min(...oddValues) : null;

            return { evenMax, evenMin, oddMax, oddMin };
        }

        // Функція для сортування масиву в порядку спадання методом вибору
        function selectionSortDesc(arr) {
            const sortedArr = [...arr];

            for (let i = 0; i < sortedArr.length - 1; i++) {
                let maxIndex = i;

                for (let j = i + 1; j < sortedArr.length; j++) {
                    if (sortedArr[j] > sortedArr[maxIndex]) {
                        maxIndex = j;
                    }
                }

                if (maxIndex !== i) {
                    [sortedArr[i], sortedArr[maxIndex]] = [sortedArr[maxIndex], sortedArr[i]];
                }
            }

            return sortedArr;
        }

        const sizeInput = prompt('Введіть кількість елементів масиву:');
        if (sizeInput === null) {
            alert('Операцію скасовано');
            return;
        }

        const size = Number(sizeInput);
        if (isNaN(size) || size <= 0) {
            alert('Будь ласка, введіть додатнє число');
            return;
        }

        const arr = [];
        for (let i = 0; i < size; i++) {
            const elementInput = prompt(`Введіть елемент ${i + 1}:`);
            if (elementInput === null) {
                alert('Операцію скасовано');
                return;
            }
            const element = Number(elementInput);
            if (isNaN(element)) {
                alert('Будь ласка, введіть числове значення');
                return;
            }
            arr.push(element);
        }

        console.log('Вхідний масив:', arr);

        const { evenMax, evenMin, oddMax, oddMin } = findMinMaxForIndices(arr);
        console.log('Максимум серед парних індексів:', evenMax);
        console.log('Мінімум серед парних індексів:', evenMin);
        console.log('Максимум серед непарних індексів:', oddMax);
        console.log('Мінімум серед непарних індексів:', oddMin);

        const sortedArr = selectionSortDesc(arr);
        console.log('Вихідний масив (відсортований):', sortedArr);

        alert(`Вхідний масив: [${arr.join(', ')}]\nВихідний масив: [${sortedArr.join(', ')}]\n\nПеревірте консоль для деталей!`);
    });

    // Завдання 8
    buttons[7].addEventListener('click', function () {
        // Створити двовимірний масив додатніх та від'ємних чисел
        const rows = 3;
        const cols = 4;
        const twoDArray = [];

        for (let i = 0; i < rows; i++) {
            twoDArray[i] = [];
            for (let j = 0; j < cols; j++) {
                // Генерувати випадкові числа від -50 до 50
                twoDArray[i][j] = Math.floor(Math.random() * 101) - 50;
            }
        }

        console.log('Двовимірний масив:', twoDArray);

        // Створити масиви додатніх та від'ємних чисел
        const positiveArray = [];
        const negativeArray = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (twoDArray[i][j] > 0) {
                    positiveArray.push(twoDArray[i][j]);
                } else if (twoDArray[i][j] < 0) {
                    negativeArray.push(twoDArray[i][j]);
                }
            }
        }

        console.log('Масив додатніх чисел:', positiveArray);
        console.log('Масив від\'ємних чисел:', negativeArray);

        alert('Двовимірний масив створено!\n\nПеревірте консоль для деталей!');

        // Замінити третій елемент додатнього масиву на від'ємне значення з prompt
        if (positiveArray.length >= 3) {
            const replacementInput = prompt('Введіть від\'ємне число для заміни третього елемента додатнього масиву:');
            if (replacementInput !== null) {
                const replacement = Number(replacementInput);
                if (!isNaN(replacement) && replacement < 0) {
                    positiveArray[2] = replacement;
                    console.log('Масив додатніх чисел після заміни:', positiveArray);
                    alert(`Третій елемент замінено на ${replacement}\n\nПеревірте консоль для деталей!`);
                } else {
                    alert('Будь ласка, введіть від\'ємне число');
                }
            }
        } else {
            alert('Недостатньо додатніх чисел у масиві для заміни');
        }
    });

    // Завдання 9
    buttons[8].addEventListener('click', function () {
        // Створити вікно слайд-шоу
        const modal = document.createElement('div');
        modal.className = 'slideshow-modal';
        modal.innerHTML = `
            <div class="slideshow-container">
                <div class="slideshow-header">
                    <h3>Слайд-шоу</h3>
                    <button class="close-slideshow">&times;</button>
                </div>
                <div class="slideshow-controls">
                    <div class="control-group">
                        <label>Час (сек):</label>
                        <input type="number" id="slideshow-speed" value="3" min="1" max="10">
                    </div>
                    <div class="control-group">
                        <label>Розмір (%):</label>
                        <input type="number" id="slideshow-size" value="100" min="50" max="200">
                    </div>
                    <div class="control-group">
                        <label>
                            <input type="checkbox" id="slideshow-loop" checked> Циклічність
                        </label>
                    </div>
                </div>
                <div class="slideshow-content">
                    <img id="slideshow-image" src="assets/slideshow/kobzar1.png" alt="Slideshow image">
                </div>
                <div class="slideshow-nav">
                    <button class="prev-btn">‹</button>
                    <button class="play-pause-btn">Пауза</button>
                    <button class="next-btn">›</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const images = [
            'assets/slideshow/books.png',
            'assets/slideshow/eneida.png',
            'assets/slideshow/kaidash.png',
            'assets/slideshow/kobzar1.png',
            'assets/slideshow/kobzar2.png'
        ];

        let currentIndex = 0;
        let isPlaying = true;
        let slideshowInterval;
        let slideDuration = 3;

        const imgElement = document.getElementById('slideshow-image');
        const speedInput = document.getElementById('slideshow-speed');
        const sizeInput = document.getElementById('slideshow-size');
        const loopCheckbox = document.getElementById('slideshow-loop');
        const playPauseBtn = modal.querySelector('.play-pause-btn');
        const prevBtn = modal.querySelector('.prev-btn');
        const nextBtn = modal.querySelector('.next-btn');
        const closeBtn = modal.querySelector('.close-slideshow');

        // Зберігаємо натуральний розмір зображення
        let naturalWidth = 0;
        let naturalHeight = 0;

        function updateImage() {
            imgElement.src = images[currentIndex];
            // Чекаємо, поки зображення завантажиться перед оновленням розміру
            imgElement.onload = function () {
                naturalWidth = imgElement.naturalWidth;
                naturalHeight = imgElement.naturalHeight;
                updateSize();
            };
        }

        function startSlideshow() {
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
            }

            slideshowInterval = setInterval(() => {
                if (isPlaying) {
                    currentIndex++;
                    if (currentIndex >= images.length) {
                        if (loopCheckbox.checked) {
                            currentIndex = 0;
                        } else {
                            currentIndex = images.length - 1;
                            isPlaying = false;
                            playPauseBtn.textContent = 'Відтворити';
                        }
                    }
                    updateImage();
                }
            }, slideDuration * 1000);
        }

        function updateSize() {
            const size = parseInt(sizeInput.value);
            // Видаляємо всі обмеження та transform
            imgElement.style.maxWidth = 'none';
            imgElement.style.maxHeight = 'none';
            imgElement.style.transform = 'none';

            if (naturalWidth > 0 && naturalHeight > 0) {
                // Використовуємо натуральні розміри для обчислення
                const scale = size / 100;
                imgElement.style.width = (naturalWidth * scale) + 'px';
                imgElement.style.height = (naturalHeight * scale) + 'px';
            } else {
                // Якщо натуральні розміри ще не відомі, використовуємо transform як тимчасовий засіб
                const scale = size / 100;
                imgElement.style.transform = `scale(${scale})`;
                imgElement.style.transformOrigin = 'center center';
            }
        }

        function updateSpeed() {
            slideDuration = parseInt(speedInput.value);
            if (isPlaying) {
                startSlideshow();
            }
        }

        // Обробники подій
        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playPauseBtn.textContent = isPlaying ? 'Пауза' : 'Відтворити';
        });

        prevBtn.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = loopCheckbox.checked ? images.length - 1 : 0;
            }
            updateImage();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = loopCheckbox.checked ? 0 : images.length - 1;
            }
            updateImage();
        });

        closeBtn.addEventListener('click', () => {
            clearInterval(slideshowInterval);
            modal.remove();
        });

        speedInput.addEventListener('change', updateSpeed);
        sizeInput.addEventListener('change', updateSize);
        sizeInput.addEventListener('input', updateSize); // Оновлення в реальному часі

        // Ініціалізація
        // Перевіряємо, чи зображення вже завантажено
        if (imgElement.complete && imgElement.naturalWidth > 0) {
            naturalWidth = imgElement.naturalWidth;
            naturalHeight = imgElement.naturalHeight;
            updateSize();
        } else {
            updateImage();
        }
        startSlideshow();
    });
});

