import React, { Fragment } from "react";
import { Card, StyledDeck } from "../Styles/Styled";

const checkSelected = (card, players) => {
  return !!players.filter(player => {
    if(!player.hand.length) return false;
    return player.hand.includes(card)
  }).length;
}

const Deck = ({ suits, values, players, canEdit }) => (
	<StyledDeck>
		{suits.map(suit => (
			<Fragment key={suit}>
				{values.map(value => {
          const selected = checkSelected(suit + value, players);
          return (
					<Card key={suit+value} suit={suit} value={value} selected={selected}>
						{value}
					</Card>
				)})}
			</Fragment>
		))}
	</StyledDeck>
);

export default Deck;
