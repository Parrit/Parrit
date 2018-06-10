import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { connect } from 'react-redux'

import PairingBoard from './PairingBoard.js'

class PairingBoardList extends React.Component {
    render() {
        return (
            <div className="pairing-boards">
                {this.props.pairingBoards.map((pairingBoard, idx) => {
                    const settings = this.props.pairingBoardSettings[pairingBoard.id] || {}

                    return <PairingBoard
                                key={idx}
                                id={pairingBoard.id}
                                name={pairingBoard.name}
                                exempt={pairingBoard.exempt}
                                people={pairingBoard.people}
                                roles={pairingBoard.roles}
                                editMode={settings.editMode || false}
                                editErrorMessage={settings.editErrorMessage}
                            />
                })}
            </div>
        )
    }
}

PairingBoardList.propTypes = exact({
    pairingBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
    pairingBoardSettings: PropTypes.object.isRequired
})

function mapStateToProps({data, settings}) {
    return {
        pairingBoards: data.project.pairingBoards,
        pairingBoardSettings: settings.pairingBoardSettings
    }
}

export default connect(mapStateToProps, {})(PairingBoardList)
