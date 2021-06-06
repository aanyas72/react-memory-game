import { useState } from "react";
import MemoryGame from "./MemoryGame";

const App = () => {
    const [gameId, setGameId] = useState(0);

    return (
        <MemoryGame key={gameId} incrementId={() => setGameId(gameId + 1)} />
    );
}

export default App;