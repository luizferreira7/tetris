class Tabuleiro {
  constructor(ctx, linhas, pontuacao) {
    this.ctx = ctx;
    this.reiniciar();
    this.linhas = linhas;
    this.pontuacao = pontuacao;
  }

  reiniciar() {
    this.matriz = this.iniciaMatrizComZeros();
    ctx.fillStyle = CORES[0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
  }

  iniciaMatrizComZeros() {
    return Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(0));
  }

  isJogadaValida(t) {
    return t.formato.every((linha, dy) => {
      return linha.every((value, dx) => {
        let x = t.x + dx;
        let y = t.y + dy;
        return (
          value === 0 ||
          (this.isDentroMatriz(x, y) && this.isLinhaColunaLivre(x, y))
        );
      });
    });
  }

  isDentroMatriz(x, y) {
    return x >= 0 && x < COLUNAS && y <= LINHAS;
  }

  isLinhaColunaLivre(x, y) {
    return this.matriz[y] && this.matriz[y][x] === 0;
  }

  mover(t) {
    this.tetromino.x = t.x;
    this.tetromino.y = t.y;
    this.tetromino.formato = t.formato;
  }

  fixaTetromino() {
    this.tetromino.formato.forEach((linha, y) => {
      linha.forEach((value, x) => {
        if (value > 0) {
          this.matriz[y + this.tetromino.y][x + this.tetromino.x] = value;
        }
      });
    });
    this.eliminaLinhas();
  }

  desenhaTabuleiro() {
    this.matriz.forEach((linha, y) => {
      linha.forEach((value, x) => {
        this.ctx.fillStyle = CORES[value];
        this.ctx.fillRect(x, y, 1, 1);
      });
    });
  }

  desenha() {
    this.desenhaTabuleiro();
    this.tetromino.desenha();
  }

  existeJogadaValida() {
    return this.isJogadaValida(this.tetromino);
  }

  eliminaLinhas() {
    let l = Number(this.linhas.innerText);
    let p = Number(this.pontuacao.innerText);

    let novaslinhas = 0;

    this.matriz.forEach((linha, y) => {
      if (linha.every((value) => value > 0)) {
        novaslinhas++;

        this.matriz.splice(y, 1);

        this.matriz.unshift(Array(COLUNAS).fill(0));
      }
    });

    p += (novaslinhas) * 10;

    this.pontuacao.innerText = p;
    this.linhas.innerText = l + novaslinhas;
  }
}
