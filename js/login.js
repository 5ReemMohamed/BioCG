  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  });

  let currentLang = 'en';

  const langToggleBtn = document.getElementById('langToggle');
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    langToggleBtn.textContent = currentLang === 'en' ? 'العربية' : 'English';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    applyTranslations();
    revalidateAllInputs();
  });

  function applyTranslations() {
    document.querySelectorAll('[data-placeholder-en]').forEach(input => {
      const placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
      if (placeholder) input.placeholder = placeholder;
    });
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) el.textContent = text;
    });
  }

  function revalidateAllInputs() {
    document.querySelectorAll('.form.active input').forEach(input => {
      validateInput(input);
    });
  }


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-password')) {
      const inputId = e.target.getAttribute('data-input');
      const input = document.getElementById(inputId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        e.target.classList.toggle('fa-eye');
        e.target.classList.toggle('fa-eye-slash');
      }
    }
  });

  const forms = document.querySelectorAll('.form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input, textarea');
      let allValid = true;

      inputs.forEach(input => {
        const inputValid = validateInput(input);
        if (!inputValid) {
          allValid = false;
        }
      });

      if (allValid) {
        console.log("Form is valid and ready to submit");
        form.submit();
      }
    });

    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
      });
    });
  });

  function validateInput(input) {
    const name = input.name;
    const value = input.value.trim();
    const wrapper = input.closest('.password-field') || input.parentElement;
    const errorMsg = wrapper.querySelector('.error-msg');
    if (!errorMsg) return true;

    let message = '';

    if (!value) {
      message = currentLang === 'en' ? 'This field is required' : 'هذا الحقل مطلوب';
    } else if (name === 'userName' && !/^[a-zA-Z0-9_\u0621-\u064A]{3,}$/.test(value)) {
      message = currentLang === 'en'
        ? 'Invalid username (at least 3 characters)'
        : 'اسم المستخدم غير صالح (٣ أحرف على الأقل)';
    } else if (name === 'password' && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
      message = currentLang === 'en'
        ? 'Password must be at least 6 characters, with letters and numbers'
        : 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل وأرقام';
    } else if (name === 'confirm-Password') {
      const passwordInput = input.closest('.form').querySelector('[name="password"]');
      const password = passwordInput ? passwordInput.value.trim() : '';
      if (value !== password) {
        message = currentLang === 'en' ? 'Passwords do not match' : 'كلمتا المرور غير متطابقتين';
      }
    } else if (name === 'phone' && !/^[0-9]{10,15}$/.test(value)) {
      message = currentLang === 'en'
        ? 'Enter a valid phone number (10–15 digits)'
        : 'أدخل رقم هاتف صالح (من 10 إلى 15 رقمًا)';
    } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      message = currentLang === 'en'
        ? 'Enter a valid email address'
        : 'أدخل بريدًا إلكترونيًا صالحًا';
    } else if (name === 'address' && value.length < 5) {
      message = currentLang === 'en'
        ? 'Address must be at least 5 characters'
        : 'العنوان يجب أن لا يقل عن 5 أحرف';
    }

    errorMsg.textContent = message;
    return message === '';
  }