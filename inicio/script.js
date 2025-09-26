// Dados do menu agora estão agrupados por restaurante neste arquivo
const estabelecimentos = [
    {
        id: 1,
        nome: "Bom Prato",
        telefone: "5592981555444", // Número com código do país (55)
        pratos: [
            {
                "id": 1001,
                "nome": "X-Salada",
                "descricao": "Delicioso hambúrguer de carne com queijo,clabres, bacon e molho especial.",
                "preco": 25.50,
                "tipo": "lanche",
                "image": "../imagens/xCalabresa.jpg"
            },
            {
                "id": 1002,
                "nome": "Pastel de Queijo",
                "descricao": "Pastel frito na hora com recheio cremoso de queijo.",
                "preco": 8.00,
                "tipo": "lanche",
                "image": "../imagens/pastelQueijo.jpg"
            },
            {
                "id": 1003,
                "nome": "Coca-Cola",
                "descricao": "Lata 350ml",
                "preco": 6.00,
                "tipo": "distribuidora",
                "image": "../imagens/cocaCola.png"
            }
        ]
    },
    {
        id: 2,
        nome: "Sushi oriental",
        telefone: "5592981555444", // Número com código do país (55)
        pratos: [
            {
                "id": 2001,
                "nome": "Sushi Combo",
                "descricao": "Delicioso combo de sushi variados 40 unidades" ,
                "preco": 70.00,
                "tipo": "lanche",
                "image": "../imagens/sushi.webp"
            },
            {
                "id": 2002,
                "nome": "Sushi Peixe tambaqui",
                "descricao": "sushi de peixe regional tambaqui 10 unidades.",
                "preco": 20.00,
                "tipo": "lanche",
                "image": "../imagens/sushiTambaqui.jpg"
            },
            {
                "id": 2003,
                "nome": "Sushi Banana",
                "descricao": "sushi de banana da terra 10 unidades.",
                "preco": 20.00,
                "tipo": "lanche",
                "image": "../imagens/sushiBanana.jpg"
            },
        ]
    },
    {
        id: 3,
        nome: "Sabor dos Anjos",
        telefone: "5592981446677", // Número com código do país (55)
        pratos: [
            {
                "id": 3001,
                "nome": "Pizza Calabresa",
                "descricao": "Clássica pizza de calabresa com cebola e azeitonas pretas.",
                "preco": 45.00,
                "tipo": "lanche",
                "image": "../imagens/pizzaCalabresa.jpg"
            },
            {
                "id": 3003,
                "nome": "kikao Simples",
                "descricao": "kikao simples com bao e salcicha.",
                "preco": 10.00,
                "tipo": "lanche",
                "image": "../imagens/kikao.jpeg"
            }
        ]
    },
    {
        id: 4,
        nome: "Distribuidora Lyan",
        telefone: "5592981446677", // Número com código do país (55)
        pratos: [
            {
                "id": 4001,
                "nome": "Cerveja Itaipava",
                "descricao": "Clássica cerveja Itaipava fardinho 280ml 15/und.",
                "preco": 45.00,
                "tipo": "distribuidora",
                "image": "../imagens/cerveja.jpeg"
            },
            {
                "id": 4003,
                "nome": "Carvao 3kg",
                "descricao": "Sacola de carvao.",
                "preco": 10.00,
                "tipo": "distribuidora",
                "image": "../imagens/carvaoSacola.webp"
            }
        ]
    }
];
// Adicione esta função para otimizar imagens
function optimizeImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '200px';
        
        img.onload = function() {
            this.style.backgroundColor = 'transparent';
        };
        
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhjZDAxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBjYXJyZWdhZGE8L3RleHQ+PC9zdmc+';
            this.alt = 'Imagem não disponível';
        };
    });
}

let cart = [];
let pratos = [];

// Popula o array de pratos
estabelecimentos.forEach(estabelecimento => {
    estabelecimento.pratos.forEach(prato => {
        pratos.push({
            ...prato,
            restaurante_id: estabelecimento.id,
            restaurante_nome: estabelecimento.nome,
            restaurante_telefone: estabelecimento.telefone
        });
    });
});

