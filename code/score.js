class ScoreCard {
  constructor () {
    this.curScore = 0;
  }

  get score() {
    return this.curScore;
  }

  updateDefault() {
    this.curScore += 1;
  }
}