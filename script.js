
(function() {
    const jogosDestaque = [
        { titulo: 'Tetris', genero: 'Puzzle', avaliacao: 4.9, jogadores: '128K', etiqueta: 'Novo', icone: '🧩', url: 'tetris.html' },
        { titulo: 'Jogo Da Cobra', genero: 'Plataforma', avaliacao: 4.7, jogadores: '95K', etiqueta: 'Trending', icone: '🐍', url: 'snake.html' },
        { titulo: 'Defenda a Torre', genero: 'estratégia', avaliacao: 4.8, jogadores: '210K', etiqueta: 'Top', icone: '♜', url : 'TowerDefense.html' },
        { titulo: 'Void Walker', genero: 'Aventura', avaliacao: 4.6, jogadores: '76K', etiqueta: '', icone: '♟️', url : 'shadow.html' },
        { titulo: 'Pixel Run', genero: 'Estratégia', avaliacao: 4.9, jogadores: '154K', etiqueta: 'Premium', icone: '🏃', url : 'pixel.html' },
       
    ];

    const jogosPopulares = [
{ titulo: 'Pixel Run', genero: 'Estratégia', avaliacao: 4.9, jogadores: '154K', etiqueta: 'Premium', icone: '🏃', url : 'pixel.html' },        { titulo: 'Quantum Break', genero: 'Puzzle', avaliacao: 4.6, jogadores: '55K', etiqueta: '', icone: '⚛️' },
       { titulo: 'Tetris', genero: 'Puzzle', avaliacao: 4.9, jogadores: '128K', etiqueta: 'Novo', icone: '🧩', url: 'tetris.html' },
        { titulo: 'Defenda a Torre', genero: 'estratégia', avaliacao: 4.8, jogadores: '210K', etiqueta: 'Top', icone: '♜', url : 'TowerDefense.html' },
         { titulo: 'Jogo Da Cobra', genero: 'Plataforma', avaliacao: 4.7, jogadores: '95K', etiqueta: 'Trending', icone: '🐍', url: 'snake.html' },
         { titulo: 'Void Walker', genero: 'Aventura', avaliacao: 4.6, jogadores: '76K', etiqueta: '', icone: '♟️', url : 'shadow.html' },
       
    ];

    const categorias = [
        { icone: '🧩', nome: 'Puzzle', contagem: '1 jogo', },
        { icone: '⚔️', nome: 'Estratégia', contagem: '1 jogo' },
        { icone: '👾', nome: 'Retro', contagem: '3 jogos' }
    ];

function criarCartaoJogo(jogo) {
    const cartao = document.createElement('div');
    cartao.className = 'cartao-jogo';
    cartao.style.cursor = jogo.url ? 'pointer' : 'default';

    if (jogo.url) {
        const linkJogo = document.createElement('a');
        linkJogo.href = jogo.url + `?titulo=${encodeURIComponent(jogo.titulo)}&genero=${encodeURIComponent(jogo.genero)}&avaliacao=${jogo.avaliacao}&jogadores=${jogo.jogadores}&icone=${encodeURIComponent(jogo.icone)}`;
        linkJogo.style.textDecoration = 'none';
        linkJogo.style.color = 'inherit';
        linkJogo.style.display = 'block';
        linkJogo.innerHTML = conteudoCartao(jogo);
        cartao.appendChild(linkJogo);
    } else {
        cartao.innerHTML = conteudoCartao(jogo);
    }

    return cartao;
}

function conteudoCartao(jogo) {
    return `
        <div class="imagem-cartao">
            <div class="fundo-imagem">${jogo.icone}</div>
            ${jogo.etiqueta ? `<span class="etiqueta-cartao">${jogo.etiqueta}</span>` : ''}
        </div>
        <div class="corpo-cartao">
            <div class="titulo-jogo">${jogo.titulo}</div>
            <div class="genero-jogo">${jogo.genero}</div>
            <div class="meta-jogo">
                <span class="avaliacao">⭐ ${jogo.avaliacao}</span>
                <span>👥 ${jogo.jogadores}</span>
            </div>
        </div>
    `;
}
    function popularSlider(idFaixa, idPontos, jogos, idSlider) {
        const faixa = document.getElementById(idFaixa);
        const pontosContainer = document.getElementById(idPontos);
        faixa.innerHTML = '';
        pontosContainer.innerHTML = '';

        jogos.forEach((jogo, indice) => {
            const cartao = criarCartaoJogo(jogo);
            cartao.setAttribute('data-indice', indice);
            faixa.appendChild(cartao);
        });

        const slider = document.getElementById(idSlider);
        atualizarPontos(faixa, pontosContainer, slider);

        window.addEventListener('resize', () => {
            atualizarPontos(faixa, pontosContainer, slider);
        });

        faixa.addEventListener('scroll', () => {
            atualizarPontoAtivo(faixa, pontosContainer, slider);
        });
    }

    function obterCartoesPorVista(faixa, slider) {
        const cartao = faixa.querySelector('.cartao-jogo');
        if (!cartao) return 1;
        const larguraCartao = cartao.offsetWidth;
        const espaco = parseInt(getComputedStyle(faixa).gap) || 16;
        const larguraContainer = slider.querySelector('.area-slider').offsetWidth;
        return Math.max(1, Math.floor(larguraContainer / (larguraCartao + espaco)));
    }

    function atualizarPontos(faixa, pontosContainer, slider) {
        const cartoesPorVista = obterCartoesPorVista(faixa, slider);
        const totalCartoes = faixa.querySelectorAll('.cartao-jogo').length;
        const totalPontos = Math.max(1, totalCartoes - cartoesPorVista + 1);
        pontosContainer.innerHTML = '';
        for (let i = 0; i < totalPontos; i++) {
            const ponto = document.createElement('button');
            ponto.className = 'ponto';
            ponto.setAttribute('aria-label', `Página ${i + 1}`);
            ponto.addEventListener('click', () => {
                const cartao = faixa.querySelector('.cartao-jogo');
                if (!cartao) return;
                const largura = cartao.offsetWidth;
                const espaco = parseInt(getComputedStyle(faixa).gap) || 16;
                faixa.scrollTo({
                    left: i * (largura + espaco),
                    behavior: 'smooth'
                });
            });
            pontosContainer.appendChild(ponto);
        }
        atualizarPontoAtivo(faixa, pontosContainer, slider);
    }

    function atualizarPontoAtivo(faixa, pontosContainer, slider) {
        const cartao = faixa.querySelector('.cartao-jogo');
        if (!cartao) return;
        const largura = cartao.offsetWidth;
        const espaco = parseInt(getComputedStyle(faixa).gap) || 16;
        const scrollEsquerda = faixa.scrollLeft;
        const paginaAtual = Math.round(scrollEsquerda / (largura + espaco));
        const pontos = pontosContainer.querySelectorAll('.ponto');
        pontos.forEach((ponto, i) => {
            ponto.classList.toggle('ativo', i === paginaAtual);
        });
    }

    function configurarBotoesSlider(idSlider, idFaixa, idPontos) {
        const slider = document.getElementById(idSlider);
        const faixa = document.getElementById(idFaixa);
        const btnAnterior = slider.querySelector('.botao-slider.anterior');
        const btnProximo = slider.querySelector('.botao-slider.proximo');
        const pontosContainer = document.getElementById(idPontos);

        function valorScroll() {
            const cartao = faixa.querySelector('.cartao-jogo');
            if (!cartao) return 300;
            return cartao.offsetWidth + (parseInt(getComputedStyle(faixa).gap) || 16);
        }

        function atualizarBotoes() {
            const maxScroll = faixa.scrollWidth - faixa.clientWidth;
            if (btnAnterior) btnAnterior.disabled = faixa.scrollLeft <= 5;
            if (btnProximo) btnProximo.disabled = faixa.scrollLeft >= maxScroll - 5;
            atualizarPontoAtivo(faixa, pontosContainer, slider);
        }

        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => {
                faixa.scrollBy({ left: -valorScroll(), behavior: 'smooth' });
            });
        }
        if (btnProximo) {
            btnProximo.addEventListener('click', () => {
                faixa.scrollBy({ left: valorScroll(), behavior: 'smooth' });
            });
        }

        faixa.addEventListener('scroll', atualizarBotoes);
        window.addEventListener('resize', atualizarBotoes);
        setTimeout(atualizarBotoes, 300);
    }

    function habilitarArrasto(faixa) {
        let pressionado = false;
        let inicioX, scrollInicial;

        faixa.addEventListener('mousedown', (e) => {
            pressionado = true;
            faixa.classList.add('arrastando');
            inicioX = e.pageX - faixa.offsetLeft;
            scrollInicial = faixa.scrollLeft;
        });
        faixa.addEventListener('mouseleave', () => {
            pressionado = false;
            faixa.classList.remove('arrastando');
        });
        faixa.addEventListener('mouseup', () => {
            pressionado = false;
            faixa.classList.remove('arrastando');
        });
        faixa.addEventListener('mousemove', (e) => {
            if (!pressionado) return;
            e.preventDefault();
            const x = e.pageX - faixa.offsetLeft;
            const deslocamento = (x - inicioX) * 1.8;
            faixa.scrollLeft = scrollInicial - deslocamento;
        });
    }

    popularSlider('faixaDestaques', 'pontosDestaques', jogosDestaque, 'sliderDestaques');
    popularSlider('faixaPopulares', 'pontosPopulares', jogosPopulares, 'sliderPopulares');

    configurarBotoesSlider('sliderDestaques', 'faixaDestaques', 'pontosDestaques');
    configurarBotoesSlider('sliderPopulares', 'faixaPopulares', 'pontosPopulares');

    document.querySelectorAll('.faixa-slider').forEach(faixa => habilitarArrasto(faixa));

    const gradeCategorias = document.getElementById('gradeCategorias');
    categorias.forEach(cat => {
        const cartao = document.createElement('a');
        cartao.className = 'cartao-categoria';
        cartao.href = '#';
        cartao.innerHTML = `
            <span class="icone-categoria">${cat.icone}</span>
            <div class="nome-categoria">${cat.nome}</div>
            <div class="contagem-categoria">${cat.contagem}</div>
        `;
        gradeCategorias.appendChild(cartao);
    });

    const barraNavegacao = document.getElementById('barraNavegacao');
    window.addEventListener('scroll', () => {
        barraNavegacao.classList.toggle('rolada', window.scrollY > 30);
    });

    const botaoMenu = document.getElementById('botaoMenu');
    const linksNavegacao = document.getElementById('linksNavegacao');
    botaoMenu.addEventListener('click', () => {
        linksNavegacao.classList.toggle('aberto');
    });
    linksNavegacao.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            linksNavegacao.classList.remove('aberto');
        });
    });
    document.addEventListener('click', (e) => {
        if (!barraNavegacao.contains(e.target)) {
            linksNavegacao.classList.remove('aberto');
        }
    });

    setTimeout(() => {
        document.querySelectorAll('.envoltorio-slider').forEach(slider => {
            const faixa = slider.querySelector('.faixa-slider');
            const pontos = slider.querySelector('.pontos-slider');
            if (faixa && pontos) {
                atualizarPontos(faixa, pontos, slider);
            }
        });
    }, 400);
})();