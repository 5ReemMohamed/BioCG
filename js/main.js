// Language Management
let currentLanguage = 'en';
const translations = {
    en: { direction: 'ltr' },
    ar: { direction: 'rtl' }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
    initializeWelcomeScreen();
    createFloatingParticles();
    initializeLoadingAnimations();
    initializeNavbarScrollEffect();
});

// Initialize Welcome Screen with Auto Language Switching
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const companyName = welcomeScreen.querySelector('.company-name');
    const companyTagline = welcomeScreen.querySelector('.company-tagline');

    // Create language switching containers
    const nameContainer = document.createElement('div');
    nameContainer.className = 'text-switching';
    const taglineContainer = document.createElement('div');
    taglineContainer.className = 'text-switching';

    // English text
    const nameEn = document.createElement('h1');
    nameEn.className = 'company-name language-text active';
    nameEn.innerHTML = 'Bioconstruction Group Limited';

    const taglineEn = document.createElement('p');
    taglineEn.className = 'company-tagline language-text active';
    taglineEn.innerHTML = 'Smart Infrastructure. A Human-Centered Vision.';

    // Arabic text
    const nameAr = document.createElement('h1');
    nameAr.className = 'company-name language-text';
    nameAr.innerHTML = 'مجموعة البناء الحيوي المحدودة';
    nameAr.style.fontFamily = 'Arial, sans-serif';

    const taglineAr = document.createElement('p');
    taglineAr.className = 'company-tagline language-text';
    taglineAr.innerHTML = 'البنية التحتية الذكية. رؤية محورها الإنسان.';
    taglineAr.style.fontFamily = 'Arial, sans-serif';

    // Replace original elements
    nameContainer.appendChild(nameEn);
    nameContainer.appendChild(nameAr);
    taglineContainer.appendChild(taglineEn);
    taglineContainer.appendChild(taglineAr);
    companyName.parentNode.replaceChild(nameContainer, companyName);
    companyTagline.parentNode.replaceChild(taglineContainer, companyTagline);

    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'welcome-progress';
    progressBar.innerHTML = '<div class="welcome-progress-bar"></div>';
    welcomeScreen.querySelector('.welcome-content').appendChild(progressBar);

    // Animate in English text
    setTimeout(() => {
        nameEn.style.opacity = '1';
        nameEn.style.transform = 'translateY(0)';
        taglineEn.style.opacity = '1';
        taglineEn.style.transform = 'translateY(0)';
    }, 5000);

    // After 5 seconds, switch to Arabic
    setTimeout(() => {
        switchLanguageInWelcome(nameEn, nameAr, taglineEn, taglineAr);
    }, 5000);

    // After 10 seconds, fade out and scroll to section
    setTimeout(() => {
        goToHome();
    }, 10000);
}

// Switch Language in Welcome Screen
function switchLanguageInWelcome(nameEn, nameAr, taglineEn, taglineAr) {
    nameEn.classList.add('fade-out');
    taglineEn.classList.add('fade-out');

    setTimeout(() => {
        nameEn.parentNode.removeChild(nameEn);
        taglineEn.parentNode.removeChild(taglineEn);
        nameAr.classList.add('active');
        taglineAr.classList.add('active');

        // Optional: set RTL direction
        document.documentElement.setAttribute('dir', 'rtl');
    }, 0);
}

// Fade welcome screen and scroll to section
function goToHome() {
    const welcomeScreen = document.getElementById('welcomeScreen');
     const mainContent = document.getElementById('mainContent');
    const mainNav = document.getElementById('mainNav');
    welcomeScreen.classList.add('fade-out');

    // Scroll to the target section after fade-out
    setTimeout(() => {
        const target = document.getElementById('mainContent'); // Change if needed
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
              welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainNav.style.display = 'block';
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            currentLanguage = 'en';

            // Optionally reset text toggle button
            const langToggle = document.getElementById('langToggle');
            if (langToggle) {
                langToggle.textContent = 'العربية';
            }
        }
    }, 1000);
}

// Create Floating Particles
function createFloatingParticles() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'welcome-particles';

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    welcomeScreen.appendChild(particlesContainer);
}

// Placeholder functions
function initializeLoadingAnimations() {}
function initializeNavbarScrollEffect() {}

// Language Toggle Function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;
    
    // Update language toggle button
    langToggle.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
    
    // Update HTML direction and language
    html.setAttribute('dir', translations[currentLanguage].direction);
    html.setAttribute('lang', currentLanguage);
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-en][data-ar]');
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update page title
    document.title = currentLanguage === 'en' 
        ? 'BioCG - Bioconstruction Group Limited'
        : 'BioCG - مجموعة البناء الحيوي المحدودة';
    
    // Add animation effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
    const directionalContainers = document.querySelectorAll('.text-start, .text-end');
directionalContainers.forEach(container => {
    container.classList.remove('text-start', 'text-end');
    container.classList.add(currentLanguage === 'ar' ? 'text-end' : 'text-start');
});
}

// Initialize Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Initialize Loading Animations
function initializeLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .hero-text, .contact-item');
    elementsToAnimate.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

// Trigger Loading Animations
function triggerLoadingAnimations() {
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 100);
        });
    }, 500);
}

// Initialize Navbar Scroll Effect
function initializeNavbarScrollEffect() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'none';
        }
        
        // Update active section in navigation
        updateActiveSection();
        
        lastScrollTop = scrollTop;
    });
}

// Update Active Section
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-image-container');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Contact Form Handler (placeholder)
function handleContactForm() {
    // This would typically handle form submission
    alert(currentLanguage === 'en' 
        ? 'Thank you for your interest! We will contact you soon.' 
        : 'شكراً لاهتمامك! سنتواصل معك قريباً.');
}

// Add click handler for contact button
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('#contact .btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', handleContactForm);
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or return to welcome screen
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen.style.display === 'none') {
            // Could implement modal closing logic here
        }
    }
});

// Performance Optimization: Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add smooth transitions for language switching
function addLanguageSwitchTransition() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.head.removeChild(style);
    }, 300);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('BioCG Website Initialized');
    
    // Add any additional initialization code here
    addLanguageSwitchTransition();
});

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // ⛔ Stop autoplay on hover
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });
 