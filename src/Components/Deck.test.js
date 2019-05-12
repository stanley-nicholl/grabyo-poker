import { mount } from "enzyme";

import React from "react";

import Deck from "./Deck";
import { Card } from "../Styles/Styled";

import { suits, values } from "../utils";

const players = [
  {
    index: 0,
    player: 'test player',
    hand: ['D2']
  }
]

describe(`Card deck`, () => {
  const deck = mount(<Deck suits={suits} values={values} players={players} />)
	it('renders the right amount of cards', () => {
		expect(deck.find(Card)).toHaveLength(52);
  });
  
  it('renders cards as selected if they are included in player hand', () => {
    expect(deck.find({ prop: 'selected'}).to.have.lengthOf(1))
  })
});
