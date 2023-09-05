import readline from 'readline'

import Loading from './modules/loading.js'
import FlashingText from './modules/flashingText.js'
import TickTackToe from './modules/tickTackToe.js'

// blocks the following code from executing before the loading animation is done
const loading = new Loading('😊', '▮', '▯', 10)
loading.startLoading(2 + (Math.random() * (5 - 2)))

const rl = readline.createInterface(process.stdin, process.stdout)

const flashing = new FlashingText('Press enter to start Tic-Tac-Toe!', 400)
const ticktackToe = new TickTackToe(['O', 'X'], 'X')

const startNewGame = () => {
  flashing.startFlashing()

  const startInput = (input) => {
    flashing.stopFlashing()
    ticktackToe.startGame('X')
    rl.removeListener('line', startInput)

    const gameListener = (input) => {
      if (!ticktackToe) {
        // Game hasn't started yet.
        return
      }
    
      ticktackToe.handleInput(parseInt(input))
      const winner = ticktackToe.checkWinner()
    
      if (winner) {
        rl.removeListener('line', gameListener)
        handleGameOver(winner)
      }
    }
    rl.on('line', gameListener)
  }

  rl.on('line', startInput)
}

const handleGameOver = (winner) => {
  console.log(`Player ${winner} has won!`)

  rl.question('Would you like to play again? (yes/no)\n', (input) => {
    if (input.match(/^y(es)?$/i)) {
      ticktackToe.resetGame()
      startNewGame()
    } else {
      rl.close()
    }
  })
}

rl.on('SIGINT', () => {
  flashing.stopFlashing()
  rl.question('Would you like to exit the console application? (yes/no)\n', (input) => {
    if (input.match(/^y(es)?$/i)) {
      rl.close()
    } else {
      flashing.startFlashing()
    }
  })
})

startNewGame() // Start the initial game.
