// ================================================================
//  TOWER DEFENSE PIXEL ART - JOGO COMPLETO
// ================================================================

// --------------------- CONFIGURAÇÕES ---------------------------
const CONFIG = {
  canvasWidth: 900,
  canvasHeight: 600,
  castleX: 780,
  castleY: 250,
  castleRadius: 30,
  pathPoints: [
    { x: 0, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 400 },
    { x: 500, y: 400 }, { x: 500, y: 200 }, { x: 700, y: 200 },
    { x: 700, y: 450 }, { x: 780, y: 450 }
  ],
  maxLevels: 20,
  tileSize: 32,
};

// --------------------- SPRITES PIXEL ART -----------------------
// Cada sprite é uma matriz 8x8 (ou maior) com índices de paleta.
// Paleta 0 = transparente.

const PALETTE = {
  0: 'transparent',
  1: '#8B7355', // marrom (corpo)
  2: '#F5DEB3', // pele
  3: '#4A4A4A', // escuro
  4: '#C4A882', // bege
  5: '#6B4F3A', // marrom escuro
  6: '#D4A373', // marrom claro
  7: '#A67B5B', // médio
  8: '#2E2E2E', // preto
  9: '#B22222', // vermelho
  10: '#DAA520', // dourado
  11: '#4682B4', // azul
  12: '#8FBC8F', // verde claro
  13: '#556B2F', // verde escuro
  14: '#FFD700', // amarelo
  15: '#FF6347', // laranja
  16: '#9370DB', // roxo
};

// ---- Soldado (8x8) ----
const SPRITE_SOLDIER = [
  [0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,0],
  [0,1,2,1,1,2,1,0],
  [0,1,1,1,1,1,1,0],
  [0,0,1,3,3,1,0,0],
  [0,0,1,3,3,1,0,0],
  [0,0,0,1,1,0,0,0]
];

// ---- Arqueiro (8x8) ----
const SPRITE_ARCHER = [
  [0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,0],
  [0,1,1,2,2,1,1,0],
  [0,1,2,1,1,2,1,0],
  [0,1,1,4,4,1,1,0],
  [0,0,1,3,3,1,0,0],
  [0,0,0,1,1,0,0,0],
  [0,0,0,1,0,0,0,0] // flecha
];

// ---- Esqueleto (inimigo) (8x8) ----
const SPRITE_SKELETON = [
  [0,0,0,5,5,0,0,0],
  [0,0,5,5,5,5,0,0],
  [0,5,5,5,5,5,5,0],
  [0,5,6,5,5,6,5,0],
  [0,5,5,5,5,5,5,0],
  [0,0,5,7,7,5,0,0],
  [0,0,5,7,7,5,0,0],
  [0,0,0,5,5,0,0,0]
];

// ---- Goblin (8x8) ----
const SPRITE_GOBLIN = [
  [0,0,0,9,9,0,0,0],
  [0,0,9,9,9,9,0,0],
  [0,9,9,2,2,9,9,0],
  [0,9,2,9,9,2,9,0],
  [0,9,9,9,9,9,9,0],
  [0,0,9,3,3,9,0,0],
  [0,0,9,3,3,9,0,0],
  [0,0,0,9,9,0,0,0]
];

// ---- Zombie (8x8) ----
const SPRITE_ZOMBIE = [
  [0,0,0,12,12,0,0,0],
  [0,0,12,12,12,12,0,0],
  [0,12,12,2,2,12,12,0],
  [0,12,2,12,12,2,12,0],
  [0,12,12,12,12,12,12,0],
  [0,0,12,3,3,12,0,0],
  [0,0,12,3,3,12,0,0],
  [0,0,0,12,12,0,0,0]
];

// ---- Cavaleiro (8x8) ----
const SPRITE_KNIGHT = [
  [0,0,0,10,10,0,0,0],
  [0,0,10,10,10,10,0,0],
  [0,10,10,1,1,10,10,0],
  [0,10,1,10,10,1,10,0],
  [0,10,10,10,10,10,10,0],
  [0,0,10,3,3,10,0,0],
  [0,0,10,3,3,10,0,0],
  [0,0,0,10,10,0,0,0]
];

