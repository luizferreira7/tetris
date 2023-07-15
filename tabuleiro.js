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
      return Array.from(
        {length: LINHAS}, () => Array(COLUNAS).fill(0)
      );
    }
  }