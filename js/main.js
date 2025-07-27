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
  document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
    const text = el.getAttribute(`data-${currentLanguage}`);
    if (text !== null) el.textContent = text;
  });

  document.querySelectorAll('[data-en-placeholder], [data-ar-placeholder]').forEach(input => {
    const translated = input.getAttribute(`data-${currentLanguage}-placeholder`);
    if (translated !== null) input.setAttribute('placeholder', translated);
  });

  document.title = currentLanguage === 'en'
    ? 'BioCG - Bioconstruction Group Limited'
    : 'BioCG - مجموعة البناء الحيوي المحدودة';

  document.querySelectorAll('.text-start, .text-end').forEach(el => {
    el.classList.remove('text-start', 'text-end');
    el.classList.add(currentLanguage === 'ar' ? 'text-end' : 'text-start');
  });

  revalidateAllForms();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  localStorage.setItem('language', currentLanguage);
  applyStoredLanguage();
  initializeSwiper();
  addLanguageSwitchTransition();
}

function revalidateAllForms() {
  document.querySelectorAll('form').forEach(form => {
    form.querySelectorAll('input, textarea').forEach(input => {
      if (input.classList.contains('is-invalid')) {
        validateInput(input);
      }
    });
  });
}

const validationMessages = {
  required: {
    en: "This field cannot be empty",
    ar: "لا يمكن ترك هذا الحقل فارغًا"
  },
  name: {
    en: "Please enter a valid name (letters only)",
    ar: "يرجى إدخال اسم صالح (أحرف فقط)"
  },
  email: {
    en: "Please enter a valid email address",
    ar: "يرجى إدخال بريد إلكتروني صالح"
  },
  username: {
    en: "Invalid username (at least 3 characters)",
    ar: "اسم المستخدم غير صالح (٣ أحرف على الأقل)"
  },
  password: {
    en: "Password must be at least 6 characters, with letters and numbers",
    ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل وتحتوي على أرقام وحروف"
  },
  confirmPassword: {
    en: "Passwords do not match",
    ar: "كلمتا المرور غير متطابقتين"
  },
  phone: {
    en: "Enter a valid phone number",
    ar: "أدخل رقم هاتف صحيح"
  }
};

const validationPatterns = {
  name: /^[A-Za-z؀-ۿ ]{2,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9_\u0621-\u064A]{3,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  phone: /^[0-9]{10,15}$/
};

function showError(input, messageKey) {
  removeError(input);
  const message = validationMessages[messageKey][currentLanguage];
  const error = document.createElement("div");
  error.className = "text-danger mt-1 small error-message";
  error.textContent = message;
  error.setAttribute('data-error-key', messageKey);
  input.classList.add("is-invalid");
  input.parentElement.appendChild(error);
}

function removeError(input) {
  input.classList.remove("is-invalid");
  const existing = input.parentElement.querySelector(".error-message");
  if (existing) existing.remove();
}

function validateInput(input) {
  const name = input.name;
  const value = input.value.trim();
  
  if (value === "") {
    showError(input, "required");
    return false;
  }
  
  if (name === "name" && !validationPatterns.name.test(value)) {
    showError(input, "name");
    return false;
  }
  
  if (name === "email" && !validationPatterns.email.test(value)) {
    showError(input, "email");
    return false;
  }
  
  if (name === "username" && !validationPatterns.username.test(value)) {
    showError(input, "username");
    return false;
  }
  
  if (name === "password" && !validationPatterns.password.test(value)) {
    showError(input, "password");
    return false;
  }
  
  if (name === "confirmPassword") {
    const passwordInput = input.closest('form').querySelector('[name="password"]');
    if (passwordInput && value !== passwordInput.value.trim()) {
      showError(input, "confirmPassword");
      return false;
    }
  }
  
  if (name === "phone" && !validationPatterns.phone.test(value)) {
    showError(input, "phone");
    return false;
  }
  
  removeError(input);
  return true;
}

function initializeFormValidation(form) {
  const inputs = form.querySelectorAll("input, textarea");
  
  inputs.forEach(input => {
    input.addEventListener("input", () => validateInput(input));
  });
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateInput(input)) isValid = false;
    });
    
    if (isValid) {
      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();
      
      if (name && email) {
        const text = currentLanguage === "en"
          ? `New Consultation:\nName: ${name}\nEmail: ${email}\nMessage: ${message || 'No message'}`
          : `استشارة جديدة:\nالاسم: ${name}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message || 'لا توجد رسالة'}`;
        
        const phone = "966535061603";
        const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, "_blank");
      }
    }
  });
}

function addLanguageSwitchTransition() {
  const style = document.createElement('style');
  style.textContent = `* { transition: all 0.3s ease; }`;
  document.head.appendChild(style);
  setTimeout(() => document.head.removeChild(style), 300);
}

function initializeNavbarScrollEffect() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.boxShadow = scrollTop > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
    navbar.style.backdropFilter = scrollTop > 50 ? 'blur(10px)' : 'none';
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

function initializeSmoothScrolling() {
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
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

  document.querySelectorAll('.card, .hero-text, .contact-item').forEach(el => {
    el.classList.add('loading');
    observer.observe(el);
  });
}

function initializeCardHover() {
  document.querySelectorAll('.project-image-container').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  });
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

document.addEventListener('DOMContentLoaded', function() {
  applyStoredLanguage();
  
  initializeSwiper();
  initializeNavbarScrollEffect();
  initializeSmoothScrolling();
  initializeLoadingAnimations();
  initializeCardHover();
  addLanguageSwitchTransition();

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', toggleLanguage);

  document.querySelectorAll('form').forEach(form => {
    initializeFormValidation(form);
  });
});