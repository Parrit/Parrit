import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { clearSystemAlertMessage } from '../actions/creators/SettingsCreators'

class SystemAlert extends React.Component {
    render() {
        const message = this.props.systemAlertMessage

        const classes = classNames({
            'system-alert': true,
            'system-alert-closed': message === undefined
        })

        return (
            <div className={classes}>
                <div className="message">{message}</div>
                <div className="close" onClick={this.props.close}><div className="icon"/></div>
            </div>
        )
    }
}

SystemAlert.propTypes = exact({
    systemAlertMessage: PropTypes.string,
    close: PropTypes.func.isRequired
})

function mapStateToProps({settings}) {
    return {
        systemAlertMessage: settings.systemAlert.message
    }
}

const mapDispatchToProps = {
    close: clearSystemAlertMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAlert)