// ---- Mago (8x8) ----
const SPRITE_MAGE = [
  [0,0,0,16,16,0,0,0],
  [0,0,16,16,16,16,0,0],
  [0,16,16,2,2,16,16,0],
  [0,16,2,16,16,2,16,0],
  [0,16,16,16,16,16,16,0],
  [0,0,16,3,3,16,0,0],
  [0,0,16,3,3,16,0,0],
  [0,0,0,16,16,0,0,0]
];

// ---- Gigante (10x10) ----
const SPRITE_GIANT = [
  [0,0,0,9,9,9,9,0,0,0],
  [0,0,9,9,9,9,9,9,0,0],
  [0,9,9,1,1,1,1,9,9,0],
  [0,9,1,9,9,9,9,1,9,0],
  [0,9,9,9,9,9,9,9,9,0],
  [0,9,9,9,9,9,9,9,9,0],
  [0,0,9,3,3,3,3,9,0,0],
  [0,0,9,3,3,3,3,9,0,0],
  [0,0,0,9,9,9,9,0,0,0],
  [0,0,0,9,0,0,9,0,0,0]
];

// ---- Mapa de sprites por tipo ----
const SPRITE_MAP = {
  soldier: SPRITE_SOLDIER,
  archer: SPRITE_ARCHER,
  swordsman: SPRITE_KNIGHT, // reutiliza cavaleiro
  knight: SPRITE_KNIGHT,
  mage: SPRITE_MAGE,
  giant: SPRITE_GIANT,
  skeleton: SPRITE_SKELETON,
  goblin: SPRITE_GOBLIN,
  zombie: SPRITE_ZOMBIE,
  // para outros, usaremos fallback
};

// ---- Desenha um sprite na tela ----
function drawSprite(ctx, sprite, x, y, scale = 3, palette = PALETTE) {
  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      const idx = sprite[row][col];
      const color = palette[idx] || palette[0];
      if (color && color !== 'transparent') {
        ctx.fillStyle = color;
        ctx.fillRect(
          Math.round(x + col * scale),
          Math.round(y + row * scale),
          scale, scale
        );
      }
    }
  }
}

// --------------------- ESTADO GLOBAL ---------------------------
const state = {
  gold: 100,
  score: 0,
  highScore: parseInt(localStorage.getItem('td_highScore')) || 0,
  level: 1,
  wave: 0,
  castleHp: 100,
  castleMaxHp: 100,
  castleDefense: 0,
  castleRegen: 0,
  castleArchers: 0,
  castleAttackCooldown: 0,
  units: [],
  enemies: [],
  projectiles: [],
  miners: 0,
  minerTimer: 0,
  waveInProgress: false,
  waveTotalEnemies: 0,
  enemiesSpawnedCount: 0,
  spawnTimer: 0,
  spawnInterval: 1.2,
  upgrades: { castleHp:0, castleDef:0, regen:0, archers:0 },
  unlockedUnits: {
    miner:1, soldier:1, archer:2, swordsman:4, knight:7, mage:10, giant:15
  },
  paused: false,
  gameOver: false,
  victory: false,
  gameTime: 0,
  lastTimestamp: 0,
  bossActive: false,
  bossDefeated: false,
};

// --------------------- DOM ELEMENTOS ---------------------------
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = CONFIG.canvasWidth;
canvas.height = CONFIG.canvasHeight;

