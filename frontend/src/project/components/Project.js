import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { connect } from 'react-redux'

import { resetProjectThunk, getRecommendedPairsThunk, savePairingThunk } from '../actions/thunks/DataThunks.js'
import Workspace from './Workspace.js'
import Button from '../../shared/components/Button.js'

class Project extends React.Component {
    render() {
        return (
            <main className="project">
                <div className="sub-header">
                    <h1 className="project-name">{this.props.data.project.name}</h1>
                    <div className="project-actions">
                        <Button className="button-blue" tooltip="Move All Pairs to Floating" name="Reset Pairs" shortName="Reset" clickFunction={this.props.resetPairs} />
                        <Button className="button-blue" tooltip="Automatically suggest pairings based on last paired date" name="Recommend Pairs" shortName="Recommend" clickFunction={this.props.getRecommendedPairs}/>
                        <Button className="button-green" tooltip="Make note of parings for future recommendations" name="Record Pairs" shortName="Record" clickFunction={this.props.savePairing}/>
                    </div>
                </div>
                <div className="sub-header-dotted-line"/>
                <Workspace/>
            </main>
        )
    }
}

Project.propTypes = exact({
   data: PropTypes.object.isRequired,
   resetPairs: PropTypes.func.isRequired,
   getRecommendedPairs: PropTypes.func.isRequired,
   savePairing: PropTypes.func.isRequired,
})

function mapStateToProps({data}) {
    return {
        data
    }
}

const mapDispatchToProps = {
    resetPairs: resetProjectThunk,
    getRecommendedPairs: getRecommendedPairsThunk,
    savePairing: savePairingThunk,
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)