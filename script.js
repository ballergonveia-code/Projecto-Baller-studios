// script.js
(function() {
    // Dados dos jogos - total 20 (10 destaques, 10 populares)
    const jogosDestaque = [
        { titulo: 'Shadow Realm', genero: 'RPG de Ação', avaliacao: 4.9, jogadores: '128K', etiqueta: 'Novo', icone: '🌑' },
        { titulo: 'Neon Abyss', genero: 'Plataforma', avaliacao: 4.7, jogadores: '95K', etiqueta: 'Trending', icone: '💜' },
        { titulo: 'Cyber Strike', genero: 'FPS Tático', avaliacao: 4.8, jogadores: '210K', etiqueta: 'Top', icone: '🎯' },
        { titulo: 'Void Walker', genero: 'Aventura', avaliacao: 4.6, jogadores: '76K', etiqueta: '', icone: '🚶' },
        { titulo: 'Phantom Core', genero: 'Estratégia', avaliacao: 4.9, jogadores: '154K', etiqueta: 'Premium', icone: '👻' },
        { titulo: 'Dark Matter', genero: 'Sci-Fi RPG', avaliacao: 4.5, jogadores: '62K', etiqueta: '', icone: '🕳️' },
        { titulo: 'Eclipse Arena', genero: 'MOBA', avaliacao: 4.8, jogadores: '340K', etiqueta: 'PvP', icone: '🌘' },
        { titulo: 'Nexus Runners', genero: 'Corrida', avaliacao: 4.4, jogadores: '88K', etiqueta: 'Novo', icone: '🏃' },
        { titulo: 'Abyssal Depths', genero: 'Survival', avaliacao: 4.8, jogadores: '145K', etiqueta: 'Difícil', icone: '🌊' },
        { titulo: 'Starfall Legacy', genero: 'RPG Espacial', avaliacao: 4.9, jogadores: '278K', etiqueta: 'Épico', icone: '⭐' }
    ];

    const jogosPopulares = [
        { titulo: 'Spectral Ops', genero: 'Furtivo', avaliacao: 4.7, jogadores: '190K', etiqueta: 'Top 10', icone: '🔫' },
        { titulo: 'Quantum Break', genero: 'Puzzle', avaliacao: 4.6, jogadores: '55K', etiqueta: '', icone: '⚛️' },
        { titulo: 'Iron Dominion', genero: 'RTS', avaliacao: 4.3, jogadores: '41K', etiqueta: '', icone: '⚔️' },
        { titulo: 'Warp Zone', genero: 'Arcade', avaliacao: 4.5, jogadores: '112K', etiqueta: 'Clássico', icone: '🌀' },
        { titulo: 'Crystal Raiders', genero: 'Aventura', avaliacao: 4.7, jogadores: '167K', etiqueta: 'Co-op', icone: '💎' },
        { titulo: 'Thunder Blitz', genero: 'Corrida', avaliacao: 4.2, jogadores: '33K', etiqueta: '', icone: '⚡' },
        { titulo: 'Frostpunk 2', genero: 'Estratégia', avaliacao: 4.8, jogadores: '203K', etiqueta: 'Novo', icone: '❄️' },
        { titulo: 'Inferno Run', genero: 'Plataforma', avaliacao: 4.4, jogadores: '71K', etiqueta: '', icone: '🔥' },
        { titulo: 'Astro Quest', genero: 'Aventura', avaliacao: 4.6, jogadores: '99K', etiqueta: 'Indie', icone: '🚀' },
        { titulo: 'Rift Breaker', genero: 'RPG', avaliacao: 4.5, jogadores: '120K', etiqueta: 'Single', icone: '🌌' }
    ];

    const categorias = [
        { icone: '🎮', nome: 'Ação', contagem: '48 jogos' },
        { icone: '🧙', nome: 'RPG', contagem: '36 jogos' },
        { icone: '🎯', nome: 'FPS', contagem: '29 jogos' },
        { icone: '🧩', nome: 'Puzzle', contagem: '22 jogos' },
        { icone: '🏎️', nome: 'Corrida', contagem: '18 jogos' },
        { icone: '⚔️', nome: 'Estratégia', contagem: '31 jogos' },
        { icone: '🌍', nome: 'Mundo Aberto', contagem: '15 jogos' },
        { icone: '👾', nome: 'Retro', contagem: '40 jogos' }
    ];

    // Função para criar um cartão de jogo
    function criarCartaoJogo(jogo) {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-jogo';
        cartao.innerHTML = `
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
        return cartao;
    }

    // Popular um slider
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

    // Configurar botões de navegação do slider
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

    // Habilitar arrasto com mouse
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

    // Popular sliders
    popularSlider('faixaDestaques', 'pontosDestaques', jogosDestaque, 'sliderDestaques');
    popularSlider('faixaPopulares', 'pontosPopulares', jogosPopulares, 'sliderPopulares');

    configurarBotoesSlider('sliderDestaques', 'faixaDestaques', 'pontosDestaques');
    configurarBotoesSlider('sliderPopulares', 'faixaPopulares', 'pontosPopulares');

    document.querySelectorAll('.faixa-slider').forEach(faixa => habilitarArrasto(faixa));

    // Categorias
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

    // Efeito de rolagem na barra de navegação
    const barraNavegacao = document.getElementById('barraNavegacao');
    window.addEventListener('scroll', () => {
        barraNavegacao.classList.toggle('rolada', window.scrollY > 30);
    });

    // Menu mobile
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

    // Ajuste inicial dos pontos
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