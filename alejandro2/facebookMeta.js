// Envia evento PageView para API personalizada
(() => {
  const chave = "aXM2-Sm5Q-d7O8-TSLA-rOO5n2nmRK";
  const url = `https://roi.metechsolucoes.com.br/pageViews/${chave}`;
  const evento = { ev: "PageView" };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.status === "success") {
        console.log("Success:", json);
      } else {
        console.error("Erro ao registrar evento:", json);
      }
    })
    .catch((err) => console.error("Erro na requisição:", err));
})();

// Inicializa o Pixel do Facebook
(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  t = b.createElement(e);
  t.async = true;
  t.src = v;

  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);

fbq("init", "9889662884496167");
fbq("track", "Check");
console.log("Verificando [Check]");

// Observa requisições para capturar eventos do pixel
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes("https://www.facebook.com/tr")) {
      console.log("Evento do Pixel capturado:", entry);

      const url = new URL(entry.name);
      const params = Object.fromEntries(url.searchParams.entries());

      params.client_user_agent = navigator.userAgent;

      // Busca IP público e envia para API personalizada
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          params.client_ip = data.ip;

          return fetch(
            "https://roi.metechsolucoes.com.br/coletar-evento/aXM2-Sm5Q-d7O8-TSLA-rOO5n2nmRK",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(params),
            }
          );
        })
        .then((res) => console.log("Evento enviado com sucesso:", res))
        .catch((err) => console.error("Erro ao enviar evento:", err));
    }
  });
});

observer.observe({ entryTypes: ["resource"] });

console.log("Verificando [P]");
