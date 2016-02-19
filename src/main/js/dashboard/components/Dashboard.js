var React = require('react');

var Dashboard = React.createClass({
    propTypes: {
        workspaceNames: React.PropTypes.array.isRequired
    },

    render: function() {
        return <div className="container-fluid">
            {this.props.workspaceNames.map(function(workspaceName, idx) {
                return <a key={idx} href={'/' + workspaceName}>{workspaceName}</a>
            })}
        </div>
    }
});

module.exports = Dashboard;