const goldDisplay = document.getElementById('goldDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const castleHpDisplay = document.getElementById('castleHpDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const waveDisplay = document.getElementById('waveDisplay');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const overlayBtn = document.getElementById('overlayBtn');

// --------------------- AUXILIARES ------------------------------
function random(min, max) { return Math.random() * (max - min) + min; }
function randomInt(min, max) { return Math.floor(random(min, max + 1)); }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// --------------------- SALVAMENTO ------------------------------
function saveGame() {
  const data = {
    highScore: state.highScore, level: state.level,
    upgrades: state.upgrades, gold: state.gold, score: state.score
  };
  localStorage.setItem('td_save', JSON.stringify(data));
  localStorage.setItem('td_highScore', state.highScore.toString());
}
function loadGame() {
  const raw = localStorage.getItem('td_save');
  if (raw) {
    try {
      const data = JSON.parse(raw);
      state.highScore = data.highScore || 0;
      state.level = data.level || 1;
      state.upgrades = data.upgrades || { castleHp:0, castleDef:0, regen:0, archers:0 };
      state.gold = data.gold || 100;
      state.score = data.score || 0;
    } catch(e) { console.warn('Save corrompido'); }
  }
  highScoreDisplay.textContent = state.highScore;
  applyUpgrades();
}
function applyUpgrades() {
  state.castleMaxHp = 100 + state.upgrades.castleHp * 20;
  state.castleDefense = state.upgrades.castleDef * 2;
  state.castleRegen = state.upgrades.regen * 0.5;
  state.castleArchers = state.upgrades.archers;
  state.castleHp = Math.min(state.castleHp, state.castleMaxHp);
  updateUI();
}

// --------------------- INIMIGOS E ONDAS ------------------------
function generateWave(level, wave) {
  const enemies = [];
  const count = Math.min(3 + level + wave * 2, 25);
  let available = ['skeleton','goblin'];
  if (level >= 2) available.push('zombie');
  if (level >= 3) available.push('soldier');
  if (level >= 4) available.push('archer');
  if (level >= 5) available.push('witch');
  if (level >= 6) available.push('knight');
  if (level === 20 && wave === 5) return { boss: true };
  for (let i = 0; i < count; i++) {
    const type = available[randomInt(0, available.length-1)];
    enemies.push(createEnemy(type, level));
  }
  return { enemies };
}

function createEnemy(type, level) {
  const base = {
    skeleton: { hp:20, speed:70, damage:5, reward:5, radius:12, color:'#aaa' },
    goblin: { hp:35, speed:55, damage:8, reward:8, radius:14, color:'#6a8' },
    zombie: { hp:60, speed:35, damage:12, reward:10, radius:16, color:'#585' },
    witch: { hp:40, speed:45, damage:18, reward:15, radius:15, color:'#a4f' },
    soldier: { hp:50, speed:50, damage:10, reward:12, radius:15, color:'#c66' },
    archer: { hp:30, speed:40, damage:15, reward:14, radius:13, color:'#6cf' },
    knight: { hp:90, speed:40, damage:20, reward:20, radius:18, color:'#fc6' },
  };
  const b = base[type] || base.skeleton;
  const hpMult = 1 + (level-1)*0.10;
  const dmgMult = 1 + (level-1)*0.05;
  const spdMult = 1 + (level-1)*0.03;
  return {
    type, x: -20, y: CONFIG.pathPoints[0].y + random(-10,10),
    hp: Math.floor(b.hp * hpMult), maxHp: Math.floor(b.hp * hpMult),
    speed: b.speed * spdMult, damage: Math.floor(b.damage * dmgMult),
    reward: b.reward + Math.floor(level/2), radius: b.radius,
    color: b.color, pathIndex: 0, attackCooldown: 0, attackSpeed:1.2,
    isBoss: false, flying: false,
  };
}

function createBoss(level) {
  return {
    type: 'boss', x: -80, y: CONFIG.pathPoints[0].y - 30,
    hp: 2000 + level*100, maxHp: 2000 + level*100,
    speed: 20, damage: 50, reward: 500, radius: 50,
    color: '#f44', pathIndex: 0, attackCooldown:0,
    attackSpeed:2.0, isBoss: true,
  };
}

// --------------------- UNIDADES DO JOGADOR ---------------------
const UNIT_TYPES = {
  miner: { hp:20, attack:0, range:0, cost:30, speed:0, damage:0, color:'#ffa', label:'Mineiro', sprite:null },
  soldier: { hp:40, attack:8, range:35, cost:20, speed:30, damage:8, color:'#8af', label:'Soldado', sprite:SPRITE_SOLDIER },
  archer: { hp:25, attack:12, range:120, cost:35, speed:20, damage:12, color:'#6cf', label:'Arqueiro', sprite:SPRITE_ARCHER },
  swordsman:{ hp:60, attack:15, range:40, cost:50, speed:25, damage:15, color:'#fa8', label:'Espadachim', sprite:SPRITE_KNIGHT },
  knight: { hp:100, attack:20, range:38, cost:80, speed:28, damage:20, color:'#fc6', label:'Cavaleiro', sprite:SPRITE_KNIGHT },
  mage: { hp:35, attack:25, range:130, cost:100, speed:15, damage:25, color:'#c6f', label:'Mago', sprite:SPRITE_MAGE },
  giant: { hp:200, attack:40, range:45, cost:200, speed:22, damage:40, color:'#f66', label:'Gigante', sprite:SPRITE_GIANT },
};

function createUnit(type, x, y) {
  const t = UNIT_TYPES[type];
  if (!t) return null;
  return {
    type, x, y, hp: t.hp, maxHp: t.hp, attack: t.attack,
    range: t.range, cost: t.cost, speed: t.speed, damage: t.damage,
    color: t.color, cooldown:0, attackSpeed:1.0,
    target: null, isMiner: type==='miner', sprite: t.sprite,
  };
}

// --------------------- COMBATE --------------------------------
function updateUnits(dt) {
  for (const unit of state.units) {
    if (unit.isMiner) continue;
    if (unit.cooldown > 0) unit.cooldown -= dt;
    let closest = null, closestDist = Infinity;
    for (const enemy of state.enemies) {
      const d = dist(unit, enemy);
      if (d < unit.range && d < closestDist) { closest = enemy; closestDist = d; }
    }
    unit.target = closest;
    if (unit.target) {
      if (unit.cooldown <= 0) {
        unit.target.hp -= unit.damage;
        createProjectile(unit.x, unit.y, unit.target.x, unit.target.y, unit.color);
        unit.cooldown = unit.attackSpeed;
        if (unit.target.hp <= 0) {
          const idx = state.enemies.indexOf(unit.target);
          if (idx !== -1) {
            state.gold += unit.target.reward || 5;
            state.score += unit.target.reward || 5;
            state.enemies.splice(idx, 1);
            updateUI();
          }
          unit.target = null;
        }
      }
    }
  }
}

function createProjectile(fromX, fromY, toX, toY, color) {
  state.projectiles.push({ x:fromX, y:fromY, targetX:toX, targetY:toY, life:0.3, color:color||'#ff0' });
}
function updateProjectiles(dt) {
  for (let i=state.projectiles.length-1; i>=0; i--) {
    state.projectiles[i].life -= dt;
    if (state.projectiles[i].life <= 0) state.projectiles.splice(i,1);
  }
}

// --------------------- CASTELO --------------------------------
function updateCastle(dt) {
  if (state.castleHp < state.castleMaxHp && state.castleRegen > 0) {
    state.castleHp = Math.min(state.castleMaxHp, state.castleHp + state.castleRegen * dt);
  }
  if (state.castleArchers > 0 && state.enemies.length > 0) {
    state.castleAttackCooldown -= dt;
    if (state.castleAttackCooldown <= 0) {
      let target = null, minDist = Infinity;
      for (const enemy of state.enemies) {
        const d = dist({x:CONFIG.castleX, y:CONFIG.castleY}, enemy);
        if (d < 300 && d < minDist) { minDist = d; target = enemy; }
      }
      if (target) {
        target.hp -= state.castleArchers * 2;
        if (target.hp <= 0) {
          const idx = state.enemies.indexOf(target);
          if (idx !== -1) {
            state.gold += target.reward || 5;
            state.score += target.reward || 5;
            state.enemies.splice(idx,1);
            updateUI();
          }
        }
        state.castleAttackCooldown = 1.0;
        createProjectile(CONFIG.castleX, CONFIG.castleY, target.x, target.y, '#ffd700');
      }
    }
  }
}

// --------------------- INIMIGOS MOVIMENTO ----------------------
function updateEnemies(dt) {
  for (let i=state.enemies.length-1; i>=0; i--) {
    const enemy = state.enemies[i];
    const targetPoint = CONFIG.pathPoints[enemy.pathIndex];
    if (!targetPoint) {
      const damage = enemy.damage || 10;
      const mitigated = Math.max(1, damage - state.castleDefense);
      state.castleHp -= mitigated;
      state.enemies.splice(i,1);
      if (state.castleHp <= 0) { state.castleHp=0; gameOver('O castelo foi destruído!'); }
      updateUI();
      continue;
    }
    const dx = targetPoint.x - enemy.x;
    const dy = targetPoint.y - enemy.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 2) { enemy.pathIndex++; continue; }
    const moveSpeed = enemy.speed * dt;
    const step = Math.min(moveSpeed, distance);
    enemy.x += (dx/distance) * step;
    enemy.y += (dy/distance) * step;
  }
}

