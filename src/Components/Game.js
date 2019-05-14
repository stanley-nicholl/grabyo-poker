import React, { Component } from 'react';

import * as Poker from 'poker-hands';

import { suits, values, createInitialGameState } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import Player from "./Player";
import Button from './Button'
import WinnerModal from './Winner_Modal';

import { Footer } from "../Styles/Styled";

class Game extends Component {
  state = {
    players: [],
    canSelectCardFromDeck: false,
    targetedPlayerHand: -1,
    winner: null,
    showWinner: false
  }

  componentDidMount() {
    const players = createInitialGameState();
    this.setState({ players });
  };

  removePlayer = (id) => {
    let players = this.state.players;
    const index = players.map(player => player.id).indexOf(id);
    players.splice(index, 1);
    players = players.map(player => {
      player.canEditHand = false;
      player.selectedCard = '';
      return player;
    })
    this.setState({ players, targetedPlayerHand: -1, canSelectCardFromDeck: false });
  }

  addPlayer = () => {
    let { players } = this.state;

    if(players.length === 6) return null;

    const newPlayer = {
      id: players[players.length - 1].id + 1,
      name: players[players.length - 1].name + 1,
      hand: [],
      selectedCard: '',
      canEditHand: true
    };

    //take edit focus away from existing players to give it new player
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
    //give edit focus to targeted player and away from all others
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
    const player = players.filter(player => {
      return player.id === playerId;
    })[0];

    if(!player.canEditHand) return null;

    player.selectedCard = player.hand[player.hand.indexOf(card)];
    const canSelectCardFromDeck = true;
    const targetedPlayerHand = playerId
    this.setState({ players, canSelectCardFromDeck, targetedPlayerHand })
  }

  //adds cards (in the case a player has < 5 cards) or swaps a new card in the players hand
  addCardToHand = (card) => {
    const { canSelectCardFromDeck, players, targetedPlayerHand } = this.state;
    if(!canSelectCardFromDeck) return null;

    const player = players.filter(player => {
      return player.id === targetedPlayerHand;
    })[0];

    const { hand, selectedCard } = player;
    if(hand.length < 5) {
      hand.push(card);
    }else{
      const index = hand.indexOf(selectedCard);
      hand[index] = card
    }
    player.hand = hand;
    player.selectedCard = card;

    this.setState({ players });
  }

  findWinner = () => {
    let { players } = this.state;
    const hands = [];
    let allCardsDealt = true;
    players.forEach(player => {
      if(player.hand.length !== 5) allCardsDealt = false;
      hands.push(player.hand.join(' '));
    })

    if(!allCardsDealt) {
      alert('Please make sure all players have five cards first');
      return null;
    }

    let winningIndex = 0;

    for(let i = 0; i < hands.length - 1; i++) {
      // console.log(hands[i], '-', hands[i + 1], '-', i)
      const winner = Poker.judgeWinner([hands[i], hands[i + 1]])
      
      if(winner) {
        console.log(hands[i + 1])
        winningIndex = i + 1;
      }else{
        console.log(hands[i])
      }
    }

    players = players.map(player => {
      player.canEditHand = false;
      player.selectedCard = '';
      return player;
    })

    this.setState({ winner: winningIndex, showWinner: true, players })
  }

  //simply hides modal but keeps game state
  hideWinnerModal = () => {
    this.setState({ showWinner: false })
  }

  //hides modal and resets game to initial state
  playAgain = () => {
    const players = createInitialGameState();
    this.setState({ 
      players,
      showWinner: false,
      winner: null,
      targetedPlayerHand: -1,
      canSelectCardFromDeck: false
    });
  }

	render() {
    const { players, canSelectCardFromDeck, showWinner, winner } = this.state;
		return (
				<Layout>
          {showWinner && 
            <WinnerModal
              winner={players[winner]}
              hideWinnerModal={this.hideWinnerModal}
              playAgain={this.playAgain}
            />}
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
                className='add-player__button'
                handleClick={() => {this.addPlayer()}}
                altText='woman raising hand'
                ariaLabel='add player'>
                  Add new player
              </Button>
              <Button
                icon="🏆"
                className='find-winner__button'
                handleClick={() => {this.findWinner()}}
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

export default Game;
