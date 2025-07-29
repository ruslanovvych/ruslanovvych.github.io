// Основні функції для інтерактивності
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація всіх функцій
    initAnimations();
    initScrollEffects();
    initInteractiveElements();
    initParticleEffect();
    initTypingEffect();
});

// Анімації при завантаженні
function initAnimations() {
    // Анімація появи елементів
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Спостерігаємо за всіма картками та секціями
    const animatedElements = document.querySelectorAll('.feature-card, .instruction-item, .command-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Ефекти при скролі
function initScrollEffects() {
    let ticking = false;
    
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section, .logo');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('logo') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Інтерактивні елементи
function initInteractiveElements() {
    // Ефект ховера для карток
    const cards = document.querySelectorAll('.feature-card, .command-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('feature-card') 
                ? 'translateY(-10px) scale(1.02)' 
                : 'scale(1.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
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

// Ефект частинок
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    document.body.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(255, 215, 0, ${this.opacity})`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
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
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
}

// Додаткові інтерактивні функції
function addGlowEffect() {
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.5)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)';
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