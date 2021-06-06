import React, { useEffect, useState, useRef } from "react";
import './MemoryGame.css';
import utils from '../misc/utils';
import colors from '../misc/colors';
import Cell from "./Cell";
import Footer from "./Footer";

const MemoryGame = ({ incrementId }) => {
    const [memCells] = useState(utils.nonRepeatingRandoms(6, 1, 25));
    const [clickedCells, setClickedCells] = useState([]);
    const [gameState, setGameState] = useState('game-inactive');
    const [timer, setTimer] = useState(3);
    const correctCells = useRef(0);
    const wrongCells = useRef(0);

    // 3 second timer
    useEffect(() => {
  	    if (gameState === 'display-mem-cells') {
            if (timer > 0) {
                const timerId = setTimeout(() => {
                    setTimer(timer - 1);
                }, 1000);
                return () => clearTimeout(timerId);
            }
            if (timer === 0) {
                setGameState('recall-cells');
            }}
    }, [gameState, timer]);

    //handles what happens to cell after click
    const handleClick = (cellNumber) => {
        if (gameState !== 'recall-cells' ||
        clickedCells.includes(cellNumber)) {
            return;
        }
        addToArray(cellNumber);
        winOrLose(cellNumber);
    }
    
    //add the cell being clicked to the array
    const addToArray = (cellNumber) => setClickedCells([...clickedCells, cellNumber]);

    //determine if the game is won or lost
    const winOrLose = (cellNumber) => {
        if (memCells.includes(cellNumber)) {
            correctCells.current += 1;
        } else {
            wrongCells.current += 1;
        }

        if (wrongCells.current === 3) {
            setGameState('game-lost');
        }
        if (correctCells.current === 6) {
            setGameState('game-won');
        }
    }

    //manages color of cells
    const cellColor = (cellNumber) => {
        if (gameState === 'display-mem-cells' && memCells.includes(cellNumber)) {
            return colors.memoryColor;
        }
        if (gameState === 'recall-cells') {
            if (memCells.includes(cellNumber) && clickedCells.includes(cellNumber)) {
                return colors.correctColor;
            }
            if (!(memCells.includes(cellNumber)) && clickedCells.includes(cellNumber)) {
                return colors.wrongColor;
            }
        }
    }

    //sends a message based on the state of the game
    const displayMessage = () => {
        switch (gameState) {
            case 'game-inactive': return 'You have 3 seconds to memorize 6 random blue cells';
            case 'display-mem-cells': return 'Memorize these cells';
            case 'recall-cells': return 'Recall the blue cells and click on them';
            case 'game-won': return 'You won!';
            case 'game-lost': return 'You lost. Try again!';
        }
    }

    return (
        <div className = "game">
            <div className="help">{displayMessage()}</div>
            <div className = "gamebody">
                {utils.range(1, 25).map(cellNumber =>
                    <Cell
                        key={cellNumber}
                        cellColor={cellColor(cellNumber)}
                        handleClick={() => handleClick(cellNumber)}
                    />
                )}
            </div>
            <Footer
                startGame={() => setGameState('display-mem-cells')}
                playAgain={incrementId}
                displayStartButton={gameState === 'game-inactive'}
                displayButton={(gameState === 'game-won' || 
                gameState === 'game-lost')}
            />
        </div>
    );
}

export default MemoryGame;