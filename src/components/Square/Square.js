import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Square extends Component {
    render() {
        let className = 'square'
        switch (this.props.color) {
            case 'R': className += ' red'; break
            case 'G': className += ' green'; break
            case 'B': className += ' blue'; break
            case 'O': className += ' orange'; break
            case 'Y': className += ' yellow'; break
            case 'W': className += ' white'; break
            default: className += ' gray'; break
        }
        if (this.props.border.left) className += ' leftBorder'
        if (this.props.border.right) className += ' rightBorder'
        if (this.props.border.top) className += ' topBorder'
        if (this.props.border.bottom) className += ' bottomBorder'
        if (this.props.light) className += ' lighten'
        if (this.props.neutral) className += ' neutral'
        className += (this.props.border.strong ? ' strongBorder' : ' weakBorder')

        console.log('props in Square: ', this.props)

        const styles = {
            width: this.props.size + 'px',
            height: this.props.size + 'px',
        }

        return <div className={className} style={styles} />
    }
}

Square.propTypes = {
    color: PropTypes.oneOf(['R', 'G', 'B', 'O', 'Y', 'W', 'X']),
    border: PropTypes.shape({
        left: PropTypes.bool,
        right: PropTypes.bool,
        top: PropTypes.bool,
        bottom: PropTypes.bool,
        strong: PropTypes.bool,
    }),
    size: PropTypes.number,
    light: PropTypes.bool,
    neutral: PropTypes.bool,
}

export default Square
