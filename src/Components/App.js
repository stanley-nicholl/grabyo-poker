import React, { Component } from 'react';

import { suits, values } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import Player from "./Player";
import Button from "./Button";

import { Footer } from "../Styles/Styled";

class App extends Component {
  state = {
    players: [],
    canEdit: false
  }

  componentDidMount() {
    const initialPlayers = [
      {
        index: 0,
        player: 'Player 1',
        hand: ['HA']
      },
      {
        index: 1,
        player: 'Player 2',
        hand: ['S6']
      }
    ]
    this.setState({ players: initialPlayers });
  };

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
							<Player name="Player 1" />
							<Player name="Player 2" />
						</section>
						<Footer>
							<Button icon="🙋‍♀️">Add new player</Button>
							<Button icon="🏆">Find the winner</Button>
						</Footer>
					</section>

				</Layout>
		);
	}
}

export default App;