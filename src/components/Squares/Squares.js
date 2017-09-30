import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Square from '../Square'

class Squares extends Component {

    renderSquare = (id, leftStrong, color, strong, neutral, first, last) => {
        const props = {
            color,
            border: {
                strong,
                top: true,
                bottom: true,
                left: first || !leftStrong,
                right: last || strong,
            },
            size: this.props.size,
            light: !strong,
            neutral: neutral,
        }
        return <Square key={id} {...props} />
    }

    render() {
        const result = []
        for (let i=0; i < this.props.squares.length; i++) {
            result.push(
                this.renderSquare(
                this.props.squares[i].id,
                i === 0 ? false : this.props.squares[i-1].strong,
                this.props.squares[i].color,
                this.props.squares[i].strong,
                this.props.squares[i].neutral,
                i === 0,
                i === this.props.squares.length - 1)
            )
        }

        return (<div className="container">
            {result}
        </div>)
    }
}

Squares.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.shape({
        // id: PropTypes.oneOf(['fl', 'fc', 'fr', 'rf', 'rc', 'rb']),
        strong: PropTypes.bool,
        color: PropTypes.oneOf(['R', 'G', 'B', 'O', 'Y', 'W', 'X']),
        neutral: PropTypes.bool,
    })),
    size: PropTypes.number,
}

export default Squares