// --------------------- SPAWN DE ONDAS --------------------------
let spawnQueue = [];
function startWave() {
  if (state.waveInProgress || state.gameOver) return;
  const level = state.level;
  const wave = state.wave + 1;
  const waveData = generateWave(level, wave);
  if (waveData.boss) { startBossFight(); return; }
  state.waveTotalEnemies = waveData.enemies.length;
  state.enemiesSpawnedCount = 0;
  state.waveInProgress = true;
  state.spawnTimer = 0;
  spawnQueue = waveData.enemies.slice();
  state.wave = wave;
  waveDisplay.textContent = wave;
  updateUI();
}

function updateSpawning(dt) {
  if (!state.waveInProgress) return;
  if (state.enemiesSpawnedCount >= state.waveTotalEnemies) {
    if (state.enemies.length === 0) {
      state.waveInProgress = false;
      const bonus = 10 + state.level * 2;
      state.gold += bonus; state.score += bonus; updateUI();
      if (state.wave >= 5) {
        if (state.level < CONFIG.maxLevels) {
          state.level++; state.wave = 0;
          levelDisplay.textContent = state.level;
          state.castleHp = Math.min(state.castleHp + 20, state.castleMaxHp);
          saveGame(); updateUI();
          showMessage(`Nível ${state.level} iniciado!`, 2000);
        } else {
          if (!state.bossActive && !state.bossDefeated) victoryGame();
        }
      }
    }
    return;
  }
  state.spawnTimer -= dt;
  if (state.spawnTimer <= 0 && spawnQueue.length > 0) {
    const enemy = spawnQueue.shift();
    enemy.x = -20;
    enemy.y = CONFIG.pathPoints[0].y + random(-10,10);
    enemy.pathIndex = 0;
    state.enemies.push(enemy);
    state.enemiesSpawnedCount++;
    state.spawnTimer = state.spawnInterval * (0.8 + Math.random() * 0.4);
  }
}

