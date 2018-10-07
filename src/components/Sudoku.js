import React, { Component } from 'react'
import '../styles/Sudoku.css'

export class Sudoku extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: [],
            selectedDifficulty: 'easy',
            options: [
                'easy',
                'medium',
                'hard',
                'very-hard',
                'insane',
                'inhuman'
            ]
        }
    }

    componentDidMount() {
        this.generateTable()
    }

    splitAt = (index, x) => x.slice(index - 9, index)

    generateTable = () => {
        const sudokuString = window.sudoku.generate(
            this.state.selectedDifficulty
        )
        const table = Array(9).fill('.')
        for (let i = 0; i < table.length; i++) {
            const row = [...this.splitAt(9 * (i + 1), sudokuString)]
            table[i] = row.map(cell => {
                if (cell !== '.') {
                    return {
                        value: cell,
                        isStartValue: true,
                        className: ''
                    }
                }
                return {
                    value: '',
                    isStartValue: false,
                    className: ''
                }
            })
        }
        this.setState({ table }, this.generateClassNames)
    }

    generateClassNames = () => {
        const { table } = this.state

        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
                table[i][j].className =
                    (j + 1) % 3 === 0 && (j + 1) % 9 !== 0
                        ? (i + 1) % 3 === 0 && (i + 1) % 9 !== 0
                            ? 'cell border-right border-bottom'
                            : 'cell border-right'
                        : (i + 1) % 3 === 0 && (i + 1) % 9 !== 0
                            ? 'cell border-bottom'
                            : 'cell'
            }
        }
        this.setState({ table })
    }

    handleDifficulty = event => {
        this.setState(
            {
                selectedDifficulty: event.target.value
            },
            this.generateTable
        )
    }

    handleNewGame = () => {
        this.generateTable()
        this.props.onColorChange()
    }

    validateGameOver = () => {
        const { table } = this.state
        if (table.every(row => row.every(cell => cell.value !== ''))) {
            this.props.handleGameOver()
        }
    }

    handleCellChange = (value, row, column) => {
        const val = parseInt(value.slice(-1), 10)
        if (val && this.validate(value.slice(-1), row, column)) {
            const { table } = this.state
            table[row][column].value = value.slice(-1)
            this.setState({ table }, this.validateGameOver)
        } else if (value === '') {
            const { table } = this.state
            table[row][column].value = value
            this.setState({ table })
        }
    }

    validate = (value, row, column) => {
        const { table } = this.state

        if (!table[row].every(cell => cell.value !== value)) {
            return false
        }

        for (let i = 0; i < table.length; i++) {
            if (table[i][column].value === value) {
                return false
            }
        }

        const area = this.getArea(row, column)
        const cells = 3
        for (let i = cells * area[0]; i < cells * (area[0] + 1); i++) {
            for (let j = cells * area[1]; j < cells * (area[1] + 1); j++) {
                console.log(table[i][j])
                if (table[i][j].value === value) {
                    return false
                }
            }
        }
        return true
    }

    getArea = (row, column) => [Math.floor(row / 3), Math.floor(column / 3)]

    render() {
        return (
            <div className="sudoku-wrapper">
                <section className="sudoku-table">
                    {this.state.table.map((row, rowIndex) =>
                        row.map((cell, columnIndex) => (
                            <div className={cell.className} key={columnIndex}>
                                <input
                                    type="text"
                                    value={cell.value}
                                    onChange={event =>
                                        this.handleCellChange(
                                            event.target.value,
                                            rowIndex,
                                            columnIndex
                                        )
                                    }
                                    disabled={cell.isStartValue}
                                />
                            </div>
                        ))
                    )}
                </section>
                <button onClick={this.handleNewGame}>NEW</button>
                <select onChange={this.handleDifficulty}>
                    {this.state.options.map((option, index) => (
                        <option key={index} defaultValue={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}
