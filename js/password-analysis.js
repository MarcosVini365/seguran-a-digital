const COLORS = ['var(--strength-0)','var(--strength-1)','var(--strength-2)','var(--strength-3)','var(--teal)','var(--accent-bright)'];
const LABELS = ['Aguardando...','Muito fraca','Fraca','Razoável','Forte','Muito forte'];
const SCLASSES = ['s0','s1','s2','s3','s4','s5'];

function calcCharset(pwd) {
  let cs = 0;
  if (/[a-z]/.test(pwd)) cs += 26;
  if (/[A-Z]/.test(pwd)) cs += 26;
  if (/[0-9]/.test(pwd)) cs += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) cs += 32;
  return cs;
}

function calcEntropy(pwd) {
  const cs = calcCharset(pwd);
  if (!cs || !pwd.length) return 0;
  return Math.round(pwd.length * Math.log2(cs));
}

function calcStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  return Math.min(5, Math.max(1, Math.round(score * 5/6)));
}

function estimateCrackTime(entropy) {
  if (entropy === 0) return '—';
  const guesses = Math.pow(2, entropy);
  const secs = guesses / 1e10;
  if (secs < 1)       return 'Menos de 1 segundo';
  if (secs < 60)      return `${Math.round(secs)} segundos`;
  if (secs < 3600)    return `${Math.round(secs/60)} minutos`;
  if (secs < 86400)   return `${Math.round(secs/3600)} horas`;
  if (secs < 2592000) return `${Math.round(secs/86400)} dias`;
  if (secs < 31536000)return `${Math.round(secs/2592000)} meses`;
  const years = secs/31536000;
  if (years < 1e6)    return `${Math.round(years).toLocaleString('pt-BR')} anos`;
  if (years < 1e9)    return `${(years/1e6).toFixed(1)} milhões de anos`;
  if (years < 1e12)   return `${(years/1e9).toFixed(1)} bilhões de anos`;
  return 'Virtualmente inquebrável';
}

function checkCriteria(pwd) {
  return {
    length:  pwd.length >= 8,
    upper:   /[A-Z]/.test(pwd),
    lower:   /[a-z]/.test(pwd),
    number:  /[0-9]/.test(pwd),
    special: /[^a-zA-Z0-9]/.test(pwd),
    long:    pwd.length >= 12,
  };
}

const pwdInput    = document.getElementById('pwdInput');
const strengthText= document.getElementById('strengthText');
const strengthPct = document.getElementById('strengthPct');
const barsEl      = document.getElementById('strengthBars');
const crackTimeEl = document.getElementById('crackTime');
const entropyEl   = document.getElementById('entropyVal');
const charsetEl   = document.getElementById('charsetVal');
const lengthEl    = document.getElementById('lengthVal');

function updateUI(pwd) {
  const strength = calcStrength(pwd);
  const entropy  = calcEntropy(pwd);
  const cs       = calcCharset(pwd);

  const bars = barsEl.querySelectorAll('.bar-seg');
  bars.forEach((b, i) => {
    b.style.background = i < strength ? COLORS[strength] : 'var(--strength-0)';
    b.style.opacity    = i < strength ? '1' : '0.35';
  });

  strengthText.textContent = pwd ? LABELS[strength] : LABELS[0];
  strengthText.className   = 'strength-text ' + SCLASSES[pwd ? strength : 0];
  strengthPct.textContent  = pwd ? Math.round(strength * 20) + '%' : '0%';

  crackTimeEl.textContent = estimateCrackTime(entropy);
  entropyEl.textContent   = entropy;
  charsetEl.textContent   = cs;
  lengthEl.textContent    = pwd.length;

  const crit = checkCriteria(pwd);
  document.querySelectorAll('.criteria-item').forEach(el => {
    const key = el.dataset.crit;
    const pass = crit[key];
    el.classList.toggle('passed', pass);
    const ico = el.querySelector('.ci-icon');
    ico.innerHTML = pass ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-circle"></i>';
  });
}

pwdInput.addEventListener('input', e => updateUI(e.target.value));

const toggleEye = document.getElementById('toggleEye');
const eyeIcon   = document.getElementById('eyeIcon');
toggleEye.addEventListener('click', () => {
  const isPass = pwdInput.type === 'password';
  pwdInput.type = isPass ? 'text' : 'password';
  eyeIcon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
});

updateUI('');