// --------------------- CHEFE FINAL ----------------------------
let bossSpawnTimer = 0;
function startBossFight() {
  if (state.bossActive) return;
  state.bossActive = true;
  state.bossDefeated = false;
  showOverlay('⚔️ O Gigante Colossal chegou!', 'Prepare-se para a batalha final!', 'Lutar!');
  overlayBtn.onclick = () => {
    hideOverlay();
    const boss = createBoss(state.level);
    boss.x = -80; boss.y = CONFIG.pathPoints[0].y - 20; boss.pathIndex = 0;
    state.enemies.push(boss);
    state.waveInProgress = false;
    state.bossActive = true;
  };
}

function updateBossFight(dt) {
  if (!state.bossActive || state.bossDefeated) return;
  const boss = state.enemies.find(e => e.isBoss === true);
  if (!boss) { state.bossDefeated = true; state.bossActive = false; victoryGame(); return; }
  bossSpawnTimer -= dt;
  if (bossSpawnTimer <= 0) {
    const types = ['skeleton','goblin','zombie','witch','soldier','archer','knight'];
    const type = types[randomInt(0, types.length-1)];
    const enemy = createEnemy(type, state.level);
    enemy.x = -20; enemy.y = CONFIG.pathPoints[0].y + random(-30,30); enemy.pathIndex = 0;
    state.enemies.push(enemy);
    bossSpawnTimer = random(0.5, 1.5);
  }
}

// --------------------- VITÓRIA / GAME OVER --------------------
function victoryGame() {
  state.victory = true; state.gameOver = true;
  state.highScore = Math.max(state.highScore, state.score);
  saveGame();
  showOverlay('🏆 PARABÉNS! VOCÊ SALVOU O REINO!',
    `Score: ${state.score} | Recorde: ${state.highScore}<br>Níveis: ${state.level}`,
    'Jogar novamente');
  overlayBtn.onclick = () => resetGame();
}
function gameOver(msg) {
  state.gameOver = true;
  state.highScore = Math.max(state.highScore, state.score);
  saveGame();
  showOverlay('💀 GAME OVER', msg + `<br>Score: ${state.score}`, 'Tentar novamente');
  overlayBtn.onclick = () => resetGame();
}
function resetGame() {
  state.gold = 100; state.score = 0; state.level = 1; state.wave = 0;
  state.castleHp = 100; state.castleMaxHp = 100; state.castleDefense = 0;
  state.castleRegen = 0; state.castleArchers = 0; state.units = [];
  state.enemies = []; state.projectiles = []; state.miners = 0;
  state.waveInProgress = false; state.gameOver = false; state.victory = false;
  state.bossActive = false; state.bossDefeated = false;
  state.upgrades = { castleHp:0, castleDef:0, regen:0, archers:0 };
  spawnQueue = []; bossSpawnTimer = 0;
  applyUpgrades(); hideOverlay(); updateUI(); saveGame();
  // Unidades iniciais
  state.miners = 1;
  for (let i=0; i<2; i++) {
    const x = CONFIG.castleX - 70 + i*30;
    const y = CONFIG.castleY - 20 + i*10;
    const u = createUnit('soldier', x, y);
    if (u) state.units.push(u);
  }
}

