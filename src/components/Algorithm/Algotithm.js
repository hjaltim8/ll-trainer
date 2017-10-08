import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Algorithm.css'

class Algorithm extends Component {

    constructor(props) {
        super(props)

        this.linkTemplate = 'https://alg.cubing.net/?alg={alg}&title={title}&stage=PLL&type=alg&view=playback'
    }

    renderSetupMove() {
        if (this.props.setupMove === '') return null

        return <span className="algSetupMove">[{this.props.setupMove}]</span>
    }

    renderAlgorithm() {
        const link = this.linkTemplate.replace('{alg}', this.props.linkified).replace('{title}', `${this.props.title}-Perm`)
        let text = this.props.algorithm
        // if (this.props.setupMove !== '') text = `[${this.props.setupMove}] ${text}`
        return (
            <a className="algLink" href={link} target="_blank">{text}</a>
        )
    }

    renderUserCount() {
        return <span className="algUserCount">({this.props.userCount})</span>
    }

    render() {
        return (
            <div className="algContainer">
                {this.renderSetupMove()}
                {this.renderAlgorithm()}
                {this.renderUserCount()}
            </div>
        )
    }
}

Algorithm.propTypes = {
    title: PropTypes.string,
    setupMove: PropTypes.string, // Could be oneOf() instead
    algorithm: PropTypes.string,
    userCount: PropTypes.number,
    date: PropTypes.string,
    linkified: PropTypes.string,
}

export default Algorithm
