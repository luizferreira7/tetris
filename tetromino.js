class Tetromino {
  constructor(ctx, index, previa = false) {
    this.ctx = ctx;

    this.proximaPeca(index);

    if (previa) {

      if (this.formato.length == 2) {
        this.x = 1;
        this.y = 1;
      }

      if (this.formato.length == 3) {
        this.x = 0.5;
        this.y = 1;
      }

      if (this.formato.length == 4) {
        this.x = 0;
        this.y = 0.5;
      }
    }
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
