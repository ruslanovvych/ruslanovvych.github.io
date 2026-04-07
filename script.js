// Анімований фон
function initBackgroundAnimation() {
    const canvas = document.getElementById("background-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let bullets = [];
    
    // Встановлюємо розміри canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Створюємо пулю
    function spawnBullet() {
        // Масив кольорів для частинок
        const colors = [
            { r: 255, g: 200, b: 0 },   // Жовтий
            { r: 255, g: 100, b: 0 },   // Оранжевий
            { r: 255, g: 50, b: 50 }    // Червоний
        ];
        
        // Випадковий колір
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        bullets.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            size: Math.random() * 3 + 2, // Розмір від 2 до 5 пікселів
            speed: Math.random() * 2 + 1, // Швидкість від 1 до 3
            trail: 6,
            color: randomColor
        });
    }
    
    // Малюємо анімацію
    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        bullets.forEach((b, i) => {
            b.y -= b.speed;
            
            for (let t = 0; t < b.trail; t++) {
                const yOffset = b.y + t * b.size;
                const alpha = 1 - t / b.trail; // дальші — прозоріше
                ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${alpha.toFixed(2)})`;
                ctx.fillRect(b.x, yOffset, b.size, b.size);
            }
            
            if (b.y < -b.trail * b.size) bullets.splice(i, 1);
        });
        
        requestAnimationFrame(draw);
    }
    
    // Ініціалізація
    resizeCanvas();
    setInterval(spawnBullet, 800); // Частинки кожні 800мс
    draw();
    
    // Обробник зміни розміру вікна
    window.addEventListener('resize', resizeCanvas);
}

// Telegram Web App налаштування
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Спочатку викликаємо ready() - це обов'язково!
        tg.ready();
        
        // Потім розгортаємо на весь екран
        tg.expand();
        
        // Налаштування кольорів з затримкою (як в index 2)
        setTimeout(() => {
            tg.setHeaderColor('#000000'); // Чорний колір шапки
            tg.setBackgroundColor('#000000'); // Чорний фон
            tg.setSecondaryBackgroundColor('#000000'); // Вторинний фон
            
            // Налаштування теми для кращої інтеграції
            tg.setThemeParams({
                bg_color: '#000000',
                secondary_bg_color: '#000000',
                text_color: '#FFD700',
                hint_color: '#CCCCCC',
                link_color: '#FFD700',
                button_color: '#FF4444',
                button_text_color: '#FFFFFF'
            });
            
            console.log('Кольори шапки встановлено з затримкою в основній функції');
        }, 50);
        
        // Налаштування для займання всього екрану без повноекранного режиму
        const fullHeight = window.innerHeight;
        const fullWidth = window.innerWidth;
        
        // Встановлюємо розміри viewport на весь екран
        tg.setViewportHeight(fullHeight);
        tg.setViewportWidth(fullWidth);
        
        console.log('Встановлено розміри на весь екран:', fullWidth, 'x', fullHeight);
        
        // Налаштування viewport для займання всього екрану
        const setViewportSize = () => {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            
            // Встановлюємо розміри viewport для Telegram WebApp (весь екран)
            tg.setViewportHeight(viewportHeight);
            tg.setViewportWidth(viewportWidth);
            
            // Налаштовуємо body для займання всього екрану
            document.body.style.height = `${viewportHeight}px`;
            document.body.style.width = `${viewportWidth}px`;
            document.body.style.overflow = 'auto';
            document.body.style.minHeight = `${viewportHeight}px`;
            document.body.style.maxHeight = `${viewportHeight}px`;
            
            // Налаштовуємо контейнер
            const container = document.querySelector('.container');
            if (container) {
                container.style.minHeight = `${viewportHeight}px`;
                container.style.height = '100%';
                container.style.maxHeight = `${viewportHeight}px`;
            }
            
            // Оновлюємо розміри canvas фону
            const canvas = document.getElementById("background-canvas");
            if (canvas) {
                canvas.width = viewportWidth;
                canvas.height = viewportHeight;
            }
            
            console.log('Viewport розміри оновлено (весь екран):', viewportWidth, 'x', viewportHeight);
        };
        
        // Встановлюємо розміри одразу
        setViewportSize();
        
        // Додаткове оновлення після готовності
        setTimeout(() => {
            setViewportSize();
            console.log('Додаткове оновлення розмірів після готовності');
        }, 100);
        
        // Додаткове оновлення через 500мс для надійності
        setTimeout(() => {
            setViewportSize();
            console.log('Фінальне оновлення розмірів');
        }, 500);
        
        // Додаткова перевірка кольорів шапки через 1 секунду
        setTimeout(() => {
            if (tg.setHeaderColor) {
                tg.setHeaderColor('#000000');
                console.log('Додаткова перевірка кольору шапки');
            }
        }, 1000);
        
        // Обробник зміни розміру вікна
        window.addEventListener('resize', setViewportSize);
        
        // Додаткові налаштування для кращої інтеграції
        if (tg.MainButton) {
            tg.MainButton.hide();
        }
        
        if (tg.BackButton) {
            tg.BackButton.hide();
        }
        
        // Додаткові налаштування для кращої інтеграції
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                setViewportSize();
                console.log('Оновлення розмірів після зміни орієнтації');
            }, 300);
        });
        
        // Налаштування для мобільних пристроїв
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Додаткові налаштування для мобільних
            document.documentElement.style.height = '100%';
            document.documentElement.style.overflow = 'hidden';
            
            // Запобігаємо збільшенню при фокусі на input
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.fontSize = '16px';
            });
        }
        
        console.log('Telegram WebApp ініціалізовано успішно');
    } else {
        console.log('Telegram WebApp не доступний');
    }
}

// Основні функції для інтерактивності
document.addEventListener('DOMContentLoaded', function() {
    document.body.setAttribute('data-theme', 'cocoa');
    // Ініціалізація анімованого фону
    initBackgroundAnimation();
    
    // Ініціалізація Telegram Web App
    initTelegramWebApp();
    
    // Ініціалізація всіх функцій
    initInteractiveElements();
    initCommandCopy();
    initTypingEffect();
    initHamburgerMenu();
});



// Інтерактивні елементи
function initInteractiveElements() {
    // Ефект кліку для кнопок
    const buttons = document.querySelectorAll('.contact-link, .step-number');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Створюємо ефект хвилі
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}







// Ефект друкування тексту
function initTypingEffect() {
    const titles = document.querySelectorAll('.main-title, .section-title:not(.no-typing)');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--accent-gold)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                title.style.borderRight = 'none';
            }
        };
        
        // Запускаємо ефект тільки коли елемент видимий
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
}

// Функція для копіювання команд
function initCommandCopy() {
    const commandCards = document.querySelectorAll('.command-card code');
    
    commandCards.forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'Клікніть для копіювання';
        
        code.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Анімація копіювання
            this.style.transform = 'scale(1.1)';
            this.style.background = 'var(--accent-gold)';
            this.style.color = 'var(--border-dark)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'var(--primary-dark)';
                this.style.color = 'var(--accent-gold)';
            }, 200);
            
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Показуємо повідомлення про успішне копіювання
                showNotification('Команду скопійовано!', 'success');
            }).catch(() => {
                showNotification('Помилка копіювання', 'error');
            });
        });
    });
}

function initHamburgerMenu() {
    const button = document.getElementById('hamburgerButton');
    const menu = document.getElementById('mainMenu');
    const overlay = document.getElementById('menuOverlay');
    if (!button || !menu || !overlay) return;

    const closeMenu = () => {
        button.classList.remove('active');
        menu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('menu-open');
        button.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    };

    const openMenu = () => {
        button.classList.add('active');
        menu.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('menu-open');
        button.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    };

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
        }
    });

    highlightCurrentMenuLink(menu);
}

function highlightCurrentMenuLink(menu) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = menu.querySelectorAll('.side-menu-link');
    links.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const linkPath = href.split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Система повідомлень
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--accent-gold)' : 'var(--accent-red)'};
        color: ${type === 'success' ? 'var(--border-dark)' : 'var(--text-light)'};
        border-radius: 8px;
        font-weight: 700;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Показуємо повідомлення
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Приховуємо через 3 секунди
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Ініціалізація додаткових функцій
document.addEventListener('DOMContentLoaded', function() {
    addGlowEffect();
    initCommandCopy();
    
    // Додаємо CSS для ripple ефекту
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Orbitron', monospace;
        }
    `;
    document.head.appendChild(style);
});

