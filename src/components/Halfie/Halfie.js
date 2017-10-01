import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Squares from '../Squares'

class Halfie extends Component {

    render() {
        let front = []
        let right = []
        if (this.props.squares != null && this.props.squares.length === 6) {
            front = this.props.squares.slice(0, 3)
            right = this.props.squares.slice(3, 6)
        } else if (this.props.colors != null && this.props.colors.length === 6) {
            let ids = ['fl', 'fc', 'fr', 'rf', 'rc', 'rb']
            if (this.props.ids != null && this.props.ids.length === 6) {
                ids = [...this.props.ids]
            }
            let strong = Array(6).fill(true)
            if (this.props.bold != null && this.props.bold.length === 6) {
                strong = [...this.props.bold]
            }
            let neutral = Array(6).fill(false)
            if (this.props.neutral != null && this.props.neutral.length === 6) {
                neutral = [...this.props.neutral]
            } else if (this.props.colored != null && this.props.colored.length === 6) {
                neutral = this.props.colored.map(c => !c)
            }
            let index = -1
            const squares = ids.map(id => {
                index += 1
                return {
                    id,
                    strong: strong[index],
                    color: this.props.colors[index],
                    neutral: neutral[index]
                }
            })
            front = squares.slice(0, 3)
            right = squares.slice(3, 6)
        }
        else {
            return null
        }

        let size = 100
        if (this.props.size != null) { size = this.props.size}

        front = <Squares squares={front} size={size} />
        right = <Squares squares={right} size={size} />

        return (
            <div className="container">
                <div className="front">
                    <h3>Front</h3>
                    {front}
                </div>
                <div className="right">
                    <h3>Right</h3>
                    {right}
                </div>
            </div>
        )
    }
}

Halfie.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.shape({
        // id: PropTypes.oneOf(['fl', 'fc', 'fr', 'rf', 'rc', 'rb']),
        strong: PropTypes.bool,
        color: PropTypes.oneOf(['R', 'G', 'B', 'O', 'Y', 'W', 'X']),
        neutral: PropTypes.bool,
    })),
    ids: PropTypes.arrayOf(PropTypes.string),
    bold: PropTypes.arrayOf(PropTypes.bool),
    colors: PropTypes.arrayOf(PropTypes.oneOf(['R', 'G', 'B', 'O', 'Y', 'W', 'X'])),
    colored: PropTypes.arrayOf(PropTypes.bool),
    neutral: PropTypes.arrayOf(PropTypes.bool),
    size: PropTypes.number,
}

export default Halfie
