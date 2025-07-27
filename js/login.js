const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const langToggleBtn = document.getElementById("langToggle");

let currentLang = localStorage.getItem("lang") || "en";

document.documentElement.setAttribute("lang", currentLang);
document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");


loginTab?.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab?.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-password")) {
    const inputId = e.target.getAttribute("data-input");
    const input = document.getElementById(inputId);
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
      e.target.classList.toggle("fa-eye");
      e.target.classList.toggle("fa-eye-slash");
    }
  }
});
