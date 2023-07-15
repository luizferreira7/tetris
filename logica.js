const canvas = document.getElementById("tabuleiro");
const ctx = canvas.getContext("2d");

const botao = document.getElementById("botao-iniciar");
const linhas = document.getElementById("linhas");
const pontuacao = document.getElementById("pontuacao");

ctx.canvas.width = COLUNAS * TAMANHO;
ctx.canvas.height = LINHAS * TAMANHO;

ctx.scale(TAMANHO, TAMANHO);

let tabuleiro = new Tabuleiro(ctx, linhas);
let mochila = new Mochila();

let jogoIniciado = false;

let requestId = null;
let timer = { inicio: 0, decorrido: 0, delay: 800 };

function addEventListener() {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
}

function jogadas(key, tetromino) {
  switch (key) {
    case KEY.LEFT:
      tetromino.x -= 1;
      break;

    case KEY.RIGHT:
      tetromino.x += 1;
      break;

    case KEY.DOWN:
      tetromino.y += 1;
      if (!tabuleiro.isJogadaValida(tetromino)) {
        tetromino.y -= 1;
        tabuleiro.fixaTetromino();
        tabuleiro.tetromino = new Tetromino(ctx, mochila.getIndex());
      }
      
      break;

    case KEY.SPACE:
      tetromino.formato = rotacao(tetromino.formato);
      break;

    default:
      break;
  }

  return tetromino;
}

function rotacao(formato) {

  // Faz a matriz transposta
  for (let y = 0; y < formato.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [formato[x][y], formato[y][x]] = [formato[y][x], formato[x][y]];
    }
  }

  // Inverte as linhas
  formato.forEach(linha => linha.reverse());

  return formato;
}

function handleKeyPress(event) {
  if (Object.values(KEY).includes(event.keyCode)) {
    event.preventDefault();

    let t = jogadas(event.keyCode, { ...tabuleiro.tetromino });

    if (tabuleiro.isJogadaValida(t)) {
      tabuleiro.mover(t);
    }
  }
}

function reiniciar() {
  pontuacao.innerText = 0;
  linhas.innerText = 0;
  tabuleiro.reiniciar();
  mochila.reiniciar();
  botao.src = "assets/jogar.png";
  jogoIniciado = false;
}

function iniciar() {
  this.reiniciar();
  this.addEventListener();

  if (!jogoIniciado) {
    botao.src = "assets/restart.png";
    jogoIniciado = true;

    let tetromino = new Tetromino(ctx, mochila.getIndex());

    tabuleiro.tetromino = tetromino;

    animate();
  }
}

function cair() {
  tabuleiro.tetromino.y += 1;

    if (!tabuleiro.isJogadaValida(tabuleiro.tetromino)) {
      tabuleiro.tetromino.y -= 1;
      tabuleiro.fixaTetromino();
      tabuleiro.tetromino = new Tetromino(ctx, mochila.getIndex());
    } else {
      tabuleiro.mover(tabuleiro.tetromino);
    }
}

function animate(now = 0) {
  timer.decorrido = now - timer.inicio;

  if (timer.decorrido > timer.delay) {
    this.cair();
    timer.inicio = now;
  }

  if (!tabuleiro.existeJogadaValida()) {
    reiniciar();
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  tabuleiro.desenha();
  requestId = requestAnimationFrame(animate);
}
