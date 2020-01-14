class ScoreCard {
  constructor () {
    this.curScore = 0;
  }

  get score() {
    return this.curScore;
  }

  update(point) {
    this.curScore += point;
  }
}