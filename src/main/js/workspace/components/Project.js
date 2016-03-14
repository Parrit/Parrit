var React = require('react');

var Workspace = require('workspace/components/Workspace.js');
var Button = require('shared/components/Button.js');

var Project = React.createClass({
    propTypes: {
        savePairing: React.PropTypes.func.isRequired,
        getRecommendedPairs: React.PropTypes.func.isRequired,

        settings: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        deleteSpace: React.PropTypes.func.isRequired
    },

    render: function() {
        var workspaceProps = {
            settings: this.props.settings,
            people: this.props.data.workspace.people,
            spaces: this.props.data.workspace.spaces,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewSpaceModalOpen: this.props.setNewSpaceModalOpen,
            createPerson: this.props.createPerson,
            createSpace: this.props.createSpace,
            deleteSpace: this.props.deleteSpace
        };

        return <div className="project">
            <div className="sub-header">
                <div className="project-name">{this.props.data.workspace.name}</div>
                <div className="project-actions">
                    <Button className="button-blue" name="Recommend Pairs" shortName="Recommend" clickFunction={this.props.getRecommendedPairs}/>
                    <Button className="button-green" name="Record Pairs" shortName="Record" clickFunction={this.props.savePairing}/>
                </div>
            </div>
            <div className="sub-header-dotted-line"></div>
            <Workspace {...workspaceProps}/>
        </div>
    }
});

module.exports = Project;
