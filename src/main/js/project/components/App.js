var React = require('react');
var Interact = require('interact.js');
var _ = require('lodash');

var Header = require('project/components/Header.js');
var Project = require('project/components/Project.js');
var Footer = require('shared/components/Footer.js');
var PairingHistory = require('project/components/PairingHistory.js');

var App = React.createClass({
    propTypes: {
        movePerson: React.PropTypes.func.isRequired,
        deletePerson: React.PropTypes.func.isRequired,

        savePairing: React.PropTypes.func.isRequired,
        getRecommendedPairs: React.PropTypes.func.isRequired,
        settings: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewPairingBoardModalOpen: React.PropTypes.func.isRequired,
        setPairingHistoryPanelOpen: React.PropTypes.func.isRequired,
        setErrorType: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createPairingBoard: React.PropTypes.func.isRequired,
        deletePairingBoard: React.PropTypes.func.isRequired,
        renamePairingBoard: React.PropTypes.func.isRequired
    },

    fromPairingBoardIndex: undefined,
    toPairingBoardIndex: undefined,

    componentDidMount: function() {
        Interact('.draggable').draggable({
            restrict: {
                restriction: ".project-page-container"
            },
            autoScroll: true,

            onmove: function dragMoveListener (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },

            onend: function(event) {
                event.target.removeAttribute('style');
                event.target.removeAttribute('data-x');
                event.target.removeAttribute('data-y');
            }
        });

        Interact('.dropzone').dropzone({
            accept: '.draggable.person',
            overlap: 'center',

            ondropactivate: function (event) {
                event.target.classList.add('drop-active');
            },
            ondropdeactivate: function (event) {
                event.target.classList.remove('drop-active');
            },
            ondragenter: this.dropzoneOnDragEnter,
            ondragleave: this.dropzoneOnDragLeave,
            ondrop: this.dropzoneOnDrop
        });

        Interact('.delete-parrit').dropzone({
            accept: '.draggable.person',
            overlap: 'center',

            ondropactivate: function (event) {
                event.target.classList.add('drop-active');
            },
            ondropdeactivate: function (event) {
                event.target.classList.remove('drop-active');
            },
            ondragenter: function (event) {
                event.target.classList.add('drop-target');
                event.relatedTarget.classList.add('can-drop');
            },
            ondragleave: function (event) {
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: this.trashOnDrop
        });
    },

	render: function() {
        var pairingHistoryActionProps = {
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.isPairingHistoryPanelOpen
        };

        var projectProps = {
            savePairing: this.props.savePairing,
            getRecommendedPairs: this.props.getRecommendedPairs,
            settings: this.props.settings,
            data: this.props.data,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
            setErrorType: this.props.setErrorType,
            createPerson: this.props.createPerson,
            createPairingBoard: this.props.createPairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            renamePairingBoard: this.props.renamePairingBoard
        };

        var classes = "project-page-container dropzone" + (this.props.settings.isPairingHistoryPanelOpen ? ' shift-left' : '');
		return <div id="pairing_board_-1" className={classes}>
            <Header {...pairingHistoryActionProps}/>
            <Project {...projectProps}/>
            <Footer/>
            <PairingHistory {...pairingHistoryActionProps}/>
		</div>
	},

    dropzoneOnDragEnter: function (event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');

        this.toPairingBoardIndex = this.getIndexFromId(event.target.id);
    },

    dropzoneOnDragLeave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        if(this.fromPairingBoardIndex === undefined) {
            this.fromPairingBoardIndex = this.getIndexFromId(event.target.id);
        }
    },

    dropzoneOnDrop: function(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        var personIndex = this.getIndexFromId(event.relatedTarget.id);

        if(this.fromPairingBoardIndex === undefined) {
            this.fromPairingBoardIndex = this.toPairingBoardIndex;
        }

        this.props.movePerson(this.fromPairingBoardIndex, this.toPairingBoardIndex, personIndex);

        this.fromPairingBoardIndex = undefined;
        this.toPairingBoardIndex = undefined;
    },

    trashOnDrop: function(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        var personIndex = this.getIndexFromId(event.relatedTarget.id);

        this.props.deletePerson(this.fromPairingBoardIndex, personIndex);

        this.fromPairingBoardIndex = undefined;
        this.toPairingBoardIndex = undefined;
    },

    getIndexFromId: function(idString) {
        if(idString === undefined) return -1;

        var segments = _.split(idString, '_');
        return parseInt(segments[segments.length-1]);
    }
});

module.exports = App;
