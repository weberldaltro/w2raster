document.addEventListener("DOMContentLoaded", function () {
  // --- Módulo 1: Lógica para o Menu Mobile ---
  const menuToggle = document.querySelector(".menu-toggle");
  const menuPrincipal = document.querySelector("#menu-principal");

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", function () {
      menuPrincipal.classList.toggle("active");
      menuToggle.classList.toggle("active");
      const isExpanded = menuPrincipal.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
      if (isExpanded) {
        menuToggle.setAttribute("aria-label", "Fechar menu");
      } else {
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });

    const menuLinks = menuPrincipal.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menuPrincipal.classList.contains("active")) {
          menuPrincipal.classList.remove("active");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Abrir menu");
        }
      });
    });
  }

  // --- Módulo 2: Lógica para Animação de Rolagem ---
  const elementsToFadeIn = document.querySelectorAll(".fade-in-element");

  if (elementsToFadeIn.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elementsToFadeIn.forEach((element) => {
      observer.observe(element);
    });
  }

  // --- Módulo 3: Lógica para a Galeria Lightbox com Navegação ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentIndex = 0;

  if (
    galleryItems.length > 0 &&
    lightbox &&
    lightboxImg &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
  ) {
    function showImage(index) {
      const item = galleryItems[index];
      const imageUrl = item.href;
      const imageAlt = item.querySelector("img").alt;
      lightboxImg.src = imageUrl;
      lightboxCaption.textContent = imageAlt;
      currentIndex = index;
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        lightbox.classList.add("visible");
        showImage(index);
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("visible");
    };

    const showNextImage = () => {
      currentIndex++;
      if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
      }
      showImage(currentIndex);
    };

    const showPrevImage = () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
      }
      showImage(currentIndex);
    };

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
});