const menuEl = document.getElementById('menu');
const cartItemsEl = document.getElementById('cart-items');
const floatingCartCountEl = document.getElementById('floating-cart-count');
const cartTotalEl = document.getElementById('cart-total');
const cartEl = document.getElementById('cart');
const backdropEl = document.getElementById('backdrop');
const searchInput = document.getElementById('search');
const mobileSearchInput = document.getElementById('mobile-search');
const categoryButtons = document.querySelectorAll('.category-nav button');
const checkoutForm = document.getElementById('checkout-form');
const confirmationModal = document.getElementById('confirmation-modal');
const orderSummaryEl = document.getElementById('order-summary');

// Helper function to close all modals/sidebars
function closeAll() {
    cartEl.classList.remove('active');
    confirmationModal.classList.remove('active');
    backdropEl.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para embaralhar array (Algoritmo Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// *** FUNÇÃO RENDERMENU ÚNICA E CORRETA ***
function renderMenu(items) {
    menuEl.innerHTML = '';
    if (items.length === 0) {
        menuEl.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777; padding: 20px;">Nenhum prato encontrado.</p>';
        return;
    }
    
    // Embaralha os itens antes de renderizar
    const shuffledItems = shuffleArray(items);
    
    shuffledItems.forEach(prato => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image-container">
                <img src="${prato.image}" alt="${prato.nome}" loading="lazy">
                <div class="image-placeholder"></div>
            </div>
            <div class="card-content">
                <h3>${prato.nome}</h3>
                <p class="restaurante-nome">${prato.restaurante_nome}</p>
                <p class="description">${prato.descricao}</p>
                <p class="price">R$ ${prato.preco.toFixed(2).replace('.', ',')}</p>
                <button onclick="addToCart(${prato.id})">Adicionar</button>
            </div>
        `;
        menuEl.appendChild(card);
    });
    
    setTimeout(optimizeImageLoading, 100);
}

// *** ADICIONE ESTA FUNÇÃO QUE ESTÁ FALTANDO ***
function addToCart(id) {
    const item = pratos.find(p => p.id === id);
    if (item) {
        const existingItem = cart.find(c => c.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        renderCart();
        saveCart();

        // Feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = "Adicionado!";
        button.style.backgroundColor = "#28a745";

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "";
        }, 1000);
    }
}

function saveCart() {
    localStorage.setItem('jutai_cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('jutai_cart');
    if (saved) cart = JSON.parse(saved);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    saveCart();
}

// Update cart UI and total price
function renderCart() {
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<li style="text-align: center; color: #777; padding: 20px;">Seu carrinho está vazio.</li>';
        cartTotalEl.textContent = 'R$ 0,00';
        floatingCartCountEl.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.nome} (${item.restaurante_nome})</span>
                <span class="item-price">R$ ${(item.preco * item.quantity).toFixed(2).replace('.', ',')}</span>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        `;
        cartItemsEl.appendChild(li);
        total += item.preco * item.quantity;
    });

    cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    floatingCartCountEl.textContent = totalCount;
    saveCart();
}

// Update item quantity
function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(id);
        return;
    }

    const item = cart.find(c => c.id === id);
    if (item) {
        item.quantity = newQuantity;
        renderCart();
        saveCart();
    }
}

// Show/hide cart sidebar
function toggleCart() {
    cartEl.classList.toggle('active');
    backdropEl.style.display = cartEl.classList.contains('active') ? 'block' : 'none';
    document.body.style.overflow = cartEl.classList.contains('active') ? 'hidden' : 'auto';
}

