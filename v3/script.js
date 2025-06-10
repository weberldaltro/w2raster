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
