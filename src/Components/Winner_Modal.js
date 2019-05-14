import React from 'react';

import { StyledModal, StyledModalBackground, Card } from '../Styles/Styled';

const WinnerModal = ({ winner, hideWinnerModal, playAgain }) => {

  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) hideWinnerModal();
  };

  return (
    <StyledModalBackground onClick={handleBackgroundClick}>

      <StyledModal>
        <div className='modal-content'>
          <h1>{`${winner.name} wins!`}</h1>
          <p>With a hand of:</p>
          <div className='winning-deck'>
            {winner.hand.map(card => {
              return (
                <Card
                  key={card}
                  suit={card[1]}
                  value={card[0]}
                  selected={false}
                >
                  {card[0]}
                </Card>
              )
            })}
          </div>
          <button onClick={playAgain} >Play again</button>
        </div>

      </StyledModal>
    </StyledModalBackground>
  );
};

export default WinnerModal;
