const Cell = ({ cellColor, handleClick }) => {
    return (
        <div
            className='cell'
            style={{ backgroundColor: cellColor }}
            onClick={handleClick}
        ></div>
    );
}

export default Cell;