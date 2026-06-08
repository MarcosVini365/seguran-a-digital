// Informeções geradas por AI

const TIPS = [
  {
    icon: '🔐', title: 'Use senhas únicas',
    body: 'Nunca reutilize a mesma senha em serviços diferentes. Se uma conta for comprometida, as demais permanecem seguras.'
  },
  {
    icon: '🧩', title: 'Frases como senha',
    body: 'Uma frase longa e aleatória é mais segura do que uma palavra curta com símbolos. Ex: "cavalo#Azul!pular99".'
  },
  {
    icon: '🔒', title: 'Gerenciador de senhas',
    body: 'Ferramentas como Bitwarden, 1Password ou KeePass geram e armazenam senhas fortes com segurança.'
  },
  {
    icon: '📲', title: 'Autenticação em dois fatores',
    body: 'Ative 2FA sempre que possível. Mesmo que sua senha vaze, um segundo fator bloqueia o acesso não autorizado.'
  },
  {
    icon: '🚫', title: 'Evite dados pessoais',
    body: 'Datas de nascimento, nomes e CPF são facilmente descobertos. Nunca use essas informações em senhas.'
  },
  {
    icon: '🔄', title: 'Atualize regularmente',
    body: 'Troque senhas de contas críticas periodicamente, especialmente após notícias de vazamentos de dados.'
  },
  {
    icon: '📧', title: 'Cuidado com phishing',
    body: 'Desconfie de e-mails pedindo sua senha. Nenhum serviço legítimo solicita sua senha por e-mail ou SMS.'
  },
  {
    icon: '🛡️', title: 'Verifique vazamentos',
    body: 'Use o site haveibeenpwned.com para verificar se seu e-mail apareceu em algum vazamento de dados público.'
  },
];

const ROTATING_TIPS = [
  '💡 Quanto mais longa a senha, exponencialmente mais difícil de quebrar por força bruta.',
  '💡 Um gerenciador de senhas permite usar senhas únicas e complexas sem precisar memorizá-las.',
  '💡 O 2FA (autenticação de dois fatores) bloqueia 99% dos ataques automatizados de conta.',
  '💡 Senhas com mais de 16 caracteres mistos levam séculos para ser quebradas.',
  '💡 Evite padrões como "abc123", "senha2024" ou "qwerty" — são os primeiros testados em ataques.',
  '💡 Prefira aplicativos autenticadores (Google Authenticator, Aegis) ao SMS para 2FA.',
];

const tipsGrid = document.getElementById('tipsGrid');
TIPS.forEach((t, i) => {
  const delay = i * 0.07;
  tipsGrid.innerHTML += `
    <div class="col-sm-6 col-lg-3">
      <div class="tip-card" style="animation-delay:${delay}s">
        <div class="tip-num">0${i+1}</div>
        <span class="tip-icon">${t.icon}</span>
        <div class="tip-title">${t.title}</div>
        <p class="tip-body">${t.body}</p>
      </div>
    </div>`;
});

let rtIdx = 0;
const rtEl = document.getElementById('rotatingTip');

function rotateTip() {
  rtEl.classList.add('hidden');
  setTimeout(() => {
    rtIdx = (rtIdx + 1) % ROTATING_TIPS.length;
    rtEl.textContent = ROTATING_TIPS[rtIdx];
    rtEl.classList.remove('hidden');
  }, 420);
}
rtEl.textContent = ROTATING_TIPS[0];
setInterval(rotateTip, 4500);