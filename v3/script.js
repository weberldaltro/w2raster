document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuPrincipal = document.querySelector("#menu-principal");

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", function () {
      // Alterna a classe 'active' no menu para mostrar/esconder
      menuPrincipal.classList.toggle("active");

      // Alterna a classe 'active' no botão para animar o ícone
      menuToggle.classList.toggle("active");

      // Atualiza o aria-expanded para acessibilidade
      const isExpanded = menuPrincipal.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);

      // Muda o aria-label do botão dependendo do estado do menu
      if (isExpanded) {
        menuToggle.setAttribute("aria-label", "Fechar menu");
      } else {
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });

    // Opcional: Fechar o menu ao clicar em um link (para one-page sites)
    const menuLinks = menuPrincipal.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Só fecha o menu se ele estiver aberto (visível em telas mobile)
        if (menuPrincipal.classList.contains("active")) {
          menuPrincipal.classList.remove("active");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Abrir menu");
        }
      });
    });
  }
});

// --- Lógica para Animação de Rolagem ---

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos que devem ser animados
  const elementsToFadeIn = document.querySelectorAll(".fade-in-element");

  // Se não houver elementos para animar, não faz nada
  if (elementsToFadeIn.length === 0) {
    return;
  }

  // Configurações do Intersection Observer
  // O threshold: 0.15 significa que a animação vai disparar
  // quando 15% do elemento estiver visível na tela.
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  // Cria o observador
  const observer = new IntersectionObserver((entries, observer) => {
    // Percorre cada elemento que o observador "viu" mudar
    entries.forEach((entry) => {
      // Verifica se o elemento está agora intersectando (visível)
      if (entry.isIntersecting) {
        // Adiciona a classe 'visible' para disparar a animação CSS
        entry.target.classList.add("visible");

        // Otimização: uma vez que a animação aconteceu,
        // não precisamos mais observar este elemento.
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Inicia a observação para cada um dos elementos selecionados
  elementsToFadeIn.forEach((element) => {
    observer.observe(element);
  });
});

// --- Lógica para a Galeria Lightbox ---

document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  // Verifica se os elementos da galeria e do lightbox existem
  if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault(); // Impede que o link navegue para outra página

        const imageUrl = this.href;
        const imageAlt = this.querySelector("img").alt;

        lightboxImg.src = imageUrl;
        lightboxCaption.textContent = imageAlt;
        lightbox.classList.add("visible");
      });
    });

    // Função para fechar o lightbox
    const closeLightbox = () => {
      lightbox.classList.remove("visible");
    };

    // Eventos para fechar o lightbox
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      // Fecha somente se o clique for no fundo escuro, e não na imagem
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
});
