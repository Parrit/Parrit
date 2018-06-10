import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { setPairingHistoryPanelOpenCreator } from '../actions/creators/SettingsCreators'
import { postLogoutThunk } from '../actions/thunks/DataThunks'

class Header extends React.Component {
    render() {
        const pairingHistoryOpen = this.props.isPairingHistoryPanelOpen
        const classes = classNames({
            'history': true,
            'open': pairingHistoryOpen
        })

        return (
            <header>
                <a href="/" className="header-logo"/>
                <div className="links">
                    <h3 className="logout" onClick={this.props.postLogout}>LOGOUT</h3>
                    <h3 className="feedback">
                        <a href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2" target="_blank" rel="noopener">feedback</a>
                    </h3>
                    <h3 className={classes} onClick={pairingHistoryOpen ? this.closePairingHistoryPanel.bind(this) : this.openPairingHistoryPanel.bind(this)}>HISTORY
                        <div className={pairingHistoryOpen ? 'history-caret-right' : 'history-caret-left'}/>
                    </h3>
                </div>
            </header>
        )
    }

    openPairingHistoryPanel() {
        this.props.setPairingHistoryPanelOpen(true)
    }

    closePairingHistoryPanel() {
        this.props.setPairingHistoryPanelOpen(false)
    }
}

Header.propTypes = exact({
    isPairingHistoryPanelOpen: PropTypes.bool.isRequired,
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    postLogout: PropTypes.func.isRequired
})

function mapStateToProps({settings}) {
    return {
        isPairingHistoryPanelOpen: settings.pairingHistoryPanel.isOpen
    }
}

const mapDispatchToProps = {
    setPairingHistoryPanelOpen: setPairingHistoryPanelOpenCreator,
    postLogout: postLogoutThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
