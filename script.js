// Gamification Engine (XP, Levels, Badges, LocalStorage)
let gameState = {
    xp: 0,
    maxXp: 500,
    level: 1,
    badges: {
        m1: false,
        m2: false,
        m3: false,
        m4: false,
        m5: false
    }
};

function loadGamificationState() {
    const saved = localStorage.getItem('php_course_gamification');
    if (saved) {
        try {
            gameState = { ...gameState, ...JSON.parse(saved) };
        } catch (e) {
            console.error('Erro ao carregar progresso:', e);
        }
    }
    updateGamificationUI();
}

function saveGamificationState() {
    localStorage.setItem('php_course_gamification', JSON.stringify(gameState));
}

function claimBadge(moduleKey, badgeName, xpValue) {
    if (gameState.badges[moduleKey]) {
        showToast(`Você já conquistou a badge "${badgeName}"!`);
        return;
    }

    gameState.badges[moduleKey] = true;
    gameState.xp += xpValue;
    if (gameState.xp > gameState.maxXp) gameState.xp = gameState.maxXp;

    saveGamificationState();
    updateGamificationUI();
    showToast(`🏆 Conquista Desbloqueada: "${badgeName}"! (+${xpValue} XP)`);
}

function showToast(message) {
    const existing = document.querySelector('.toast-achievement');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-achievement';
    toast.innerHTML = `
        <i class="fa-solid fa-award" style="font-size:1.8rem; color:#10b981;"></i>
        <div>
            <h4 style="margin:0; font-size:0.95rem;">Nova Conquista!</h4>
            <p style="margin:0; font-size:0.85rem; color:var(--text-secondary);">${message}</p>
        </div>
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

function updateGamificationUI() {
    const xpText = document.getElementById('xp-text');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const levelBadge = document.getElementById('hero-level-badge');
    const heroTitleText = document.getElementById('hero-title-text');
    const badgesIconsContainer = document.getElementById('badges-icons-container');

    if (!xpText) return;

    // Calculate level based on XP
    if (gameState.xp >= 500) {
        gameState.level = 5;
        levelBadge.innerText = 'Nível 5: Arquiteto PHP';
        heroTitleText.innerText = 'Parabéns! Você dominou todos os segredos do PHP!';
    } else if (gameState.xp >= 350) {
        gameState.level = 4;
        levelBadge.innerText = 'Nível 4: Mestre do Backend';
        heroTitleText.innerText = 'Você já constrói sistemas seguros e consome APIs!';
    } else if (gameState.xp >= 200) {
        gameState.level = 3;
        levelBadge.innerText = 'Nível 3: Guardião de Dados';
        heroTitleText.innerText = 'Persistência em JSON dominada com sucesso!';
    } else if (gameState.xp >= 100) {
        gameState.level = 2;
        levelBadge.innerText = 'Nível 2: Inspecionador Web';
        heroTitleText.innerText = 'Entendendo servidores e variáveis superglobais.';
    } else {
        gameState.level = 1;
        levelBadge.innerText = 'Nível 1: Aprendiz';
        heroTitleText.innerText = 'Inicie sua saga no desenvolvimento web com PHP!';
    }

    const percentage = Math.min(100, Math.round((gameState.xp / gameState.maxXp) * 100));
    xpText.innerText = `${gameState.xp} / ${gameState.maxXp} XP`;
    xpBarFill.style.width = `${percentage}%`;

    // Update Badges icons in mini bar
    if (badgesIconsContainer) {
        const icons = badgesIconsContainer.querySelectorAll('.badge-icon');
        const badgeKeys = ['m1', 'm2', 'm3', 'm4', 'm5'];
        badgeKeys.forEach((key, index) => {
            if (icons[index]) {
                if (gameState.badges[key]) {
                    icons[index].classList.remove('locked');
                } else {
                    icons[index].classList.add('locked');
                }
            }
        });
    }
}

// Navigation and Theme Toggle logic
document.addEventListener('DOMContentLoaded', () => {
    loadGamificationState();
    // Navigation logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.module-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Toggle active state on buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show selected section
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.remove('hidden');
                    sec.classList.add('active');
                } else {
                    sec.classList.add('hidden');
                    sec.classList.remove('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);

        themeToggleBtn.innerHTML = newTheme === 'dark'
            ? '<i class="fa-solid fa-moon"></i> <span>Alternar Tema</span>'
            : '<i class="fa-solid fa-sun"></i> <span>Alternar Tema</span>';
    });
});

// Interactive Simulators Implementation
document.addEventListener('DOMContentLoaded', () => {

    // 1. Age Calculator Simulator
    const btnCalcularIdade = document.getElementById('btn-calcular-idade');
    const inputDataNasc = document.getElementById('sim-data-nasc');
    const outIdade = document.getElementById('out-idade');

    if (btnCalcularIdade) {
        btnCalcularIdade.addEventListener('click', () => {
            const val = inputDataNasc.value;
            if (!val) {
                outIdade.classList.remove('hidden');
                outIdade.innerHTML = '<span style="color:#ef4444;">Por favor, selecione uma data válida.</span>';
                return;
            }

            const nasc = new Date(val);
            const hoje = new Date();

            let anos = hoje.getFullYear() - nasc.getFullYear();
            let meses = hoje.getMonth() - nasc.getMonth();
            let dias = hoje.getDate() - nasc.getDate();

            if (dias < 0) {
                meses--;
                const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
                dias += ultimoDiaMesAnterior;
            }

            if (meses < 0) {
                anos--;
                meses += 12;
            }

            const anoFixo2026 = 2026 - nasc.getFullYear();

            outIdade.classList.remove('hidden');
            outIdade.innerHTML = `
                <p><strong>Resultados do Cálculo de Idade:</strong></p>
                <ul>
                    <li>1. Etapa Ano 2026: Em 2026 você terá/teve <strong>${anoFixo2026}</strong> anos.</li>
                    <li>2. Etapa Ano Atual (${hoje.getFullYear()}): Você faz ou fez <strong>${hoje.getFullYear() - nasc.getFullYear()}</strong> anos este ano.</li>
                    <li>3. Etapa Idade Exata Hoje: <strong>${anos} anos, ${meses} meses e ${dias} dias</strong>.</li>
                </ul>
            `;
        });
    }

    // 2. Zodiac Sign Simulator
    const btnDescobrirSigno = document.getElementById('btn-descobrir-signo');
    const simDiaSigno = document.getElementById('sim-dia-signo');
    const simMesSigno = document.getElementById('sim-mes-signo');
    const outSigno = document.getElementById('out-signo');

    if (btnDescobrirSigno) {
        btnDescobrirSigno.addEventListener('click', () => {
            const dia = parseInt(simDiaSigno.value);
            const mes = parseInt(simMesSigno.value);

            if (!dia || dia < 1 || dia > 31) {
                outSigno.classList.remove('hidden');
                outSigno.innerHTML = '<span style="color:#ef4444;">Digite um dia válido entre 1 e 31.</span>';
                return;
            }

            let signo = "";
            let simbolo = "";
            let desc = "";

            if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) { signo = "Áries"; simbolo = "♈"; desc = "Corajoso e entusiasmado."; }
            else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) { signo = "Touro"; simbolo = "♉"; desc = "Paciente e confiável."; }
            else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) { signo = "Gêmeos"; simbolo = "♊"; desc = "Versátil e comunicativo."; }
            else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) { signo = "Câncer"; simbolo = "♋"; desc = "Emotivo e protetor."; }
            else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) { signo = "Leão"; simbolo = "♌"; desc = "Generoso e criativo."; }
            else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) { signo = "Virgem"; simbolo = "♍"; desc = "Meticuloso e prático."; }
            else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) { signo = "Libras"; simbolo = "♎"; desc = "Diplomático e sociável."; }
            else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) { signo = "Escorpião"; simbolo = "♏"; desc = "Apaixonado e determinado."; }
            else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) { signo = "Sagitário"; simbolo = "♐"; desc = "Otimista e aventureiro."; }
            else if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) { signo = "Capricórnio"; simbolo = "♑"; desc = "Disciplinado e ambicioso."; }
            else if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) { signo = "Aquário"; simbolo = "♒"; desc = "Inovador e independente."; }
            else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) { signo = "Peixes"; simbolo = "♓"; desc = "Compassivo e intuitivo."; }

            outSigno.classList.remove('hidden');
            outSigno.innerHTML = `
                <h4>${simbolo} Signo: ${signo}</h4>
                <p><em>"${desc}"</em></p>
                <p style="font-size:0.85rem; margin-top:6px; color:var(--text-secondary);">Calculado para dia ${dia} do mês ${mes}.</p>
            `;
        });
    }

    // 3. Server Info Simulator
    const btnCarregarServer = document.getElementById('btn-carregar-server-info');
    const outServerInfo = document.getElementById('out-server-info');

    if (btnCarregarServer) {
        btnCarregarServer.addEventListener('click', () => {
            outServerInfo.classList.remove('hidden');
            outServerInfo.innerHTML = `
                <p><strong>Dados Simulados do Array $_SERVER e Navegador:</strong></p>
                <ul>
                    <li><code>$_SERVER['HTTP_USER_AGENT']</code>: ${navigator.userAgent}</li>
                    <li><code>$_SERVER['REMOTE_ADDR']</code>: 127.0.0.1 (Localhost / Sandbox)</li>
                    <li><code>$_SERVER['REQUEST_METHOD']</code>: GET</li>
                    <li><code>$_SERVER['HTTP_ACCEPT_LANGUAGE']</code>: ${navigator.language}</li>
                    <li><code>$_SERVER['SERVER_PROTOCOL']</code>: HTTP/1.1</li>
                </ul>
            `;
        });
    }

    // 4. Mini CRUD JSON Simulator
    const btnSalvarCrud = document.getElementById('btn-salvar-crud');
    const inputCrudNome = document.getElementById('sim-crud-nome');
    const selectCrudCat = document.getElementById('sim-crud-categoria');
    const outCrudLista = document.getElementById('out-crud-lista');

    let memoryJsonCrud = [
        { id: 101, titulo: "Estudar sintaxe do PHP", categoria: "Estudo" },
        { id: 102, titulo: "Criar formulário HTML", categoria: "Trabalho" }
    ];

    function renderCrud() {
        if (!outCrudLista) return;
        if (memoryJsonCrud.length === 0) {
            outCrudLista.innerHTML = '<p class="empty-msg">Nenhum registro encontrado no arquivo JSON.</p>';
            return;
        }

        outCrudLista.innerHTML = memoryJsonCrud.map(item => `
            <div class="crud-item">
                <div>
                    <strong>${item.titulo}</strong> <small style="color:var(--accent);">[${item.categoria}]</small>
                </div>
                <button class="crud-delete-btn" onclick="deletarCrudItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    }

    window.deletarCrudItem = function(id) {
        memoryJsonCrud = memoryJsonCrud.filter(item => item.id !== id);
        renderCrud();
    };

    if (btnSalvarCrud) {
        renderCrud();
        btnSalvarCrud.addEventListener('click', () => {
            const titulo = inputCrudNome.value.trim();
            const categoria = selectCrudCat.value;

            if (!titulo) return;

            memoryJsonCrud.push({
                id: Date.now(),
                titulo: titulo,
                categoria: categoria
            });

            inputCrudNome.value = '';
            renderCrud();
        });
    }

    // 5. Weather API Simulator
    const btnConsultarClima = document.getElementById('btn-consultar-clima');
    const selectCidade = document.getElementById('sim-cidade-select');
    const outClimaInfo = document.getElementById('out-clima-info');

    if (btnConsultarClima) {
        btnConsultarClima.addEventListener('click', async () => {
            const [lat, lon] = selectCidade.value.split(',');
            const cidadeNome = selectCidade.options[selectCidade.selectedIndex].text;

            outClimaInfo.classList.remove('hidden');
            outClimaInfo.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Consultando API REST da Open-Meteo...';

            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                const data = await response.json();
                const temp = data.current_weather.temperature;
                const wind = data.current_weather.windspeed;

                outClimaInfo.innerHTML = `
                    <h4><i class="fa-solid fa-location-dot"></i> ${cidadeNome}</h4>
                    <p>Temperatura Atual: <strong>${temp} °C</strong></p>
                    <p>Velocidade do Vento: <strong>${wind} km/h</strong></p>
                    <small style="color:var(--text-secondary);">Dados obtidos em tempo real via Fetch API (simulando file_get_contents do PHP).</small>
                `;
            } catch (err) {
                outClimaInfo.innerHTML = '<span style="color:#ef4444;">Erro ao consultar a API. Verifique a conexão.</span>';
            }
        });
    }
});

// Code Copy Function
function copyCode(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const textToCopy = codeBlock.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}
