
const nama = "Tristan";

// Menampilkan sapaan di console browser
console.log("Halo, " + nama + "! Selamat datang di portofolioku.");

// Menampilkan tahun secara otomatis
const tahun = document.querySelector("footer p");

if (tahun) {
  tahun.textContent =
    "© " + new Date().getFullYear() +
    " Tristan. Terus belajar dan berkembang.";
}

// Efek sapaan ketika tombol portofolio diklik
const tombol = document.querySelector(".button");

if (tombol) {
  tombol.addEventListener("click", function () {
    console.log("Terima kasih sudah mengunjungi portofolioku!");
  });
}

/* EFEK MENGETIK */
const typingElement = document.querySelector("#typing");

if (typingElement) {
  const words = [
    "Web Developer",
    "HTML & CSS Learner",
    "Creative Learner"
  ];

  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingElement.textContent = currentWord.slice(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 1500);
}

/* ANIMASI KETIKA BAGIAN WEBSITE TERLIHAT */

/* ANIMASI SCROLL */
const revealElements = document.querySelectorAll(
  "section:not(.hero), .card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* TOMBOL KEMBALI KE ATAS */
const backToTop = document.querySelector("#backToTop");

if (backToTop) {
  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 300);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* NAVBAR AKTIF SAAT SCROLL */
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

function updateActiveMenu() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);

/* FITUR GANTI TEMA */

/* FITUR GANTI TEMA + SIMPAN PILIHAN */
const themeToggle = document.querySelector("#themeToggle");

if (themeToggle) {
  // Baca tema yang terakhir dipilih
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  // Sesuaikan ikon dengan tema
  function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "🌙" : "☀️";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Ganti ke tema gelap" : "Ganti ke tema terang"
    );
  }

  updateThemeButton();

  // Ganti tema saat tombol diklik
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    localStorage.setItem(
      "portfolio-theme",
      isLight ? "light" : "dark"
    );

    updateThemeButton();
  });
}

/* FORMULIR KONTAK */
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.querySelector("#nama").value.trim();
    const email = document.querySelector("#email").value.trim();
    const pesan = document.querySelector("#pesan").value.trim();

    const tujuanEmail = "tristanzaidane@gmail.com";
    const subjek = encodeURIComponent("Pesan dari " + nama);
    const isiPesan = encodeURIComponent(
      "Nama: " + nama +
      "\nEmail: " + email +
      "\n\nPesan:\n" + pesan
    );

    window.location.href =
      "mailto:" + tujuanEmail +
      "?subject=" + subjek +
      "&body=" + isiPesan;
  });
}

