import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import Player from './Player';
import {Card} from '../Styles/Styled';
import Button from './Button';
import Deck from './Deck';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('the app', () => {

  describe('<Game />', () => {
    let wrapper;
    let testPlayers
    beforeEach(() => {
      wrapper = mount(<Game />);
      testPlayers = [
        {
          id: 0,
          name: 1,
          hand: [ '2H', '3S', '4D', 'TH', 'AH' ],
          selectedCard: '',
          canEditHand: false,
        },
        {
          id: 1,
          name: 2,
          hand: [ '3H', '2S', '6S', 'TD', 'AS' ],
          selectedCard: '',
          canEditHand: false,
        },
        {
          id: 2,
          name: 3,
          hand: [ 'TS', 'JS', 'QS', 'KS', 'AS' ],
          selectedCard: '',
          canEditHand: false,
        }
      ]
    });
    
    test('adds player when prompted (addPlayer)', () => {
      expect(wrapper.state().players.length).toBe(2);
      wrapper.find('.add-player__button').simulate('click');
      expect(wrapper.state().players.length).toBe(3);
    })
  
    test('calls find winner function when prompted (findWinner)', () => {
      expect(wrapper.state().players.length).toBe(2);
      wrapper.setState({ players: testPlayers })
      wrapper.find('.find-winner__button').simulate('click');
      expect(wrapper.state().winner).toBe(2);
    })
  })

  describe('enables user to edit player hand', () => {
    let testPlayers;
    let wrapper;
    beforeEach(() => {
      testPlayers = [
        {
          id: 0,
          name: 1,
          hand: [ '2H', '3S', '4D', 'TH', 'AH' ],
          selectedCard: '',
          canEditHand: false,
        },
        {
          id: 1,
          name: 2,
          hand: [ '3H', '2S', '6S', 'TD', 'AS' ],
          selectedCard: '',
          canEditHand: false,
        },
        {
          id: 2,
          name: 3,
          hand: [ 'TS', 'JS', 'QS', 'KS', 'AS' ],
          selectedCard: '',
          canEditHand: false,
        }
      ]
      wrapper = mount(<Game />);
      wrapper.setState({ players: testPlayers })
    });

    test('updates player state to enable edit when triggered (enablePlayerHandEdit)', () => {
      
      expect(wrapper.state().players[0].canEditHand).toBe(false);
      wrapper.find(Player).first().find(Button).first().simulate('click');
      expect(wrapper.state().players[0].canEditHand).toBe(true);
    })

    test('stores correct card to be replaced in hand when editing (selectCardInHand)', () => {
      wrapper.find(Player).first().find(Button).first().simulate('click');
      expect(wrapper.state().players[0].selectedCard).toBe('');
      wrapper.find(Player).first().find(Card).first().simulate('click');
      expect(wrapper.state().players[0].selectedCard).toBe('2H');
    })

    test('replaces card in player hand if allowed with deck card (addCardToHand)', () => {
      wrapper.find(Player).first().find(Button).first().simulate('click');
      wrapper.find(Player).first().find(Card).first().simulate('click');
      expect(wrapper.state().players[0].selectedCard).toBe('2H');
      wrapper.find(Deck).find(Card).first().simulate('click');
      expect(wrapper.state().players[0].hand[0]).toBe('2D');
    })

    test('deletes player (deletePlayer', () => {
      expect(wrapper.state().players.length).toBe(3);
      wrapper.find(Player).first().find(Button).at(1).simulate('click');
      expect(wrapper.state().players.length).toBe(2);
    })
  })
})

