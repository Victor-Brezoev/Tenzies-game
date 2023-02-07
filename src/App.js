import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(newDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect( () => {
    const allDices = dice.every(die => die.isHeld)
    const sameValue = dice.every(die=> die.value === dice[0].value)
    if(allDices && sameValue) {
      setTenzies(true)
    }
  }, [dice])


  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function newDice() {
    const newDie = []
    for (let i = 0; i < 10 ; i++) {
      newDie.push(generateNewDice())
    }
    return newDie
  }
  
  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(newDice())
    }
  }

  function holdDice(id) {
    setDice(odlDice => odlDice.map( die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }
    const diceElem = dice.map(die => 
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>)

  return (
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="subtitle">You must roll until you have the same numbers. Click on the die to freeze it at its current value.</p>
          <div className="dice-container">  
              {diceElem}
          </div>
          <button
           className="btn"
           onClick={rollDice}
           >
            {tenzies ? "New Game" : "Roll"}</button>
      </main>
  )
}