// --------------------- UI E OVERLAYS --------------------------
function updateUI() {
  goldDisplay.textContent = Math.floor(state.gold);
  scoreDisplay.textContent = state.score;
  highScoreDisplay.textContent = state.highScore;
  castleHpDisplay.textContent = `${Math.floor(state.castleHp)}/${state.castleMaxHp}`;
  levelDisplay.textContent = state.level;
  waveDisplay.textContent = state.wave;
  document.querySelectorAll('#buildSection button').forEach(btn => {
    const unit = btn.dataset.unit;
    if (unit) {
      const unlockLevel = state.unlockedUnits[unit] || 1;
      btn.disabled = state.level < unlockLevel;
      const cost = UNIT_TYPES[unit]?.cost || 0;
      btn.textContent = btn.textContent.replace(/\(.*\)/, `(${cost})`);
    }
  });
  document.getElementById('startWaveBtn').disabled = state.waveInProgress || state.gameOver;
}

function showOverlay(title, msg, btnText) {
  overlay.classList.remove('hidden');
  overlayTitle.innerHTML = title;
  overlayMessage.innerHTML = msg;
  overlayBtn.textContent = btnText || 'OK';
}
function hideOverlay() { overlay.classList.add('hidden'); }
function showMessage(msg, dur=1500) {
  showOverlay('📢', msg, 'Fechar');
  setTimeout(() => hideOverlay(), dur);
}

// --------------------- RENDERIZAÇÃO PIXEL ART ------------------
// Desenha o fundo com tiles de grama e estrada
function drawBackground() {
  const ts = CONFIG.tileSize;
  // Grama
  for (let y=0; y<canvas.height; y+=ts) {
    for (let x=0; x<canvas.width; x+=ts) {
      const isPath = isPointOnPath(x + ts/2, y + ts/2);
      ctx.fillStyle = isPath ? '#C4A882' : ((x/ts + y/ts) % 2 === 0 ? '#4CAF50' : '#3d8b40');
      ctx.fillRect(x, y, ts, ts);
      if (isPath) {
        // bordas da estrada
        ctx.fillStyle = '#A68B6B';
        ctx.fillRect(x, y, ts, 2);
        ctx.fillRect(x, y+ts-2, ts, 2);
        ctx.fillRect(x, y, 2, ts);
        ctx.fillRect(x+ts-2, y, 2, ts);
      }
    }
  }
  // Desenha setas de direção no caminho (opcional)
}

// Verifica se um ponto está sobre o caminho (usando os segmentos)
function isPointOnPath(px, py) {
  const pts = CONFIG.pathPoints;
  for (let i=0; i<pts.length-1; i++) {
    const a = pts[i], b = pts[i+1];
    const d = distToSegment(px, py, a.x, a.y, b.x, b.y);
    if (d < 16) return true;
  }
  return false;
}
function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const t = clamp(((px-x1)*dx + (py-y1)*dy) / (dx*dx + dy*dy), 0, 1);
  const ex = x1 + t*dx, ey = y1 + t*dy;
  return Math.hypot(px - ex, py - ey);
}

