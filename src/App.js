import React, { Component } from "react";
import { Sudoku } from "./components/Sudoku.js";
import { Clock } from "./components/Clock.js";
import { gradients } from "./helpers/Gradients.js";
import { Modal } from "./components/Modal.js";
import "./styles/App.css";

class App extends Component {
    constructor() {
        super();
        const color = gradients[Math.floor(Math.random() * gradients.length)];
        this.state = {
            selectedColor: color,
            isRunning: true,
            showEndScreen: false
        };
    }

    changeColor = () => {
        const selectedColor =
            gradients[Math.floor(Math.random() * gradients.length)];
        this.setState({ selectedColor });
    };

    handleNewGame = () => {
        this.setState({
            isRunning: true,
            showEndScreen: false
        })
    }

    render() {
        const col = this.state.selectedColor;
        const outerStyle = {
            background: `linear-gradient(45deg,${col.start},${col.end})`
        };
        return (
            <div style={outerStyle} className="App">
                <Sudoku
                    onColorChange={this.changeColor}
                    handleGameOver={() =>
                        this.setState({ isRunning: false, showEndScreen: true })
                    }
                />
                <Clock isRunning={this.state.isRunning} />

                <Modal
                    show={this.state.showEndScreen}
                    handleNewGame={() => window.location.reload()}
                />
            </div>
        );
    }
}

export default App;
