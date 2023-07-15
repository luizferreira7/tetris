class Mochila {
  constructor() {
    this.reiniciar();
  }

  getIndex() {
    let tetromino = this.tetrominos.pop();

    if (this.tetrominos.length === 0) {
      this.reiniciar();
    }

    return tetromino;
  }

  getTetrominos() {
    return [0, 1, 2, 3, 4, 5, 6];
  }

  reiniciar() {
    this.tetrominos = this.getTetrominos();

    this.embaralhar(this.tetrominos);
  }

  embaralhar(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
