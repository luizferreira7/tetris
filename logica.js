const canvas = document.getElementById("tabuleiro");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLUNAS * TAMANHO;
ctx.canvas.height = LINHAS * TAMANHO;
ctx.scale(TAMANHO, TAMANHO);

const canvasPrevia = document.getElementById("previa");
const ctxPrevia = canvasPrevia.getContext("2d");

ctxPrevia.canvas.width = 4 * TAMANHO;
ctxPrevia.canvas.height = 4 * TAMANHO;
ctxPrevia.scale(TAMANHO, TAMANHO);

const botao = document.getElementById("botao-iniciar");
const linhas = document.getElementById("linhas");
const pontuacao = document.getElementById("pontuacao");

let tabuleiro = new Tabuleiro(ctx, ctxPrevia, linhas, pontuacao);
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
      tetromino.formato = rotacao(tetromino);
      break;

    default:
      break;
  }

  return tetromino;
}

function rotacao(t) {
  let tetromino_aux = JSON.parse(JSON.stringify(t));

  // Faz a matriz transposta
  for (let y = 0; y < tetromino_aux.formato.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [tetromino_aux.formato[x][y], tetromino_aux.formato[y][x]] = [
        tetromino_aux.formato[y][x],
        tetromino_aux.formato[x][y],
      ];
    }
  }

  // Inverte as linhas
  tetromino_aux.formato.forEach((linha) => linha.reverse());

  if (tabuleiro.isJogadaValida(tetromino_aux)) {
    return tetromino_aux.formato;
  }

  return t.formato;
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
  botao.src = "assets/jogar.png";

  tabuleiro.reiniciar();
  mochila.reiniciar();

  jogoIniciado = false;
}

function iniciar() {
  
  this.reiniciar();
  this.addEventListener();

  if (!jogoIniciado) {
    botao.src = "assets/restart.png";
    jogoIniciado = true;

    let tetromino = new Tetromino(ctx, mochila.getIndex());
    let previa = new Tetromino(ctxPrevia, mochila.getPrevia(), true);

    tabuleiro.previa = previa;
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
    tabuleiro.previa = new Tetromino(ctxPrevia, mochila.getPrevia(), true);
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
