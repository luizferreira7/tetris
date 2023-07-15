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

    isJogadaValida(t) {
        return t.formato.every((row, dy) => {
          return row.every((value, dx) => {
            let x = t.x + dx;
            let y = t.y + dy;
            return value === 0 || (this.isDentroMatriz(x, y) && this.isLinhaColunaLivre(x, y));
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
      
        this.tetromino.desenha();
    }
    
  }