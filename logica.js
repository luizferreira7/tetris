const canvas = document.getElementById("tabuleiro");
const ctx = canvas.getContext("2d");

const botao = document.getElementById("jogar");

ctx.canvas.width = COLUNAS * TAMANHO;
ctx.canvas.height = LINHAS * TAMANHO;

ctx.scale(TAMANHO, TAMANHO);

let tabuleiro = new Tabuleiro(ctx);
let mochila = new Mochila();

let jogoIniciado = false;

let pontuacao = 0;
let linhas = 0;

let requestId = null;

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
        tabuleiro.desenha();
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
  pontuacao = 0;
  linhas = 0;
  tabuleiro.reiniciar();
  mochila.reiniciar();
}

function jogar() {
  this.reiniciar();
  this.addEventListener();

  if (!jogoIniciado) {
    botao.innerText = "Reiniciar";
    jogoIniciado = true;

    let tetromino = new Tetromino(ctx, mochila.getIndex());

    tabuleiro.tetromino = tetromino;

    tabuleiro.desenha();
  } else {
    botao.innerText = "Jogar";
    jogoIniciado = false;
  }
}
