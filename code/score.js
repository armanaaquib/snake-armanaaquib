class Score {
  constructor () {
    this.curScore = 0;
  }

  get currentScore() {
    return this.curScore;
  }

  increment() {
    this.curScore += 1;
  }
}