// Desenha o castelo pixelado
function drawCastle() {
  const cx = CONFIG.castleX, cy = CONFIG.castleY;
  // Corpo
  ctx.fillStyle = '#7A6A5A';
  ctx.fillRect(cx-30, cy-20, 60, 40);
  ctx.fillStyle = '#5A4A3A';
  ctx.fillRect(cx-20, cy-30, 40, 20);
  // Ameias
  for (let i=-2; i<=2; i++) {
    ctx.fillRect(cx + i*12 - 4, cy-36, 6, 8);
  }
  // Porta
  ctx.fillStyle = '#3A2A1A';
  ctx.fillRect(cx-8, cy-4, 16, 24);
  // Bandeira
  ctx.fillStyle = '#8A7A6A';
  ctx.fillRect(cx+2, cy-44, 3, 16);
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(cx+5, cy-44, 16, 10);
  ctx.fillStyle = '#FF6347';
  ctx.fillRect(cx+5, cy-44, 16, 4);
  // Barra de vida do castelo (acima)
  const hpPct = state.castleHp / state.castleMaxHp;
  ctx.fillStyle = '#000';
  ctx.fillRect(cx-40, cy-52, 80, 6);
  ctx.fillStyle = hpPct > 0.6 ? '#4c4' : hpPct > 0.3 ? '#cc4' : '#c44';
  ctx.fillRect(cx-39, cy-51, 78 * hpPct, 4);
}

// Renderização principal
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  // Projéteis
  for (const p of state.projectiles) {
    ctx.fillStyle = p.color || '#ff0';
    ctx.fillRect(p.x-3, p.y-3, 6, 6);
  }

  // Inimigos
  for (const enemy of state.enemies) {
    const sprite = SPRITE_MAP[enemy.type] || SPRITE_SKELETON;
    const scale = enemy.isBoss ? 6 : 3;
    const xOff = enemy.isBoss ? -24 : -12;
    const yOff = enemy.isBoss ? -24 : -12;
    drawSprite(ctx, sprite, enemy.x + xOff, enemy.y + yOff, scale);
    // Barra de vida
    const hpPct = enemy.hp / enemy.maxHp;
    const bw = enemy.isBoss ? 80 : 30;
    ctx.fillStyle = '#000';
    ctx.fillRect(enemy.x - bw/2, enemy.y - (enemy.isBoss ? 40 : 16), bw, 5);
    ctx.fillStyle = hpPct > 0.6 ? '#4c4' : hpPct > 0.3 ? '#cc4' : '#c44';
    ctx.fillRect(enemy.x - bw/2 + 1, enemy.y - (enemy.isBoss ? 40 : 16) + 1, (bw-2)*hpPct, 3);
    // Se for chefe, nome
    if (enemy.isBoss) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('BOSS', enemy.x, enemy.y - 44);
    }
  }

  // Unidades do jogador
  for (const unit of state.units) {
    if (unit.isMiner) {
      // Desenha um ícone de picareta
      ctx.fillStyle = '#ffa';
      ctx.fillRect(unit.x-6, unit.y-6, 12, 12);
      ctx.fillStyle = '#8a7a6a';
      ctx.fillRect(unit.x-2, unit.y-10, 4, 8);
      continue;
    }
    const sprite = unit.sprite || SPRITE_SOLDIER;
    drawSprite(ctx, sprite, unit.x-12, unit.y-12, 3);
    // Barra de vida
    const hpPct = unit.hp / unit.maxHp;
    ctx.fillStyle = '#000';
    ctx.fillRect(unit.x-14, unit.y-16, 28, 4);
    ctx.fillStyle = hpPct > 0.6 ? '#4c4' : hpPct > 0.3 ? '#cc4' : '#c44';
    ctx.fillRect(unit.x-13, unit.y-15, 26 * hpPct, 2);
  }

  // Castelo
  drawCastle();

  // Barra de HP do chefe (topo)
  const boss = state.enemies.find(e => e.isBoss);
  if (boss) {
    const hpPct = boss.hp / boss.maxHp;
    ctx.fillStyle = '#000';
    ctx.fillRect(100, 10, 700, 26);
    ctx.fillStyle = hpPct > 0.6 ? '#4c4' : hpPct > 0.3 ? '#cc4' : '#c44';
    ctx.fillRect(102, 12, 696 * hpPct, 22);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 10, 700, 26);
    ctx.fillStyle = '#fff';
    ctx.font = '12px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(`👹 GIGANTE COLOSSAL  ${Math.floor(boss.hp)}/${boss.maxHp}`, 450, 30);
  }

  // Info mineiros
  ctx.fillStyle = '#fff';
  ctx.font = '10px "Press Start 2P"';
  ctx.textAlign = 'left';
  ctx.fillText(`⛏️ ${state.miners}`, 10, 30);
}

