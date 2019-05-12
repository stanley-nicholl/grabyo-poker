import React from "react";

import Button from './Button';

import { Card, PlayerHand } from "../Styles/Styled";

const Player = ({ player, removePlayer, enablePlayerHandEdit }) => (
	<article>
		<p>
      {player.name}
      <Button
        icon="✏️"
        handleClick={() => {enablePlayerHandEdit(player.id)}}
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
    <PlayerHand>
      {player.hand.length ? player.hand.map(card => {
        return (
          <Card key={card} suit={card[0]} value={card[1]} selected={false}>
            {card[1]}
          </Card>
        )
      }) : 'Add cards for your new player'}
		</PlayerHand>
	</article>
);

export default Player;
