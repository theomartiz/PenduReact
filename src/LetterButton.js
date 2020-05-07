import React from 'react'

const LetterButton = ({letter, onClick, buttonState}) => (
    <div>
        <button className={`${buttonState}`} onClick={() => onClick(letter)}>{letter}</button>
    </div>
)


export default LetterButton