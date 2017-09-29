import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Square from '../Square'

class Squares extends Component {

    renderSquare = (id, leftStrong, color, strong, first, last) => {
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
        }
        return <Square key={id} {...props} />
    }

    render() {
        const fl = this.renderSquare(
            'fl',
            false,
            this.props.cases['fl'].color,
            this.props.cases['fl'].strong,
            true,
            false)
        const fc = this.renderSquare(
            'fc',
            this.props.cases['fl'].strong,
            this.props.cases['fc'].color,
            this.props.cases['fc'].strong,
            false,
            false)
        const fr = this.renderSquare(
            'fr',
            this.props.cases['fc'].strong,
            this.props.cases['fr'].color,
            this.props.cases['fr'].strong,
            false,
            false)
        const rf = this.renderSquare(
            'rf',
            this.props.cases['fr'].strong,
            this.props.cases['rf'].color,
            this.props.cases['rf'].strong,
            false,
            false)
        const rc = this.renderSquare(
            'rc',
            this.props.cases['rf'].strong,
            this.props.cases['rc'].color,
            this.props.cases['rc'].strong,
            false,
            false)
        const rb = this.renderSquare(
            'rb',
            this.props.cases['rc'].strong,
            this.props.cases['rb'].color,
            this.props.cases['rb'].strong,
            false,
            true)
        return (<div>
            <div className="container">{fl}{fc}{fr}{rf}{rc}{rb}</div>
        </div>)
    }
}

Squares.propTypes = {
    cases: PropTypes.shape({
        key: PropTypes.oneOf(['fl', 'fc', 'fr', 'rf', 'rc', 'rb']),
        value: PropTypes.shape({
            id: PropTypes.oneOf(['fl', 'fc', 'fr', 'rf', 'rc', 'rb']),
            strong: PropTypes.bool,
            color: PropTypes.oneOf(['R', 'G', 'B', 'O', 'Y', 'W', 'X']),
        }),
    }),
    size: PropTypes.number,
}

export default Squares
