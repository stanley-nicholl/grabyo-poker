import React, { Fragment } from "react";
import { Card, StyledDeck } from "../Styles/Styled";


const Deck = ({ suits, values, players, canSelectCardFromDeck, addCardToHand }) => {

  //a boolean check to see if a card in the deck exists in a users hand
  const checkSelected = (card, players) => {
    return !!players.filter(player => {
      if(!player.hand.length) return false;
      return player.hand.includes(card)
    }).length;
  }

  //click handler preventing a card that exists in a players hands from being selected again
  //if it hasn't, calls function to add the card to the players hand
  const handleSelect = (card, selected) => {
    if(selected) return null;
    addCardToHand(card);
  }
  
  return (
    <StyledDeck>
      {suits.map(suit => (
        <Fragment key={suit}>
          {values.map(value => {
            const selected = checkSelected(value + suit, players);
            return (
            <Card
              key={value + suit}
              suit={suit}
              value={value}
              selected={selected}
              canSelectCardFromDeck={canSelectCardFromDeck}
              onClick={() => {handleSelect(value + suit, selected)}}
            >
              {value}
            </Card>
          )})}
        </Fragment>
      ))}
    </StyledDeck>
)};

export default Deck;