// Функція для зміни теми (можна додати перемикач)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('light-theme');
    
    if (isDark) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Завантаження збереженої теми
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Запускаємо завантаження теми
loadSavedTheme();

// Додаємо обробник для клавіші Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Закриваємо всі модальні вікна або повідомлення
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Функція для анімації статистики
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000; // 2 секунди
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current);
        }, 16);
    });
}

// Функція для плавного скролу до секцій
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Ініціалізація плавного скролу
document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Функція для оновлення розмірів при зміні орієнтації
function handleOrientationChange() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        setTimeout(() => {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            
            tg.setViewportHeight(viewportHeight);
            tg.setViewportWidth(viewportWidth);
            
            // Оновлюємо розміри body
            document.body.style.height = `${viewportHeight}px`;
            document.body.style.width = `${viewportWidth}px`;
            
            // Оновлюємо контейнер
            const container = document.querySelector('.container');
            if (container) {
                container.style.minHeight = `${viewportHeight}px`;
            }
            
            console.log('Розміри оновлено після зміни орієнтації');
        }, 300);
    }
}

// Додаємо обробник зміни орієнтації
window.addEventListener('orientationchange', handleOrientationChange);

// Функція для перевірки та оновлення розмірів кожні 2 секунди (для надійності)
function periodicViewportUpdate() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        const currentHeight = window.innerHeight;
        const currentWidth = window.innerWidth;
        
        // Оновлюємо тільки якщо розміри змінилися
        if (tg.viewportHeight !== currentHeight || tg.viewportWidth !== currentWidth) {
            tg.setViewportHeight(currentHeight);
            tg.setViewportWidth(currentWidth);
            console.log('Періодичне оновлення розмірів viewport');
        }
    }
}

