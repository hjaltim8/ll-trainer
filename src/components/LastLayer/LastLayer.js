import _ from 'lodash'
import React, { Component } from 'react'
import Halfie from '../Halfie'
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
        return <Halfie colors={this.state.colors} />
    }

    renderCategorySquares = () => {
        return (
            <Halfie
                showTitle={false}
                colors={this.state.colors}
                bold={this.state.recognition.category.bold}
                colored={this.state.recognition.category.colored}
                size={50}
            />)
    }

    renderLookForSquares = () => {
        return (
            <Halfie
                showTitle={false}
                colors={this.state.colors}
                bold={this.state.recognition.lookFor.bold}
                colored={this.state.recognition.lookFor.colored}
                size={50}
            />)
    }

    render() {
        if (_.isEmpty(this.state.pll)) return null

        const squares = this.renderSquares()
        const categorySquares = this.renderCategorySquares()
        const lookForSquares = this.renderLookForSquares()

        return (
            <div>
            <h1>{this.state.pll.id}</h1>
                {squares}
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

export default LastLayer
