/* ===== 1. REDAÇÕES (edite esta lista; são 17 itens) =====
   titulo: nome da redação | tema: tema proposto | texto: a redação completa
   Para um texto com vários parágrafos, separe com \n\n */
const redacoes = [];
for (let i = 1; i <= 17; i++) {
  redacoes.push({
    titulo: "Título da redação " + i,
    tema: "[tema proposto na Redação Paraná]",
    texto: "[Cole aqui o texto completo da redação " + i + ".]"
  });
}
// Exemplo de como preencher a primeira:
// redacoes[0] = { titulo: "Meu primeiro texto", tema: "Educação", texto: "Parágrafo 1...\n\nParágrafo 2..." };

const sanfona = document.getElementById("sanfona");
redacoes.forEach((r, i) => {
  const item = document.createElement("div");
  item.className = "item";
  const paragrafos = r.texto.split("\n\n").map(() => "<p></p>").join("");
  item.innerHTML =
    '<button class="cabeca" aria-expanded="false"><span class="num">' + (i + 1) + '</span><span class="tit"></span><span class="seta" aria-hidden="true">▼</span></button>' +
    '<div class="corpo"><div>' + paragrafos + '<small></small></div></div>';
  item.querySelector(".tit").textContent = r.titulo;
  item.querySelector("small").textContent = "Tema: " + r.tema;
  item.querySelectorAll("p").forEach((p, n) => p.textContent = r.texto.split("\n\n")[n]);
  sanfona.appendChild(item);

  // Abre uma redação por vez
  item.querySelector(".cabeca").addEventListener("click", () => {
    const abrir = !item.classList.contains("aberto");
    document.querySelectorAll(".item").forEach(x => {
      x.classList.remove("aberto");
      x.querySelector(".cabeca").setAttribute("aria-expanded", "false");
    });
    if (abrir) {
      item.classList.add("aberto");
      item.querySelector(".cabeca").setAttribute("aria-expanded", "true");
    }
  });
});

/* ===== 2. FOTOS: se o arquivo não existir, mostra um aviso com o nome ===== */
document.querySelectorAll(".foto img").forEach(img => {
  img.addEventListener("error", () => {
    const aviso = document.createElement("div");
    aviso.className = "vazia";
    aviso.textContent = "Coloque a foto aqui: " + img.getAttribute("src");
    img.replaceWith(aviso);
  });
});

/* ===== 3. BOLHAS ===== */
function soltarBolhas(qtd) {
  for (let i = 0; i < qtd; i++) {
    const b = document.createElement("span");
    const tam = 14 + Math.random() * 40;
    b.className = "bolha";
    b.style.cssText = "width:" + tam + "px;height:" + tam + "px;left:" + Math.random() * 100 + "vw;animation-duration:" + (4 + Math.random() * 5) + "s;animation-delay:" + Math.random() * 1.2 + "s";
    document.body.appendChild(b);
    b.addEventListener("animationend", () => b.remove());
  }
}
document.getElementById("soltar").addEventListener("click", () => soltarBolhas(40));
