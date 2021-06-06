const Footer = ({ startGame, displayStartButton, displayButton, playAgain }) => {
    return (
        <div className='footer'>
            {displayStartButton && <button
                className='btn'
                onClick={startGame}
            >Start</button>}

            {displayButton && <button
                className='btn'
                onClick={playAgain}
            >Play Again</button>}
        </div>
    );
}

export default Footer;