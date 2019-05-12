import React from "react";

import Button from './Button';

import { Card, PlayerHand } from "../Styles/Styled";

const Player = ({ player,
  removePlayer,
  enablePlayerHandEdit,
  selectCardInHand
}) => {

  //logic to check if a player can edit their hand (aka, have the clicked edit)
  const handleCardSelect = (card, id) => {
    if(!player.canEditHand) return null;
    selectCardInHand(card, id);
  }

  return (
    <article>
      <p>
        {`Player ${player.name}`}
        <Button
          icon="✏️"
          handleClick={() => enablePlayerHandEdit(player.id)}
          altText='pencil'
          ariaLabel='edit player'>
            Edit
        </Button>
        <Button
          icon="🔥"
          handleClick={() => removePlayer(player.id)}
          altText='fire'
          ariaLabel='delete player'>
            Remove
        </Button>
      </p>
      <PlayerHand playerCanEdit={player.canEditHand}>
        {player.hand.length ? player.hand.map(card => {
          return (
            <Card
              key={card}
              suit={card[0]}
              value={card[1]}
              selected={player.selectedCard === card}
              onClick={() => handleCardSelect(card, player.id)}
            >
              {card[1]}
            </Card>
          )
        }) : 'Add cards for your new player'}
      </PlayerHand>
    </article>
)};

export default Player;
