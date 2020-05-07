import React, {Component} from 'react';
import './App.css';

import LetterButton from './LetterButton';

const LETTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const WORDS = [
  'BONJOUR',
  'THEO',
  'BARBER SHOP',
  'REACT',
  'CORONAVIRUS',
  'MARIE',
]

class App extends Component {
  state = {
    lettersList: this.setLetters(),
    word: this.randomWord(),
    usedLetters: [],
    score: 0
  }

  randomWord(){
    const index = Math.floor(Math.random() * WORDS.length)
    return WORDS[index]
  }

  randomWordUpdate = () =>
  {
    const index = Math.floor(Math.random() * WORDS.length)
    this.setState({
      word: WORDS[index],
      usedLetters:[]
    })
  }

  setLetters(){
    const lettersList = []
    for(let i=0; i<LETTER.length; i++){
      lettersList[i] = LETTER[i]
    }
    return lettersList
  }

  computeDisplay = (word, usedLetters) => { 
    for(let i=0; i<word.length; i++){
      let letter = word[i]
      if (letter !== ' '){
        word = word.replace(letter, usedLetters.includes(letter) ? letter : '_')
      }
    }
    return word
  }

  handleClick = (letter) => {
    const {usedLetters} = this.state
    if (!usedLetters.includes(letter)){
      this.setState({usedLetters:[...usedLetters,letter]})
    } 
  }

  setButtonState = (letter) => {
    const {usedLetters} = this.state
    return usedLetters.includes(letter) ? 'clicked' : ''
  }
  
  render(){
    const {lettersList, word, usedLetters} = this.state
    return (
      <div className="pendu">
          <h1>Bienvenue sur le jeu du pendu</h1>
          <h2>Serez-vous capable de trouver le mot caché ?</h2>
        <div className="words">
          {this.computeDisplay(word,usedLetters)}
        </div>
        <div className="LetterButtons">
          {this.computeDisplay(word,usedLetters).includes('_') ?
            ( 
              lettersList.map((letter) => (
              <LetterButton 
                letter = {letter}
                key={letter}
                onClick={this.handleClick}
                buttonState={this.setButtonState(letter)}
              />
            )))
          : (<div>
                <h3>Félicitations ! Vous souhaitez rejouer ?</h3>
                <button onClick={this.randomWordUpdate}>Recommencer</button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;
