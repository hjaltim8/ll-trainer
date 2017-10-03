import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Squares from '../Squares'

class Combo extends Component {

    render() {
        let front = []
        let right = []
        let back = []
        let left = []
        if (this.props.squares != null && this.props.squares.length === 12) {
            front = this.props.squares.slice(0, 3)
            right = this.props.squares.slice(3, 6)
            back = this.props.squares.slice(6, 9)
            left = this.props.squares.slice(9, 12)
        } else if (this.props.colors != null && this.props.colors.length === 12) {
            let ids = ['fl', 'fc', 'fr', 'rf', 'rc', 'rb', 'br', 'bc', 'bl', 'lb', 'lc', 'lf']
            if (this.props.ids != null && this.props.ids.length === 12) {
                ids = [...this.props.ids]
            }
            let strong = Array(12).fill(true)
            if (this.props.bold != null && this.props.bold.length === 12) {
                strong = [...this.props.bold]
            }
            let neutral = Array(12).fill(false)
            if (this.props.neutral != null && this.props.neutral.length === 12) {
                neutral = [...this.props.neutral]
            } else if (this.props.colored != null && this.props.colored.length === 12) {
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
            back = squares.slice(6, 9)
            left = squares.slice(9, 12)
        }
        else {
            return null
        }

        let size = 50
        if (this.props.size != null) { size = this.props.size}

        front = <Squares squares={front} size={size} />
        right = <Squares squares={right} size={size} />
        back = <Squares squares={back} size={size} />
        left = <Squares squares={left} size={size} />

        const frontText = this.props.showTitle
            ? <h3>{this.props.textFront}</h3>
            : null

        const rightText = this.props.showTitle
            ? <h3>{this.props.textRight}</h3>
            : null

        const backText = this.props.showTitle
            ? <h3>{this.props.textBack}</h3>
            : null

        const leftText = this.props.showTitle
            ? <h3>{this.props.textLeft}</h3>
            : null

        return (
            <div className="container">
                <div className="front">
                    {frontText}
                    {front}
                </div>
                <div className="right">
                    {rightText}
                    {right}
                </div>
                <div className="back">
                    {backText}
                    {back}
                </div>
                <div className="left">
                    {leftText}
                    {left}
                </div>
            </div>
        )
    }
}

Combo.propTypes = {
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
    textFront: PropTypes.string,
    textRight: PropTypes.string,
    textBack: PropTypes.string,
    textLeft: PropTypes.string,
    showTitle: PropTypes.bool,
}

Combo.defaultProps = {
    textFront: 'Front',
    textRight: 'Right',
    textBack: 'Back',
    textLeft: 'Left',
    showTitle: true,
}

export default Combo
