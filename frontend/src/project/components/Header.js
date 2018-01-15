import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Header extends React.Component {
    render() {
        const pairingHistoryOpen = this.props.isPairingHistoryPanelOpen;
        const classes = classNames({
            'history': true,
            'open': pairingHistoryOpen
        });

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

export default Header;
