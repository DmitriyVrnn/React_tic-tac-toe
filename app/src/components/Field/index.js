import React, {Component} from 'react'
import Square from '../Square/index'

export default class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            isNextSymbol: "X",
            playerWinner: null,
        }
    }

    checkWinner() {
        let winnerCombo = [
            ['0', '1', '2'],
            ['3', '4', '5'],
            ['6', '7', '8'],
            ['0', '3', '6'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['0', '4', '8'],
            ['2', '4', '6']
        ]
        this.clickCheckMatch(winnerCombo)
    }

    clickCheckMatch = (winnerCombo) => {
        const currentSymbol = this.state.isNextSymbol
        const statusCurrentBoard = this.state.board
        winnerCombo.findIndex((variantCombo) => {
            const checkEmptyCell = (statusCurrentBoard[variantCombo[0]] && statusCurrentBoard[variantCombo[1]] &&
                statusCurrentBoard[variantCombo[2]]) !== null
            const checkWinner = statusCurrentBoard[variantCombo[0]] === statusCurrentBoard[variantCombo[1]] &&
                statusCurrentBoard[variantCombo[1]] === statusCurrentBoard[variantCombo[2]]
            if (checkEmptyCell && checkWinner) {
                return this.setState({
                    playerWinner: 'Победитель ' + currentSymbol
                })
            }
            return false
        })
    }

    handleClick(i) {
        let newBoard = this.state.board
        if (this.state.board[i] === null && !this.state.playerWinner) {
            newBoard[i] = this.state.isNextSymbol
            this.setState({
                board: newBoard,
                isNextSymbol: this.state.isNextSymbol === "X" ? "0" : "X"
            })
            this.checkWinner()
        }
    }

    resetGame = () => {
        this.setState({
            board: Array(9).fill(null),
            isNextSymbol: "X",
            playerWinner: null
        })
    }

    render() {
        const {playerWinner, board, isNextSymbol} = this.state
        const renderCells = board.map((cells, i) =>
            <Square onClick={() => this.handleClick(i)} value={cells} key={i}/>);
        return (
            <div className={"container"}>
                <div className={"board"}>
                    {renderCells}
                </div>
                <div className={"game-info"}>Game info: {playerWinner ? playerWinner : 'Ход - ' + isNextSymbol} </div>
                <button className={"reset-button"} onClick={this.resetGame}>Reset</button>
            </div>
        )
    }
}

