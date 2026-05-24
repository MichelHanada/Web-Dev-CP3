const produtos = [
  {
    id: 1,
    nome: 'Shineray PT3S',
    tag: 'SCOOTER ELÉTRICA',
    descricao: 'Scooter elétrica com motor 3000W Brushless, bateria de lítio removível 60V/20Ah, autonomia de até 35 km por carga e painel 100% digital. Aro 10, freios a disco e capacidade para 2ª bateria.',
    preco: 12990,
    emoji: '🛵',
  },
  {
    id: 2,
    nome: 'Shineray SE1',
    tag: 'MOTOCICLETA ELÉTRICA',
    descricao: 'Motocicleta elétrica com motor Bosch 2000W (IP67), bateria de lítio removível 60V/23,4Ah, autonomia de até 60 km por carga e painel digital completo. Rodas aro 12, freios a disco e suspensão telescópica.',
    preco: 12490,
    emoji: '⚡',
  },
  {
    id: 3,
    nome: 'Shineray SE2',
    tag: 'MOTOCICLETA ELÉTRICA',
    descricao: 'Motocicleta elétrica retrô com motor Bosch 2300W (IP67), bateria lítio removível 60V/23,4Ah, autonomia de até 60 km e visual clássico. Rodas aro 12, freios a disco e capacidade para 2ª bateria.',
    preco: 12490,
    emoji: '🏍️',
  },
  {
    id: 4,
    nome: 'Shineray SHE-S',
    tag: 'NAKED ELÉTRICA',
    descricao: 'Motocicleta elétrica esportiva com motor 3000W, bateria LiFePO4 72V/35Ah, autonomia de até 80 km e painel TFT full-color. Rodas aro 17, suspensão invertida dianteira e monoshock traseiro.',
    preco: 16490,
    emoji: '🔋',
  },
  {
    id: 5,
    nome: 'Shineray PT4-PRO S',
    tag: 'SCOOTER PREMIUM',
    descricao: 'Scooter elétrica premium com design moderno, motor de alta performance, painel digital colorido, iluminação Full LED e dupla capacidade de bateria. O modelo mais avançado da linha de scooters elétricas Shineray.',
    preco: 15990,
    emoji: '✨',
  },
];

const carrinho = [
  { id: 2, nome: 'Shineray SE1',       emoji: '⚡',  qtd: 1, precoUnit: 12490 },
  { id: 4, nome: 'Shineray SHE-S',     emoji: '🔋',  qtd: 2, precoUnit: 16490 },
  { id: 1, nome: 'Shineray PT3S',      emoji: '🛵',  qtd: 1, precoUnit: 12990 },
  { id: 5, nome: 'Shineray PT4-PRO S', emoji: '✨',  qtd: 3, precoUnit: 15990 },
];
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularTotal(itens) {
  return itens.reduce((acc, item) => acc + item.precoUnit * item.qtd, 0);
}

function renderizarProdutos() {
  const grid = document.getElementById('grid-produtos');
  if (!grid) return;

  grid.innerHTML = '';

  produtos.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card-produto';
    card.innerHTML = `
      <div class="card-img">${p.emoji}</div>
      <div class="card-body">
        <p class="card-tag">${p.tag}</p>
        <h3 class="card-nome">${p.nome}</h3>
        <p class="card-desc">${p.descricao}</p>
        <div class="card-footer">
          <span class="card-preco">${formatarMoeda(p.preco)}</span>
          <button class="btn-comprar" onclick="adicionarAoCarrinho(${p.id})">
            + CARRINHO
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function adicionarAoCarrinho(id) {
  mostrarToast('Item adicionado ao carrinho! 🛒');
}

function renderizarCarrinho() {
  const lista = document.getElementById('carrinho-lista');
  if (!lista) return;

  lista.innerHTML = '';

  carrinho.forEach((item) => {
    const total = item.precoUnit * item.qtd;
    const li = document.createElement('div');
    li.className = 'carrinho-item';
    li.innerHTML = `
      <div class="item-info">
        <span class="item-icone">${item.emoji}</span>
        <div>
          <p class="item-nome">${item.nome}</p>
          <p class="item-qtd">Qtd: ${item.qtd} × ${formatarMoeda(item.precoUnit)}</p>
        </div>
      </div>
      <span class="item-preco">${formatarMoeda(total)}</span>
    `;
    lista.appendChild(li);
  });

  atualizarResumo();
}

let descontoAplicado = false;

function atualizarResumo() {
  const totalBruto = calcularTotal(carrinho);
  const totalComDesconto = descontoAplicado
    ? totalBruto * 0.9
    : totalBruto;

  const elSubtotal   = document.getElementById('subtotal');
  const elDesconto   = document.getElementById('linha-desconto');
  const elValorDesc  = document.getElementById('valor-desconto');
  const elTotal      = document.getElementById('total-compra');
  const btnDesconto  = document.getElementById('btn-desconto');

  if (elSubtotal)  elSubtotal.textContent  = formatarMoeda(totalBruto);
  if (elTotal)     elTotal.textContent     = formatarMoeda(totalComDesconto);

  if (descontoAplicado) {
    if (elDesconto)  elDesconto.style.display = 'flex';
    if (elValorDesc) elValorDesc.textContent  = `- ${formatarMoeda(totalBruto * 0.1)}`;
    if (elTotal)     elTotal.classList.add('desconto');
    if (btnDesconto) {
      btnDesconto.textContent = '✔ DESCONTO DE 10% APLICADO';
      btnDesconto.disabled = true;
    }
  }
}

function aplicarDesconto() {
  if (descontoAplicado) return;
  descontoAplicado = true;
  atualizarResumo();
  mostrarToast('Desconto de 10% aplicado com sucesso! 🎉');
}

function mostrarToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos();
  renderizarCarrinho();

  const links = document.querySelectorAll('.nav-links a');
  links.forEach((link) => {
    if (link.href === window.location.href) link.classList.add('ativo');
  });
});

window.aplicarDesconto = aplicarDesconto;
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.__voltzmoto = { produtos, carrinho };