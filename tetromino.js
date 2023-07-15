class Tetromino {
  constructor(ctx, index) {
    this.ctx = ctx;

    this.proximaPeca(index);
  }

  proximaPeca(index) {
    this.formato = TETROMINOS[index];
    this.cor = CORES[index];
    this.x = 4;
    this.y = 0;
  }

  desenha() {
    this.ctx.fillStyle = this.cor;
    this.formato.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
}
