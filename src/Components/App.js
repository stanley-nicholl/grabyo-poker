import React, { Component } from 'react';

import { suits, values } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import Player from "./Player";
import Button from './Button'

import { Footer } from "../Styles/Styled";

const initialPlayers = [
  {
    id: 0,
    name: 1,
    hand: ['HA', 'D4', 'C9', 'HJ', 'DJ'],
    selectedCard: '',
    canEditHand: false
  },
  {
    id: 1,
    name: 2,
    hand: ['S6', 'S7', 'S8', 'S9', 'ST'],
    selectedCard: '',
    canEditHand: false
  }
]

class App extends Component {
  state = {
    players: [],
    canSelectCardFromDeck: false,
    targetedPlayerHand: -1
  }

  componentDidMount() {
    this.setState({ players: initialPlayers });
  };

  removePlayer = (id) => {
    const players = this.state.players;
    const index = players.map(player => player.id).indexOf(id);
    players.splice(index, 1);
    this.setState({ players });
  }

  addPlayer = () => {
    let { players } = this.state;

    if(players.length === 6) return null;

    const newPlayer = {
      id: players.length,
      name: players[players.length - 1].name + 1,
      hand: [],
      selectedCard: '',
      canEditHand: true
    };

    players = players.map(player => {
      player.canEditHand = false;
      player.selectedCard = '';
      return player;
    })

    players.push(newPlayer)

    this.setState({ players, targetedPlayerHand: players.length - 1, canSelectCardFromDeck: true })
  }

  //checks to see if a player can edit their hand, if so, sets a target hand to receive (or swap) selected cards
  enablePlayerHandEdit = (id) => {
    let canSelectCardFromDeck, targetedPlayerHand;

    const players = this.state.players.map(player => {
      player.canEditHand = id === player.id ? !player.canEditHand : false;
      canSelectCardFromDeck = player.hand.length < 5 ? true : false;
      targetedPlayerHand = player.hand.length < 5 ? id : -1 ;
      if(!player.canEditHand) player.selectedCard = '';
      return player;
    });

    this.setState({ players, canSelectCardFromDeck, targetedPlayerHand });
  }

  //targets a card in a players hand to swap for an unused card in the deck
  selectCardInHand = (card, playerId) => {
    const { players } = this.state;
    const player = players[playerId];

    if(!player.canEditHand) return null;

    player.selectedCard = player.hand[player.hand.indexOf(card)];
    players[playerId] = player;
    const canSelectCardFromDeck = true;
    const targetedPlayerHand = playerId

    this.setState({ players, canSelectCardFromDeck, targetedPlayerHand })
  }

  //adds cards (in the case a player has < 5 cards) or swaps a new card in the players hand
  addCardToHand = (card) => {
    const { canSelectCardFromDeck, players, targetedPlayerHand } = this.state;
    if(!canSelectCardFromDeck) return null;

    const player = players[targetedPlayerHand];
    const { hand, selectedCard } = player;
    if(hand.length < 5) {
      hand.push(card);
    }else{
      const index = hand.indexOf(selectedCard);
      hand[index] = card
    }
    player.hand = hand;
    player.selectedCard = card;

    players[targetedPlayerHand] = player
    this.setState({ players });
  }

	render() {
    const { players, canSelectCardFromDeck } = this.state;
		return (
				<Layout>

					<section>
						<h1>Cards deck</h1>
            <Deck
              suits={suits}
              values={values}
              players={players}
              canSelectCardFromDeck={canSelectCardFromDeck}
              addCardToHand={this.addCardToHand}
            />
					</section>
					<section>
						<header>
							<h1>Players</h1>
						</header>
            <section>
              {players.map(player => (
                <Player
                  key={player.id}
                  player={player}
                  enablePlayerHandEdit={this.enablePlayerHandEdit}
                  removePlayer={this.removePlayer}
                  selectCardInHand={this.selectCardInHand}
                />))}
						</section>
            <Footer>
              <Button
                icon="🙋‍♀️"
                handleClick={() => {this.addPlayer()}}
                altText='woman raising hand'
                ariaLabel='add player'>
                  Add new player
              </Button>
              <Button
                icon="🏆"
                handleClick={() => {}}
                altText='trophy'
                ariaLabel='find winner'>
                  Find winner
              </Button>
						</Footer>
					</section>

				</Layout>
		);
	}
}

export default App;
