 // Elementos da interface
    const raiz = document.documentElement;
    const botaoTema = document.getElementById("botao-tema");
    const botaoDemo = document.getElementById("botao-demo");
    const mensagem = document.getElementById("mensagem");

    // Preferência de tema do sistema operativo
    const preferenciaSistema = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    let escolhaManual = false;

    // Aplicar o tema e atualizar o botão
    function aplicarTema(escuro) {
      raiz.dataset.theme = escuro ? "dark" : "light";

      botaoTema.setAttribute(
        "aria-pressed",
        String(escuro)
      );

      botaoTema.textContent = escuro
        ? "Modo claro"
        : "Modo escuro";
    }

    // Recuperar a preferência guardada
    let temaGuardado = null;

    try {
      temaGuardado = localStorage.getItem("tema-edicao-web");
    } catch {
      // A página continua funcional se o armazenamento
      // não estiver disponível.
    }

    escolhaManual =
      temaGuardado === "dark" ||
      temaGuardado === "light";

    aplicarTema(
      escolhaManual
        ? temaGuardado === "dark"
        : preferenciaSistema.matches
    );

    // Alternar entre modo claro e modo escuro
    botaoTema.addEventListener("click", () => {
      const escuro = raiz.dataset.theme !== "dark";

      escolhaManual = true;
      aplicarTema(escuro);

      try {
        localStorage.setItem(
          "tema-edicao-web",
          escuro ? "dark" : "light"
        );
      } catch {
        // A alternância funciona mesmo sem guardar o tema.
      }
    });

    // Acompanhar o tema do sistema enquanto
    // o utilizador não tiver escolhido outro.
    preferenciaSistema.addEventListener("change", (evento) => {
      if (!escolhaManual) {
        aplicarTema(evento.matches);
      }
    });

    // Mensagem da demonstração
    botaoDemo.addEventListener("click", () => {
      mensagem.textContent =
        "Boa! Experimenta também alternar o tema da página.";
    });