import * as faker from 'faker';

export const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
export const suits = ["D", "H", "S", "C"];

export const getColourForSuit = suit => suit === "D" || suit === "H" ? "red" : "black";

const autoGenerateHands = () => {
  // const deck = suits.map(suit => values.map(value => value + suit)).flat();
  const suitArrays = suits.map(suit => values.map(value => value + suit));
  const deck = suitArrays[0].concat(suitArrays[1], suitArrays[2], suitArrays[3]);
  const playerOneHand = [];
  const playerTwoHand = [];
  for(let i = 0; i < 5; i++) {
    
    let randomCardIndex = Math.random()*deck.length;
    playerOneHand.push(deck.splice(randomCardIndex, 1)[0])

    randomCardIndex = Math.random()*deck.length;
    playerTwoHand.push(deck.splice(randomCardIndex, 1)[0])
  }

  return [playerOneHand, playerTwoHand];
}

export const createInitialGameState = () => {

  const initialHands = autoGenerateHands();

  const initialPlayers = [
    {
      id: 0,
      name: faker.name.findName(),
      hand: initialHands[0],
      selectedCard: '',
      canEditHand: false,
    },
    {
      id: 1,
      name: faker.name.findName(),
      hand: initialHands[1],
      selectedCard: '',
      canEditHand: false,
    }
  ]

  return initialPlayers
}
