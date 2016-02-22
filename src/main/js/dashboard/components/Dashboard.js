var React = require('react');

var Dashboard = React.createClass({
    propTypes: {
        workspaceNames: React.PropTypes.array.isRequired
    },

    render: function() {
        return <div className="dashboard">
            <ul className="workspaceList">
                {this.props.workspaceNames.map(function(workspaceName, idx) {
                    return <li key={idx} className="workspaceItem"><a href={'/' + workspaceName}>{workspaceName}</a></li>
                })}
            </ul>
        </div>
    }
});

module.exports = Dashboard;