// --------------------- LOOP PRINCIPAL -------------------------
function gameLoop(timestamp) {
  const dt = Math.min((timestamp - state.lastTimestamp) / 1000, 0.05);
  state.lastTimestamp = timestamp;
  state.gameTime += dt;

  if (!state.paused && !state.gameOver) {
    updateCastle(dt);
    updateEnemies(dt);
    updateUnits(dt);
    updateProjectiles(dt);
    updateSpawning(dt);
    if (state.bossActive && !state.bossDefeated) updateBossFight(dt);
    // Mineiros
    if (state.miners > 0) {
      state.minerTimer -= dt;
      if (state.minerTimer <= 0) {
        state.gold += state.miners * 2;
        state.minerTimer = 3.0;
        updateUI();
      }
    } else state.minerTimer = 0;
    if (state.castleHp <= 0 && !state.gameOver) {
      state.castleHp = 0;
      gameOver('O castelo foi destruído!');
    }
    updateUI();
  }
  render();
  requestAnimationFrame(gameLoop);
}

// --------------------- EVENTOS DOS BOTÕES ---------------------
// Construção
document.querySelectorAll('#buildSection button').forEach(btn => {
  btn.addEventListener('click', () => {
    const unitType = btn.dataset.unit;
    if (!unitType) return;
    const cost = UNIT_TYPES[unitType]?.cost || 0;
    if (state.gold < cost) { showMessage('💰 Ouro insuficiente!', 1000); return; }
    const unlockLevel = state.unlockedUnits[unitType] || 1;
    if (state.level < unlockLevel) { showMessage(`🔒 Desbloqueado no nível ${unlockLevel}`, 1500); return; }
    if (unitType === 'miner') {
      state.gold -= cost; state.miners++; updateUI();
      showMessage('⛏️ Mineiro contratado!', 800); return;
    }
    const x = CONFIG.castleX - 60 + random(-20,20);
    const y = CONFIG.castleY - 40 + random(-20,20);
    const unit = createUnit(unitType, x, y);
    if (unit) { state.gold -= cost; state.units.push(unit); updateUI(); showMessage(`${UNIT_TYPES[unitType].label} treinado!`, 800); }
  });
});

// Melhorias
document.getElementById('upgradeCastleHp').addEventListener('click', () => {
  if (state.gold < 50) { showMessage('💰 Ouro insuficiente!',1000); return; }
  state.gold -= 50; state.upgrades.castleHp++; applyUpgrades(); updateUI(); saveGame(); showMessage('❤️ Vida+',800);
});
document.getElementById('upgradeCastleDef').addEventListener('click', () => {
  if (state.gold < 40) { showMessage('💰 Ouro insuficiente!',1000); return; }
  state.gold -= 40; state.upgrades.castleDef++; applyUpgrades(); updateUI(); saveGame(); showMessage('🛡️ Defesa+',800);
});
document.getElementById('upgradeRegen').addEventListener('click', () => {
  if (state.gold < 60) { showMessage('💰 Ouro insuficiente!',1000); return; }
  state.gold -= 60; state.upgrades.regen++; applyUpgrades(); updateUI(); saveGame(); showMessage('💚 Regeneração',800);
});
document.getElementById('upgradeArchers').addEventListener('click', () => {
  if (state.gold < 70) { showMessage('💰 Ouro insuficiente!',1000); return; }
  state.gold -= 70; state.upgrades.archers++; applyUpgrades(); updateUI(); saveGame(); showMessage('🏹 Arqueiros+',800);
});

// Controles
document.getElementById('startWaveBtn').addEventListener('click', startWave);
document.getElementById('pauseBtn').addEventListener('click', () => {
  state.paused = !state.paused;
  document.getElementById('pauseBtn').textContent = state.paused ? '▶️ Continuar' : '⏸️ Pausar';
});
document.getElementById('restartBtn').addEventListener('click', () => {
  if (confirm('Deseja reiniciar?')) resetGame();
});

// --------------------- INICIALIZAÇÃO --------------------------
function init() {
  loadGame();
  // Unidades iniciais
  state.miners = 1;
  for (let i=0; i<2; i++) {
    const x = CONFIG.castleX - 70 + i*30;
    const y = CONFIG.castleY - 20 + i*10;
    const u = createUnit('soldier', x, y);
    if (u) state.units.push(u);
  }
  updateUI();
  hideOverlay();
  state.lastTimestamp = performance.now();
  requestAnimationFrame(gameLoop);
}
init();