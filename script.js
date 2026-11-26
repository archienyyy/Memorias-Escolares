/* ===== 1. MEMÓRIAS (edite os textos e os nomes das fotos aqui) =====
   fotos: 3 imagens dentro de assets/img/ | causo, curiosidade, desafio: textos das abas */
const etapas = [
  { icone: "🧸", selo: "Até 2014 · Creche", titulo: "CMEI Tia Chiquinha",
    fotos: ["creche-1.jpg", "creche-2.jpg", "creche-3.jpg"],
    intro: "[Conte como foi o começo: amigos, professoras, brincadeiras.]",
    causo: "[uma história engraçada ou marcante]", curiosidade: "[algo que só você sabe]", desafio: "[ex.: a adaptação nos primeiros dias]" },
  { icone: "🎒", selo: "2015 a 2019 · 6 a 10 anos", titulo: "Colégio Energia Ativa",
    fotos: ["energia-1.jpg", "energia-2.jpg", "energia-3.jpg"],
    intro: "[Fale da alfabetização, dos primeiros anos do Fundamental I e das festas da escola.]",
    causo: "[...]", curiosidade: "[...]", desafio: "[...]" },
  { icone: "📚", selo: "2020 a 2023 · 6º ao 9º ano", titulo: "Chegada ao Morelli",
    fotos: ["fund2-1.jpg", "fund2-2.jpg", "fund2-3.jpg"],
    intro: "[Escola nova, turma nova, 11 anos. Como foi a mudança? E estudar na pandemia?]",
    causo: "[...]", curiosidade: "[...]", desafio: "[...]" },
  { icone: "🎓", selo: "2024 a 2026 · Ensino Médio", titulo: "Turma E e a reta final",
    fotos: ["medio-1.jpg", "medio-2.jpg", "medio-3.jpg"],
    intro: "[Fale do 1º, 2º e 3º ano, dos amigos da Turma E e do que vem agora.]",
    causo: "[...]", curiosidade: "[...]", desafio: "[...]" }
];

const linha = document.getElementById("linha");
etapas.forEach(e => {
  const art = document.createElement("article");
  art.className = "etapa";
  art.innerHTML =
    '<div class="galeria">' + e.fotos.map((f, i) => '<div class="foto"><img src="assets/img/' + f + '" alt="Foto ' + (i + 1) + ' - ' + e.titulo + '"></div>').join("") + '</div>' +
    '<div class="texto"><span class="icone"></span><br><span class="selo"></span><h3></h3><p class="intro-et"></p>' +
    '<div class="abas"><button class="aba" data-k="causo">😄 Causo</button><button class="aba" data-k="curiosidade">🔎 Curiosidade</button><button class="aba" data-k="desafio">💪 Desafio superado</button></div>' +
    '<p class="painel" hidden></p></div>';
  art.querySelector(".icone").textContent = e.icone;
  art.querySelector(".selo").textContent = e.selo;
  art.querySelector("h3").textContent = e.titulo;
  art.querySelector(".intro-et").textContent = e.intro;
  const painel = art.querySelector(".painel");
  art.querySelectorAll(".aba").forEach(b => b.addEventListener("click", () => {
    const ativo = b.getAttribute("aria-pressed") === "true";
    art.querySelectorAll(".aba").forEach(x => x.setAttribute("aria-pressed", "false"));
    painel.hidden = ativo;
    if (!ativo) { b.setAttribute("aria-pressed", "true"); painel.textContent = e[b.dataset.k]; }
  }));
  linha.appendChild(art);
});

/* Se a foto ainda não existe, mostra um aviso com o nome do arquivo */
document.querySelectorAll(".foto img, .janela img").forEach(img => {
  img.addEventListener("error", () => {
    const aviso = document.createElement("div");
    aviso.className = "vazia";
    aviso.textContent = "Coloque a foto: " + img.getAttribute("src");
    img.replaceWith(aviso);
  });
});

/* ===== 2. REDAÇÕES (17 itens; edite título, tema e texto) =====
   Para vários parágrafos, separe com uma linha em branco (\n\n) */
const redacoes = [];
for (let i = 1; i <= 17; i++) {
  redacoes.push({ titulo: "Título da redação " + i, tema: "[tema da Redação Paraná]", texto: "[Cole aqui o texto completo da redação " + i + ".]" });
}
// Exemplo: redacoes[0] = { titulo: "Meu primeiro texto", tema: "Educação", texto: "Parágrafo 1...\n\nParágrafo 2..." };

const sanfona = document.getElementById("sanfona");
const itens = [];
function alternar(item, abrir) {
  item.classList.toggle("aberto", abrir);
  item.querySelector(".cabeca").setAttribute("aria-expanded", abrir);
}
redacoes.forEach((r, i) => {
  const item = document.createElement("div");
  item.className = "item";
  const partes = r.texto.split("\n\n");
  item.innerHTML = '<button class="cabeca" aria-expanded="false"><span class="num">' + (i + 1) + '</span><span class="tit"></span><span class="seta" aria-hidden="true">▼</span></button>' +
    '<div class="corpo"><div>' + partes.map(() => "<p></p>").join("") + '<small></small></div></div>';
  item.querySelector(".tit").textContent = r.titulo;
  item.querySelector("small").textContent = "Tema: " + r.tema;
  item.querySelectorAll("p").forEach((p, n) => p.textContent = partes[n]);
  item.querySelector(".cabeca").addEventListener("click", () => {
    const abrir = !item.classList.contains("aberto");
    itens.forEach(x => alternar(x, false));
    alternar(item, abrir);
  });
  itens.push(item);
  sanfona.appendChild(item);
});
document.getElementById("abrirTodas").addEventListener("click", () => itens.forEach(x => alternar(x, true)));
document.getElementById("fecharTodas").addEventListener("click", () => itens.forEach(x => alternar(x, false)));

/* ===== 3. BOLHAS E CONFETE ===== */
function chuva(classe, qtd, simbolos) {
  for (let i = 0; i < qtd; i++) {
    const el = document.createElement("span");
    el.className = classe;
    const tam = 14 + Math.random() * 40;
    if (simbolos) el.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    else { el.style.width = el.style.height = tam + "px"; }
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (4 + Math.random() * 4) + "s";
    el.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
document.getElementById("soltar").addEventListener("click", () => chuva("bolha", 40));
document.getElementById("confete").addEventListener("click", () => chuva("confete", 45, ["🎓", "🎉", "⭐", "🐠", "💙", "🎊"]));

/* ===== 4. AMPLIAR FOTO E VOLTAR AO TOPO ===== */
const lb = document.getElementById("lightbox");
document.addEventListener("click", ev => {
  if (ev.target.matches(".foto img")) { lb.querySelector("img").src = ev.target.src; lb.hidden = false; }
  else if (!lb.hidden && !ev.target.matches("#lightbox img")) lb.hidden = true;
});
document.addEventListener("keydown", ev => { if (ev.key === "Escape") lb.hidden = true; });
const voltar = document.getElementById("topo");
voltar.hidden = true;
window.addEventListener("scroll", () => { voltar.hidden = window.scrollY < 600; });
voltar.addEventListener("click", () => window.scrollTo({ top: 0 }));
