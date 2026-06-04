document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. МОБИЛЬНОЕ МЕНЮ БУРГЕР (БЕЗ BOOTSTRAP CONFLICTS)
    // ==========================================================================
    const burgerToggle = document.getElementById('burgerToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (burgerToggle && mobileNav) {
        burgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerToggle.classList.toggle('active');
            mobileNav.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        // Закрытие при клике по ссылкам
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burgerToggle.classList.remove('active');
                mobileNav.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });

        // Закрытие при тапе вне зоны шторки
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('open')) {
                if (!mobileNav.contains(e.target) && !burgerToggle.contains(e.target)) {
                    burgerToggle.classList.remove('active');
                    mobileNav.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    }

    // ==========================================================================
    // 2. СЛАЙДЕР АКЦИЙ (PROMO)
    // ==========================================================================
    const promoImage = document.getElementById('promoImage');
    const promoTitle = document.getElementById('promoTitle');
    const promoText = document.getElementById('promoText');
    const promoDots = document.querySelectorAll('#promoDots .dot');

    const promoSlides = [
        {
            img: "images/free.png",
            title: "Вместе дешевле!",
            text: "Расскажите о нас своим подругам, знакомым, коллегам или родственникам. Друг получает скидку 10% на первый визит, а Вы - 10% кэшбэк с его первого визита."
        },
        {
            img: "images/main.png",
            title: "Скидка на первый визит",
            text: "Знакомство со студией XNAILS! Дарим скидку 15% абсолютно на все виды маникюра и педикюра при первом посещении нашей сети."
        }
    ];

    promoDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            promoDots.forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');
            
            const slideIdx = parseInt(e.target.dataset.slide);
            const data = promoSlides[slideIdx];
            
            if(promoImage && promoTitle && promoText) {
                promoImage.style.backgroundImage = `url('${data.img}')`;
                promoTitle.textContent = data.title;
                promoText.textContent = data.text;
            }
        });
    });

    // ==========================================================================
    // 3. ТАБЫ УСЛУГ И ЦЕНЫ
    // ==========================================================================
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
    const serviceTabs = document.querySelectorAll('#servicesTabs .services__tab-btn');

    function renderPrices(category) {
        if (!priceList || !priceData[category]) return;
        priceList.innerHTML = '';
        
        priceData[category].forEach(item => {
            const row = document.createElement('div');
            row.className = 'services__row';
            row.innerHTML = `
                <span class="services__name">${item.name}</span>
                <span class="services__price">${item.price}</span>
            `;
            priceList.appendChild(row);
        });
    }

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            serviceTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderPrices(e.target.dataset.cat);
        });
    });
    renderPrices('manicure'); // Первичный запуск

    // ==========================================================================
    // 4. СЛАЙДЕР ПОРТФОЛИО
    // ==========================================================================
    const track = document.getElementById('portTrack');
    const portNext = document.getElementById('portNext');
    const portPrev = document.getElementById('portPrev');
    const portDots = document.querySelectorAll('#portDots .dot');
    let currentPortIdx = 0;

    function getSlidesCount() {
        if (window.innerWidth <= 480) return 4;
        if (window.innerWidth <= 991) return 2;
        return 1; // Для больших экранов листаем по одной ячейке
    }

    function updatePortfolio() {
        if (!track) return;
        const slideWidth = document.querySelector('.portfolio__slide').getBoundingClientRect().width;
        const gap = 20; 
        const moveAmount = currentPortIdx * (slideWidth + gap);
        
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        portDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentPortIdx);
        });
    }

    if (portNext && portPrev) {
        portNext.addEventListener('click', () => {
            const maxIdx = 4 - getSlidesCount();
            currentPortIdx = currentPortIdx >= maxIdx ? 0 : currentPortIdx + 1;
            updatePortfolio();
        });

        portPrev.addEventListener('click', () => {
            const maxIdx = 4 - getSlidesCount();
            currentPortIdx = currentPortIdx <= 0 ? maxIdx : currentPortIdx - 1;
            updatePortfolio();
        });
    }

    window.addEventListener('resize', () => {
        currentPortIdx = 0;
        updatePortfolio();
    });

    // ==========================================================================
    // 5. СЛАЙДЕР ОТЗЫВОВ
    // ==========================================================================
    const reviewsData = [
        {
            name: "Ольга Григорьева",
            date: "6 мая",
            body: "Моя любимая студия! Удобное месторасположение, в 5 минутах от метро Чернышевская. Приятная атмосфера, все девочки очень профессиональные мастера своего дела! Очень приветливый администратор, хорошие фильмы и вкусный кофе!"
        },
        {
            name: "Алина Воронова",
            date: "14 мая",
            body: "Прекрасный френч! Инструменты в крафт-пакетах открывают при тебе, идеальная чистота и безупречный вкус во всем интерьере студии. Теперь на процедуры только сюда, рекомендую!"
        }
    ];

    let currentRevIdx = 0;
    const reviewBox = document.getElementById('reviewBox');

    function renderReview() {
        if (!reviewBox) return;
        const r = reviewsData[currentRevIdx];
        reviewBox.innerHTML = `
            <div class="reviews__name-row">
                <h4 class="reviews__name">${r.name}</h4>
                <a href="#" class="reviews__write-link" onclick="return false;">Оставить отзыв</a>
            </div>
            <div class="reviews__stars">★★★★★ <span>${r.date}</span></div>
            <p class="reviews__body">${r.body}</p>
        `;
    }

    document.getElementById('revNext')?.addEventListener('click', () => {
        currentRevIdx = (currentRevIdx + 1) % reviewsData.length;
        renderReview();
    });

    document.getElementById('revPrev')?.addEventListener('click', () => {
        currentRevIdx = (currentRevIdx - 1 + reviewsData.length) % reviewsData.length;
        renderReview();
    });
    renderReview();

    // ==========================================================================
    // 6. СТУДИИ И ЯНДЕКС КАРТЫ
    // ==========================================================================
    const studioData = {
        center: {
            title: "XNAILS Центр",
            desc: "Наша студия находится в Центральном районе г. Санкт-Петербург, в 5 минутах ходьбы от станции метро.",
            phone: "+7 (911) 924-63-45",
            address: "Гродненский переулок, д. 7<br>м. Чернышевская, г. Санкт-Петербург",
            hours: "Пн. — Вс.: 10:00 — 22:00",
            coords: [59.944319, 30.359836]
        },
        petro: {
            title: "XNAILS Петроградка",
            desc: "Наша студия на Петроградской стороне ждет вас ежедневно. Удобный подъезд и парковка для клиентов.",
            phone: "+7 (911) 924-88-99",
            address: "Большой проспект П.С., д. 34<br>м. Петроградская, г. Санкт-Петербург",
            hours: "Пн. — Вс.: 10:00 — 22:00",
            coords: [59.960111, 30.301552]
        }
    };

    let yMap;
    const studioTabs = document.querySelectorAll('#studioTabs .studios__tab-btn');
    const studioInfoBlock = document.getElementById('studioInfoBlock');

    function switchStudio(key) {
        const data = studioData[key];
        if (!data) return;

        if (studioInfoBlock) studioInfoBlock.style.opacity = '0.3';

        setTimeout(() => {
            document.getElementById('studioDesc').textContent = data.desc;
            document.getElementById('studioTitle').textContent = data.title;
            document.getElementById('studioAddress').innerHTML = data.address;
            document.getElementById('studioHours').textContent = data.hours;
            
            const phoneLink = document.getElementById('studioPhone');
            phoneLink.textContent = data.phone;
            phoneLink.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;

            if (studioInfoBlock) studioInfoBlock.style.opacity = '1';
            if (yMap) yMap.setCenter(data.coords, 15);
        }, 200);
    }

    studioTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            studioTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            switchStudio(e.target.dataset.studio);
        });
    });

    if (document.getElementById('ymapContainer')) {
        ymaps.ready(() => {
            yMap = new ymaps.Map("ymapContainer", {
                center: [59.944319, 30.359836],
                zoom: 15,
                controls: ['zoomControl']
            });

            Object.keys(studioData).forEach(key => {
                const s = studioData[key];
                const placemark = new ymaps.Placemark(s.coords, {
                    balloonContent: `<strong>${s.title}</strong><br>${s.address}`
                }, {
                    preset: 'islands#blackDotIcon'
                });
                yMap.geoObjects.add(placemark);
            });

            yMap.behaviors.disable('scrollZoom');
        });
    }

    // ==========================================================================
    // 7. МОДАЛЬНОЕ ОКНО ОНЛАЙН-ЗАПИСИ
    // ==========================================================================
    const modal = document.getElementById('modalOrder');
    const closeBtn = document.getElementById('modalClose');
    const orderTriggers = document.querySelectorAll('#headerOrderBtn, #heroOrderBtn, .services__order-btn, .studios__order-btn');

    orderTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('open');
            document.body.classList.add('no-scroll');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    }
});