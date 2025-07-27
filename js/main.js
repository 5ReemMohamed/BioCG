if (performance.navigation.type === 1) {
    localStorage.removeItem('language');
}

let currentLanguage = localStorage.getItem('language') || 'en';
const translations = {
    en: { direction: 'ltr' },
    ar: { direction: 'rtl' }
};

function applyStoredLanguage() {
    const html = document.documentElement;
    html.setAttribute('dir', translations[currentLanguage].direction);
    html.setAttribute('lang', currentLanguage);

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
    }

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const text = el.getAttribute(`data-${currentLanguage}`);
        if (text !== null) el.textContent = text;
    });

    document.title = currentLanguage === 'en'
        ? 'BioCG - Bioconstruction Group Limited'
        : 'BioCG - مجموعة البناء الحيوي المحدودة';

    const directional = document.querySelectorAll('.text-start, .text-end');
    directional.forEach(container => {
        container.classList.remove('text-start', 'text-end');
        container.classList.add(currentLanguage === 'ar' ? 'text-end' : 'text-start');
    });
}


function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyStoredLanguage();
    initializeSwiper(); 
    addLanguageSwitchTransition();
}


function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash) {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });
}

function initializeNavbarScrollEffect() {
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'none';
        }
        updateActiveSection();
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let activeSection = '';
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop - 100) {
            activeSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

function initializeLoadingAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.card, .hero-text, .contact-item');
    elements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

function initializeCardHover() {
    const cards = document.querySelectorAll('.project-image-container');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
    });
}

function initializeLazyImages() {
    const images = document.querySelectorAll('img[src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });
    images.forEach(img => observer.observe(img));
}


function addLanguageSwitchTransition() {
    const style = document.createElement('style');
    style.textContent = `* { transition: all 0.3s ease; }`;
    document.head.appendChild(style);
    setTimeout(() => document.head.removeChild(style), 300);
}


let swiperInstance;
function initializeSwiper() {
    if (swiperInstance) swiperInstance.destroy(true, true); 

    swiperInstance = new Swiper(".mySwiper", {
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 20,
        rtl: currentLanguage === 'ar', 
        breakpoints: {
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}



document.addEventListener('DOMContentLoaded', function () {
    console.log('BioCG Website Initialized');
    applyStoredLanguage();
    initializeSwiper(); 
    initializeLoadingAnimations();
    initializeNavbarScrollEffect();
    initializeCardHover();
    initializeSmoothScrolling();
    initializeLazyImages();
    addLanguageSwitchTransition();

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});
