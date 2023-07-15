const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');

const botao = document.getElementById('jogar');

ctx.canvas.width = COLUNAS * TAMANHO;
ctx.canvas.height = LINHAS * TAMANHO;

ctx.scale(TAMANHO, TAMANHO);

let tabuleiro = new Tabuleiro(ctx);
let mochila = new Mochila();

let jogoIniciado = false;

let pontuacao = 0;
let linhas = 0;

function reiniciar() {
    pontuacao = 0;
    linhas = 0;
    tabuleiro.reiniciar(); 
    mochila.reiniciar();
}

function jogar() {  
    this.reiniciar();

    if (!jogoIniciado) {
        botao.innerText = 'Reiniciar'
        jogoIniciado = true;

        let tetromino = new Tetromino(ctx, mochila.getIndex());
        tetromino.desenha();
        
        tabuleiro.tetromino = tetromino;
    } else {
        botao.innerText = 'Jogar'
        jogoIniciado = false;
    }
}
