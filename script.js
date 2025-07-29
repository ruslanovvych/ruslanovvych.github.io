// Основні функції для інтерактивності
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація всіх функцій
    initInteractiveElements();
    initCommandCopy();
    initTypingEffect();
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
    const titles = document.querySelectorAll('.main-title, .section-title');
    
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