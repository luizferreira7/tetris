class Tabuleiro {
  constructor(ctx) {
    this.ctx = ctx;
    this.reiniciar();
  }

  reiniciar() {
    this.matriz = this.iniciaMatrizComZeros();
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.desenha();
  }

  fixaTetromino() {
    this.tetromino.formato.forEach((linha, y) => {
      linha.forEach((value, x) => {
        if (value > 0) {
          this.matriz[y + this.tetromino.y][x + this.tetromino.x] = value;
        }
      });
    });
  }

  desenhaTabuleiro() {
    this.matriz.forEach((linha, y) => {
      linha.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = CORES[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  desenha() {
    this.tetromino.desenha();
    this.desenhaTabuleiro();
  }

  existeJogadaValida() {
    return this.isJogadaValida(this.tetromino);
  }
}