// Запускаємо періодичне оновлення
setInterval(periodicViewportUpdate, 2000);

// Функція для ротації кольорів карт UNO з анімацією переворота
function initCardRotation() {
    const cardImages = document.querySelectorAll('.card-rotate');
    const colors = ['r', 'b', 'g', 'y']; // red, blue, green, yellow
    
    cardImages.forEach((img, index) => {
        const cardType = img.getAttribute('data-card-type');
        let currentColorIndex = 0;
        
        // Додаємо обгортку для 3D ефекту
        const wrapper = document.createElement('div');
        wrapper.className = 'card-flip-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        // Маппінг cardType до реальних назв файлів
        const cardTypeMap = {
            'zero': '0',
            'seven': '7'
        };
        const fileCardType = cardTypeMap[cardType] || cardType;
        
        // Змінюємо колір карт кожні 2 секунди з різною затримкою для кожної карти
        setInterval(() => {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            const color = colors[currentColorIndex];
            
            // Початок переворота
            wrapper.style.transform = 'rotateY(90deg)';
            wrapper.style.opacity = '0.5';
            
            // Після половини переворота змінюємо карту
            setTimeout(() => {
                img.src = `card/${color}_${fileCardType}.png`;
                
                // Завершуємо переворот
                wrapper.style.transform = 'rotateY(0deg)';
                wrapper.style.opacity = '1';
            }, 300); // Половина часу переворота
        }, 2000 + (index * 300)); // Різна затримка для кожної карти
    });
}

// Ініціалізація ротації карт після завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.card-rotate')) {
        initCardRotation();
    }
});

// Функція для секретного кавуна
function initSecretWatermelon() {
    const secretWatermelon = document.getElementById('secretWatermelon');
    const modal = document.getElementById('watermelonModal');
    const modalContent = document.querySelector('.watermelon-modal-content');
    
    if (!secretWatermelon || !modal) return;
    
    // Відкриття модального вікна при кліку на кавун
    secretWatermelon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Закриття при кліку на плашку (фон модального вікна)
    modal.addEventListener('click', function(e) {
        // Закриваємо тільки якщо клік на самому модальному вікні (фон), а не на контенті
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Запобігаємо закриттю при кліку на контент
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Закриття при натисканні Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Ініціалізація секретного кавуна
document.addEventListener('DOMContentLoaded', function() {
    initSecretWatermelon();
});

// Також пробуємо ініціалізувати після повного завантаження сторінки
window.addEventListener('load', function() {
    initSecretWatermelon();
}); 