import chai from 'chai';
import Game from '../src/js/game';
import spies from 'chai-spies';
import domUpdates from '../src/js/domUpdates.js';

chai.use(spies);
chai.spy.on(domUpdates, ['updateQInfo', 'revealPrize', 'loadPossiblePrizes', 'appendNames'], () => true);
chai.spy.on(domUpdates, 'getNames', () => ['nim', 'rick', 'morty']);

const expect = chai.expect;

describe('Game', () => {

  let game;
  beforeEach(() => {
    game = new Game();
  });

  it('should have a default state', () => {
    expect(game.players).to.deep.equal([]);
    expect(game.round).to.equal(0);
    expect(game.allRounds).to.have.lengthOf(5);
    expect(game.allQs).to.deep.equal([]);
    expect(game.playerIndex).to.equal(0);
    expect(game.currentQuestion).to.equal(undefined);
    expect(game.currentPrize).to.equal(undefined);
  });

  it('should populate questions', () => {
    expect(game.allQs).to.deep.equal([]);
    game.populateQuestions();
    expect(game.allQs).to.have.lengthOf(96)
  });

  it('should change player turns', () => {
    expect(game.playerIndex).to.equal(0);
    game.changeTurn();
    expect(game.playerIndex).to.equal(1);
    game.changeTurn();
    expect(game.playerIndex).to.equal(2);
    game.changeTurn();
    expect(game.playerIndex).to.equal(0);
  });

  it('should generate a random question', () => {
    expect(game.currentQuestion).to.equal(undefined);
    game.populateQuestions();
    game.newQ();
    expect(game.currentQuestion).to.be.an('object');
  });

  it('instantiate new players', () => {
    expect(game.players).to.deep.equal([]);
    game.instantiatePlayers();
    expect(game.players).to.have.lengthOf(3);
  });

  it('should change rounds', () => {
    game.populateQuestions();
    expect(game.round).to.equal(0);
    game.changeRound();
    expect(game.round).to.equal(1);
    game.changeRound();
    expect(game.round).to.equal(2);
    game.changeRound();
    expect(game.round).to.equal(3);
    game.changeRound();
    expect(game.round).to.equal(4);
    game.changeRound();
    expect(game.round).to.equal(5);
    game.changeRound();
    expect(game.round).to.equal(1);
  });

  it('should generate a new question', () => {
    game.populateQuestions();
    game.newQ();
    expect(game.allQs).to.have.lengthOf(95);
    expect(game.currentQuestion).to.not.equal(undefined);
    game.newQ();
    expect(game.allQs).to.have.lengthOf(94);
    expect(game.currentQuestion).to.not.equal(undefined);
  });

  it('should generate a prize by spinning the wheel class', () => {
    game.generatePrize();
    expect(game.currentPrize).to.not.equal(undefined);
  });

  it('start a round', () => {
    game.startRound();
    expect(game.allQs).to.have.lengthOf(95);
    expect(game.players).to.have.lengthOf(3);
    expect(game.currentQuestion).to.not.equal(undefined);
  });

});