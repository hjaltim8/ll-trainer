import _ from 'lodash'
import React, { Component } from 'react'
import Combo from '../Combo'
import Halfie from '../Halfie'
import Squares from '../Squares'
import {
    getRandomPll,
    getSidePairPatterns,
    getRecognitions,
    getRandomColors,
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
        console.log(pll)
        // const patterns = getSidePairPatterns(pll.match.slice(0,6))
        // const recogn = getRecognitions(pll.match.slice(0,6))
        // console.log('cdm', pll, patterns, recogn)
        const colored = getRandomColors(pll.neutralized)
        this.setState({
            colors: colored.slice(0, 6).split(''),//.slice(0,6).split(''),
            colored: colored.split(''),
            pll,
            patterns: pll.patterns,
            recognition: pll.recognitions, //recogn,
        })

        console.log('colors: ', pll.colored)//.slice(0,6).split(''))
        console.log('pll: ', pll)
        console.log('patterns: ', pll.patterns)
        console.log('recognition: ', pll.recognition)    
    }

    renderSquares = () => {
        return <Halfie colors={this.state.colors} size={50} />
    }

    renderCategorySquares = () => {
        return (
            <Halfie
                showTitle={false}
                colors={this.state.colors}
                bold={this.state.recognition.category.bold}
                colored={this.state.recognition.category.colored}
                size={25}
            />)
    }

    renderLookForSquares = () => {
        return (
            <Halfie
                showTitle={false}
                colors={this.state.colors}
                bold={this.state.recognition.lookFor.bold}
                colored={this.state.recognition.lookFor.colored}
                size={25}
            />)
    }

    renderLights = () => {
        console.log('lights: ', this.state.pll.lights)
        return (
            <Combo
                showTitle={true}
                colors={this.state.colored}
                bold={this.state.pll.lights.bold}
                size={25}
            />
        )
    }

    renderSolved = () => {
        console.log('solved: ', this.state.pll.solved)
        return (
            <Combo
                showTitle={true}
                colors={this.state.colored}
                bold={this.state.pll.solved.bold}
                size={25}
            />
        )
    }

    render() {
        if (_.isEmpty(this.state.pll)) return null

        const squares = this.renderSquares()
        const lights = this.renderLights()
        const solved = this.renderSolved()
        const categorySquares = this.renderCategorySquares()
        const lookForSquares = this.renderLookForSquares()

        return (
            <div>
            <h1>{this.state.pll.pll}</h1>
                {squares}
                <h2>Lights: {this.state.pll.lights.description}</h2>
                {lights}
                <h2>Solved sides: {this.state.pll.solved.description}</h2>
                {solved}
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
