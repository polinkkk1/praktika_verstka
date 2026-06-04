document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. АВТОНОМНОЕ КАСТОМНОЕ БУРГЕР-МЕНЮ
       ========================================== */
    const burgerBtn = document.getElementById('customBurgerBtn');
    const menuBlock = document.getElementById('mainMenu');
    const navLinks = document.querySelectorAll('.custom-nav-link');

    // Переключение шторки по клику на бургер
    if (burgerBtn && menuBlock) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Исключаем ложное закрытие
            menuBlock.classList.toggle('active');
        });
    }

    // Автозакрытие шторки при клике на любой пункт меню (для скролла)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuBlock) {
                menuBlock.classList.remove('active');
            }
        });
    });

    // Комфорт: закрывать меню, если кликнули в любую пустую область экрана
    document.addEventListener('click', (e) => {
        if (menuBlock && menuBlock.classList.contains('active')) {
            if (!menuBlock.contains(e.target) && !burgerBtn.contains(e.target)) {
                menuBlock.classList.remove('active');
            }
        }
    });

    /* ==========================================
       2. ДИНАМИЧЕСКИЙ ПРАЙС-ЛИСТ
       ========================================== */
    const priceData = {
        manicure: [
            { name: "Снятие покрытия", price: "200 ₽" },
            { name: "Маникюр (аппаратный, комбинированный)", price: "1000 ₽" },
            { name: "Покрытие гелем Luxio, ONIQ", price: "900 ₽" },
            { name: "Снятие + маникюр + Покрытие гелем LUXIO, ONIQ", price: "2100 ₽" },
            { name: "Дизайн ногтей ▼", price: "20-300 ₽" },
            { name: "Укрепление акриловой пудрой", price: "300 ₽" },
            { name: "Укрепление гелем", price: "500 ₽" },
            { name: "Ремонт натурального ногтя", price: "100 ₽" }
        ],
        extension: [
            { name: "Наращивание ногтей (акригель) — базовое", price: "2400 ₽" },
            { name: "Наращивание гелем под лак", price: "2100 ₽" },
            { name: "Коррекция наращенных ногтей", price: "1800 ₽" }
        ],
        pedicure: [
            { name: "SMART-педикюр полный (стопа и пальцы)", price: "2300 ₽" },
            { name: "Обработка пальчиков с покрытием", price: "1700 ₽" }
        ],
        brows: [
            { name: "Архитектура и коррекция бровей", price: "700 ₽" },
            { name: "Окрашивание хной / краской", price: "600 ₽" }
        ]
    };

    const priceList = document.getElementById('priceList');
    const tabTriggers = document.querySelectorAll('#servicesTabs .tab-trigger');

    function loadPrices(cat) {
        if(!priceList || !priceData[cat]) return;
        priceList.innerHTML = '';
        priceData[cat].forEach(item => {
            const row = document.createElement('div');
            row.className = 'd-flex justify-content-between align-items-center py-2 border-bottom small';
            row.innerHTML = `<span>${item.name}</span><span class="fw-bold">${item.price}</span>`;
            priceList.appendChild(row);
        });
    }

    tabTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabTriggers.forEach(t => t.classList.remove('active-tab', 'text-dark'));
            tabTriggers.forEach(t => t.classList.add('text-secondary'));
            e.target.classList.add('active-tab');
            e.target.classList.remove('text-secondary');
            loadPrices(e.target.dataset.cat);
        });
    });
    loadPrices('manicure');

    /* ==========================================
       3. СЛАЙДЕР ПОРТФОЛИО
       ========================================== */
    const track = document.getElementById('portTrack');
    const nextBtn = document.getElementById('portNext');
    const prevBtn = document.getElementById('portPrev');
    const dots = document.querySelectorAll('#portDots .dot-indicator');
    let portIndex = 0;

    function updatePortfolioSlider() {
        if(!track) return;
        const amountToMove = portIndex * -190; 
        track.style.transform = `translateX(${amountToMove}px)`;
        track.style.transition = 'transform 0.4s ease-in-out';
        dots.forEach((d, i) => d.classList.toggle('active', i === portIndex));
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { portIndex = (portIndex + 1) % 4; updatePortfolioSlider(); });
        prevBtn.addEventListener('click', () => { portIndex = (portIndex - 1 + 4) % 4; updatePortfolioSlider(); });
    }

    /* ==========================================
       4. СЛАЙДЕР ОТЗЫВОВ
       ========================================== */
    const textReviews = [
        { name: "Ольга Григорьева", date: "6 мая", body: "Моя любимая студия! Удобное месторасположение, в 5 минутах от метро Чернышевская. Приятная атмосфера, все девочки очень профессиональные мастера своего дела! Очень приветливый администратор, хорошие фильмы и вкусный кофе!" },
        { name: "Алина Воронова", date: "14 мая", body: "Прекрасный френч! Инструменты в крафт-пакетах открывают при тебе, идеальная чистота и безупречный вкус во всем интерьере студии. Рекомендую!" }
    ];
    let revIdx = 0;
    const reviewBox = document.getElementById('reviewBox');

    function drawReview() {
        if(!reviewBox) return;
        const r = textReviews[revIdx];
        reviewBox.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h4 class="h6 fw-bold mb-0">${r.name}</h4>
                <a href="#" class="text-muted small text-decoration-underline" onclick="return false;">Оставить отзыв</a>
            </div>
            <div class="text-warning small mb-2">★★★★★ <span class="text-muted ms-2">${r.date}</span></div>
            <p class="text-secondary small lh-lg">${r.body}</p>
        `;
    }
    document.getElementById('revNext')?.addEventListener('click', () => { revIdx = (revIdx+1)%textReviews.length; drawReview(); });
    document.getElementById('revPrev')?.addEventListener('click', () => { revIdx = (revIdx-1+textReviews.length)%textReviews.length; drawReview(); });
    drawReview();

    /* ==========================================
       5. СТУДИИ И ЯНДЕКС КАРТЫ
       ========================================== */
    const studioData = {
        center: {
            title: "XNAILS Центр",
            addr: "Гродненский переулок, д. 7<br>м. Чернышевская, г. Санкт-Петербург",
            phone: "+7 (911) 924-63-45",
            time: "Пн. — Вс.: 10:00 — 22:00",
            coords: [59.944319, 30.359836]
        },
        petro: {
            title: "XNAILS Петроградка",
            addr: "Большой проспект П.С., д. 34<br>м. Петроградская, г. Санкт-Петербург",
            phone: "+7 (911) 924-88-99",
            time: "Пн. — Вс.: 10:00 — 22:00",
            coords: [59.960111, 30.301552]
        }
    };

    let yMap;
    const detailsBox = document.getElementById('studioDetails');
    const studioButtons = document.querySelectorAll('.studio-tab-trigger');

    function setStudioInfo(key) {
        if(!detailsBox) return;
        const s = studioData[key];
        detailsBox.innerHTML = `
            <p class="small text-secondary mb-4">Наша студия находится в Центральном районе г. Санкт-Петербург, в 5 минутах ходьбы от станции метро</p>
            <a href="tel:${s.phone.replace(/[^0-9+]/g,'')}" class="text-dark fw-bold text-decoration-none d-block fs-5 mb-4">${s.phone}</a>
            <div class="mt-2 text-dark small">
                <strong class="d-block mb-1">${s.title}</strong>
                <p class="text-secondary mb-2">${s.addr}</p>
                <p class="text-secondary mb-0">${s.time}</p>
            </div>
        `;
        if (yMap) yMap.setCenter(s.coords, 15);
    }

    studioButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            studioButtons.forEach(b => b.classList.remove('active-tab', 'text-dark'));
            studioButtons.forEach(b => b.classList.add('text-secondary'));
            e.target.classList.add('active-tab');
            e.target.classList.remove('text-secondary');
            setStudioInfo(e.target.dataset.studio);
        });
    });

    if (document.getElementById('ymapContainer')) {
        ymaps.ready(() => {
            yMap = new ymaps.Map("ymapContainer", {
                center: [59.944319, 30.359836],
                zoom: 15,
                controls: ['zoomControl']
            });
            Object.keys(studioData).forEach(k => {
                const s = studioData[k];
                const placemark = new ymaps.Placemark(s.coords, { balloonContent: `<strong>${s.title}</strong><br>${s.addr}` }, { preset: 'islands#blackDotIcon' });
                yMap.geoObjects.add(placemark);
            });
            yMap.behaviors.disable('scrollZoom');
            setStudioInfo('center');
        });
    }
});