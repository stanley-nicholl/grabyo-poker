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
          className='enable-edit__button'
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
      <PlayerHand playerCanEdit={player.canEditHand} winner={player.winner}>
        {player.hand.length ? player.hand.map(card => {
          return (
            <Card
              key={card}
              suit={card[1]}
              value={card[0]}
              selected={player.selectedCard === card}
              onClick={() => handleCardSelect(card, player.id)}
            >
              {card[0]}
            </Card>
          )
        }) : <p className='empty-hand__message'>Add cards for your new player</p>}
      </PlayerHand>
    </article>
)};

export default Player;
