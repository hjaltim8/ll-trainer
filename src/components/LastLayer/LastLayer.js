import _ from 'lodash'
import React, { Component } from 'react'
import Squares from '../Squares'
import {
    getRandomPll,
    getSidePairPatterns,
    getRecognitions,
} from '../../utils/inputs'
import './LastLayer.css'

class LastLayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            colors: ['G', 'B', 'B', 'R', 'R', 'G'],
            pll: {},
        }
    }

    componentDidMount() {
        const pll = getRandomPll()
        const patterns = getSidePairPatterns(pll.match.slice(0,6))
        const recogn = getRecognitions(pll.match.slice(0,6))
        console.log('cdm', pll, patterns, recogn)
        this.setState({
            colors: pll.colored.slice(0,6).split(''),
            pll,
            patterns,
            recognition: recogn,
        })

        console.log('colors: ', pll.colored.slice(0,6).split(''))
        console.log('pll: ', pll)
        console.log('patterns: ', patterns)
        console.log('recognition: ', recogn)    
    }

    renderSquares = () => {
        const sides = ['fl', 'fc', 'fr', 'rf', 'rc', 'rb']
        let index = -1
        const cases = sides.map(v => {
            index += 1
            return {
                id: v,
                strong: true,
                color: this.state.colors[index]
            }
        })
        const x = _.mapKeys(cases, 'id')
        return <Squares cases={x} size={50} />
    }

    renderCategorySquares = () => {
        const sides = ['fl', 'fc', 'fr', 'rf', 'rc', 'rb']
        const bold = this.state.recognition.category.bold
        let index = -1
        const cases = sides.map(v => {
            index += 1
            return {
                id: v,
                strong: bold[index],
                color: this.state.colors[index]
            }
        })
        const x = _.mapKeys(cases, 'id')
        return <Squares cases={x} size={50} />
    }

    renderLookForSquares = () => {
        const sides = ['fl', 'fc', 'fr', 'rf', 'rc', 'rb']
        const bold = this.state.recognition.lookFor.bold
        let index = -1
        const cases = sides.map(v => {
            index += 1
            return {
                id: v,
                strong: bold[index],
                color: this.state.colors[index]
            }
        })
        const x = _.mapKeys(cases, 'id')
        return <Squares cases={x} size={50} />
    }

    render() {
        if (_.isEmpty(this.state.pll)) return null
        // const squares = this.state.colors.map(c => <Square color={c} />)
        let counter = 0
        const front = this.state.pll.colored.slice(0,3).split('').map(c => {
            let left = counter === 0
            counter += 1
            return <Square color={c} left={left} />
        })
        const right = this.state.pll.colored.slice(3,6).split('').map(c => <Square color={c} />)
        const back = this.state.pll.colored.slice(6,9).split('').map(c => <Square color={c} />)
        const left = this.state.pll.colored.slice(9,12).split('').map(c => <Square color={c} />)

        const squares = this.renderSquares()
        const categorySquares = this.renderCategorySquares()
        const lookForSquares = this.renderLookForSquares()

        return (
            <div>
                {squares}
                <h1>{this.state.pll.id}</h1>
                <div className="container">
                    <div className="front">
                        <h3>Front</h3>
                        <div className="container">{front}</div>
                    </div>
                    <div className="right">
                        <h3>Right</h3>
                        <div className="container">{right}</div>
                    </div>
                </div>
                <div className="container" style={{ display: 'none' }}>
                    <div className="back">
                        <h3>Back</h3>
                        <div className="container">{back}</div>
                    </div>
                    <div className="left">
                        <h3>Left</h3>
                        <div className="container">{left}</div>
                    </div>
                </div>
                <h2>Lights: {this.state.pll.lightsOn}</h2>
                <h2>Solved sides: {this.state.pll.solvedOn}</h2>
                <h2>Recognize first by: {this.state.recognition.category.name}</h2>
                {categorySquares}
                <h2>Then look for: {this.state.recognition.lookFor.description}</h2>
                {lookForSquares}
                <h2>This recognition works for: {this.state.recognition.cases}</h2>
                <h2>Patterns: {JSON.stringify(this.state.patterns)}</h2>
            </div>
        )
    }
}

const Square = (props) => {
    let className = 'child borders '
    if (props.color === 'R') className += 'red'
    if (props.color === 'G') className += 'green'
    if (props.color === 'B') className += 'blue'
    if (props.color === 'O') className += 'orange'
    if (props.left === true) className += ' leftBorder'
    return <div className={className}></div>
}

export default LastLayer
