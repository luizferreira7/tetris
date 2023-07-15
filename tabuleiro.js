const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLUNAS * TAMANHO;
ctx.canvas.height = LINHAS * TAMANHO;

ctx.scale(TAMANHO, TAMANHO);