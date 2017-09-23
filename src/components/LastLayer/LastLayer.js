import _ from 'lodash'
import React, { Component } from 'react'
import { getRandomPll, getSidePairPatterns } from '../../utils/inputs'
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
        console.log('cdm', pll, patterns)
        this.setState({
            colors: pll.colored.slice(0,6).split(''),
            pll,
            patterns,
        })
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
        return (
            <div>
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
