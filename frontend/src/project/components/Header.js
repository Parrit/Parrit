import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
    render() {
        const classes = 'history' + (this.props.isPairingHistoryPanelOpen ? ' open' : '');

        return <header>
            <a href="/" className="header-logo"/>
            <div className="links">
                <h3 className="logout" onClick={this.props.postLogout}>LOGOUT</h3>
                <h3 className="feedback">
                    <a href="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2" target="_blank" rel="noopener">feedback</a>
                </h3>
                <h3 className={classes} onClick={this.props.isPairingHistoryPanelOpen ? this.closePairingHistoryPanel.bind(this) : this.openPairingHistoryPanel.bind(this)}>HISTORY
                    <div className={this.props.isPairingHistoryPanelOpen ? 'history-caret-right' : 'history-caret-left'}/>
                </h3>
            </div>
        </header>
    }

    openPairingHistoryPanel() {
        this.props.setPairingHistoryPanelOpen(true);
    }

    closePairingHistoryPanel() {
        this.props.setPairingHistoryPanelOpen(false);
    }
}

Header.propTypes = {
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    isPairingHistoryPanelOpen: PropTypes.bool.isRequired,
    postLogout: PropTypes.func.isRequired
};
