import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard.js'
import DashboardActions from '../actions/DashboardActions.js'

function getState(state) {
    return state
}

export default connect(getState, DashboardActions)(Dashboard)