// Fechar carrinho (função separada para o botão X)
function closeCart() {
    cartEl.classList.remove('active');
    backdropEl.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle search and category filtering
function filterMenu(query = '') {
    const selectedCategory = document.querySelector('.category-nav button.active').dataset.category;
    const filteredItems = pratos.filter(prato => {
        const matchesCategory = selectedCategory === 'todos' || prato.tipo.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = prato.nome.toLowerCase().includes(query.toLowerCase()) ||
            prato.descricao.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    renderMenu(filteredItems);
}

// Show order summary before sending
function showOrderSummary() {
    const pedidosPorRestaurante = {};
    cart.forEach(item => {
        if (!pedidosPorRestaurante[item.restaurante_id]) {
            pedidosPorRestaurante[item.restaurante_id] = {
                restaurante_nome: item.restaurante_nome,
                restaurante_telefone: item.restaurante_telefone,
                items: []
            };
        }
        pedidosPorRestaurante[item.restaurante_id].items.push(item);
    });

    orderSummaryEl.innerHTML = '';
    for (const restauranteId in pedidosPorRestaurante) {
        const restaurante = pedidosPorRestaurante[restauranteId];
        let message = `Olá, ${restaurante.restaurante_nome}! Gostaria de fazer um pedido:\n\n*--- Detalhes do Pedido ---*\n`;
        let total = 0;

        let itemsHtml = '<ul>';
        restaurante.items.forEach(item => {
            message += `${item.quantity}x ${item.nome} - R$ ${(item.preco * item.quantity).toFixed(2).replace('.', ',')}\n`;
            total += item.preco * item.quantity;
            itemsHtml += `<li>${item.quantity}x ${item.nome}</li>`;
        });
        itemsHtml += '</ul>';

        message += `\n*Total do pedido em seu restaurante: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
        message += `*--- Dados do Cliente ---*\n`;
        message += `Nome: ${document.getElementById('nome').value}\n`;
        message += `Endereço: ${document.getElementById('endereco').value}\n`;
        if (document.getElementById('referencia').value) message += `Ponto de Referência: ${document.getElementById('referencia').value}\n`;
        message += `Pagamento: ${document.getElementById('pagamento').value}\n`;
        if (document.getElementById('troco').value) message += `Troco para: ${document.getElementById('troco').value}\n`;
        message += `\nObrigado!`;

        const whatsappUrl = `https://wa.me/${restaurante.restaurante_telefone}?text=${encodeURIComponent(message)}`;

        const card = document.createElement('div');
        card.className = 'restaurante-card';
        card.innerHTML = `
            <h3>${restaurante.restaurante_nome}</h3>
            ${itemsHtml}
            <div class="total-restaurante">Total: R$ ${total.toFixed(2).replace('.', ',')}</div>
            <a href="${whatsappUrl}" target="_blank">
                <button><i class="fab fa-whatsapp"></i> Enviar Pedido</button>
            </a>
        `;
        orderSummaryEl.appendChild(card);
    }
    
    closeCart();
    confirmationModal.classList.add('active');
    backdropEl.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Checkout function to generate WhatsApp message
function checkout() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const pagamento = document.getElementById('pagamento').value;

    if (cart.length === 0) {
        showCustomAlert("Seu carrinho está vazio!");
        return;
    }

    if (!nome || !endereco || !pagamento) {
        showCustomAlert("Por favor, preencha todos os campos obrigatórios (Nome, Endereço, Pagamento) para finalizar o pedido.");
        return;
    }
    
    showOrderSummary();
}

// *** INICIALIZAÇÃO CORRIGIDA - REMOVA A DUPLICAÇÃO ***
document.addEventListener('DOMContentLoaded', () => {
    renderMenu(shuffleArray(pratos)); // Já inicia embaralhado
    loadCart();
    renderCart();
});

// Event Listeners
searchInput.addEventListener('input', (e) => {
    filterMenu(e.target.value);
});

mobileSearchInput.addEventListener('input', (e) => {
    filterMenu(e.target.value);
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterMenu(searchInput.value || mobileSearchInput.value);
    });
});

document.querySelector('.close-cart').addEventListener('click', closeCart);

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkout();
});

backdropEl.addEventListener('click', closeAll);

// Modo escuro
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = "☀️";
            localStorage.setItem("darkMode", "enabled");
        } else {
            darkModeToggle.textContent = "🌙";
            localStorage.setItem("darkMode", "disabled");
        }
    });

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }
}