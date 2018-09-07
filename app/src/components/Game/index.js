import React, {Component} from 'react'
import './styles/styles.css'
import Field from '../Field/index'

class Game extends Component {
    render() {
        return (
            <div>
                <span className={"title"}>Крестики - нолики</span>
                <Field/>
            </div>
        )
    }
}

export default Game;
