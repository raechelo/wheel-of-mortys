import data from './data';
import Wheel from './wheel';
import Question from './question';
import domUpdates from './domUpdates';

class Game {
  constructor() {
    this.players = [];
    this.round = 0;
    this.allQs = [];
    this.allRounds = [1, 2, 3, 4, 5];
    this.playerIndex = 1;
    this.currentPlayer = false;
    this.currentQuestion;
  }

  startRound() {
    this.populateQuestions();
    let q = this.allQs.pop()
    this.currentQuestion = new Question(q.correct_answer, q.total_number_of_letters, [], q.description, q.category);
    domUpdates.updateQInfo(this.currentQuestion);
    let wheel = new Wheel();
    let prize = wheel.spin();
    domUpdates.revealPrize(prize);
  }

  populateQuestions() {
    Object.values(data.puzzles).forEach(p => {
      p.puzzle_bank.forEach(puz => this.allQs.push(puz))
    });
    this.allQs.sort(() => 0.5 - Math.random());
  }

  changeTurn() {
    this.playerIndex === 3 
      ? this.playerIndex = 1 
      : this.playerIndex++;
  }


}

export default Game;