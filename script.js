
/* --- 1. CONFIGURAÇÃO DOS PRODUTOS (FOTO + NOME) --- */
const catalogo = {
    'torta': [
        { img: 'FOTOS/torta1frango.png', nome: 'Torta de Frango Cremoso' },
        { img: 'FOTOS/torta2carne.png', nome: 'Torta de Carne do Sol' },
        { img: 'FOTOS/torta3camarao.png', nome: 'Torta de Camarão' }
    ],
    'lasanha': [
        { img: 'FOTOS/lasanha1frango.png', nome: 'Lasanha de Frango' },
        { img: 'FOTOS/lasanha2bolonhesa.png', nome: 'Lasanha à Bolonhesa' },
        { img: 'FOTOS/lasanha3camarao.png', nome: 'Lasanha de Camarão' }
    ],
    'macarronada': [
        { img: 'FOTOS/macarronada1frango.png', nome: 'Macarronada de Frango' },
        { img: 'FOTOS/macarronada2bolonhesa.png', nome: 'Macarronada à Bolonhesa' },
        { img: 'FOTOS/macarronada3camarao.png', nome: 'Macarronada de Camarão' }
    ]
};

/*  2. CONFIGURAÇÃO DOS DETALHES DO MODAL (POP-UP) */

const detalhesGerais = {
    'torta': {
        tituloGeral: 'Tortas Salgadas Artesanais',
        descricao: 'Nossa famosa massa "podre" que derrete na boca. Recheios generosos e cremosos. Opções: Frango com milho/azeitona, Carne do Sol com coalho ou Camarão com requeijão.',
        preco: 'A partir de R$ 25,00'
    },
    'lasanha': {
        tituloGeral: 'Lasanhas Caseiras',
        descricao: 'Feitas com massa fresca e molhos cozinhados lentamente para apurar o sabor. Muito queijo gratinado!',
        preco: 'A partir de R$ 35,00'
    },
    'macarronada': {
        tituloGeral: 'Macarronadas Especiais',
        descricao: 'Sua escolha de macarrão (parafuso ou espaguete) com nossos molhos caseiros refogados na hora.',
        preco: 'A partir de R$ 30,00'
    }
};

/* --- 3. CONTROLE DA GALERIA (LÓGICA) --- */
let indiceAtual = {
    'torta': 0,
    'lasanha': 0,
    'macarronada': 0
};

let produtoAberto = ''; // Para saber qual modal está aberto

function mudarFoto(idProduto, direcao) {
    const lista = catalogo[idProduto];
    if (!lista) return;

    // Atualiza o índice
    indiceAtual[idProduto] += direcao;

    // Carrossel Infinito
    if (indiceAtual[idProduto] >= lista.length) indiceAtual[idProduto] = 0;
    if (indiceAtual[idProduto] < 0) indiceAtual[idProduto] = lista.length - 1;

    
    const itemAtual = lista[indiceAtual[idProduto]];

    // 1. TROCA A FOTO
    const imgHTML = document.getElementById(`img-${idProduto}`);
    if (imgHTML) imgHTML.src = itemAtual.img;

    // 2. TROCA O NOME (TÍTULO) NO CARD
    const tituloHTML = document.getElementById(`titulo-${idProduto}`);
    if (tituloHTML) tituloHTML.innerText = itemAtual.nome;

    // 3. SE O MODAL ESTIVER ABERTO, ATUALIZA ELE TAMBÉM
    if (produtoAberto === idProduto) {
        document.getElementById('modal-img').src = itemAtual.img;
        // Opcional: Atualizar o título do modal para o sabor específico também
        document.getElementById('modal-titulo').innerText = itemAtual.nome; 
    }
}

/* 4. CONTROLE DO MODAL  */
function abrirDetalhes(idProduto) {
    produtoAberto = idProduto;
    const dadosGerais = detalhesGerais[idProduto];
    
    // Pega o item específico que está selecionado na galeria agora
    const index = indiceAtual[idProduto];
    const itemEspecifico = catalogo[idProduto][index];

    // Preenche o Modal

    document.getElementById('modal-titulo').innerText = itemEspecifico.nome;
    document.getElementById('modal-desc').innerText = dadosGerais.descricao;
    document.getElementById('modal-preco').innerText = dadosGerais.preco;
    document.getElementById('modal-img').src = itemEspecifico.img;
    
    // WhatsApp
    const numeroWhats = "5585988993058"; // COLOQUE SEU NÚMERO AQUI
    const mensagem = `Olá! Vi o site e gostaria de pedir: ${itemEspecifico.nome}.`;
    const linkWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('modal-botao').href = linkWhats;

    document.getElementById('modal-fundo').style.display = 'flex';
}

function mudarFotoModal(direcao) {
    if (produtoAberto) {
        mudarFoto(produtoAberto, direcao);
    }
}

function fecharModal(event) {
    if (event.target.id === 'modal-fundo' || event.target.className === 'btn-fechar') {
        document.getElementById('modal-fundo').style.display = 'none';
        produtoAberto = '';
    }
}