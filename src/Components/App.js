import React, { Component } from 'react';

import { suits, values } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import Player from "./Player";
import Button from './Button'

import { Footer } from "../Styles/Styled";

class App extends Component {
  state = {
    players: [],
  }

  componentDidMount() {
    const initialPlayers = [
      {
        id: 0,
        name: 'Player 1',
        hand: ['HA', 'D4', 'C9', 'HJ', 'DJ'],
        canEditHand: false
      },
      {
        id: 1,
        name: 'Player 2',
        hand: ['S6', 'S7', 'S8', 'S9', 'ST'],
        canEditHand: false
      }
    ]
    this.setState({ players: initialPlayers });
  };

  removePlayer = (id) => {
    const players = this.state.players;
    const index = players.map(player => player.id).indexOf(id);
    players.splice(index, 1);
    this.setState({ players });
  }

  addPlayer = () => {
    const { players } = this.state;
    if(players.length === 6) return null;
    const newPlayer = {
      id: players.length,
      name: `Player ${players.length + 1}`,
      hand: [],
      canEditHand: false
    };
    this.setState({ players: [ ...players, newPlayer ]})
  }

  enablePlayerHandEdit = (id) => {
    const players = this.state.players;
  }

	render() {
    const { players, canEdit } = this.state;
		return (
				<Layout>

					<section>
						<h1>Cards deck</h1>
						<Deck suits={suits} values={values} players={players} canEdit={canEdit} />
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
