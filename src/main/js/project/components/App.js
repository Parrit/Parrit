const React = require('react');
const PropTypes = require('prop-types');
const Interact = require('interact.js');
const _ = require('lodash');

const Header = require('project/components/Header.js');
const Project = require('project/components/Project.js');
const Footer = require('shared/components/Footer.js');
const PairingHistory = require('project/components/PairingHistory.js');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.fromPairingBoardIndex = undefined;
        this.toPairingBoardIndex = undefined;
    }

    componentDidMount() {
        Interact('.draggable').draggable({
            restrict: {
                restriction: ".project-page-container"
            },
            autoScroll: true,

            onmove: function dragMoveListener (event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

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
            ondragenter: this.dropzoneOnDragEnter.bind(this),
            ondragleave: this.dropzoneOnDragLeave.bind(this),
            ondrop: this.dropzoneOnDrop.bind(this)
        });

        Interact('.delete-parrit').dropzone({
            accept: '.draggable.person',
            overlap: 0.01,

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
            ondrop: this.trashOnDrop.bind(this)
        });
    }

	render() {
        const headerProps = {
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.isPairingHistoryPanelOpen,
            postLogout: this.props.postLogout
        };

        const projectProps = {
            savePairing: this.props.savePairing,
            getRecommendedPairs: this.props.getRecommendedPairs,
            resetPairs: this.props.resetPairs,
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

        const pairingHistoryProps = {
            projectId: this.props.data.project.id,
            pairingHistoryList: this.props.data.pairingHistory.pairingHistoryList,
            fetchPairingHistory: this.props.fetchPairingHistory,
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.isPairingHistoryPanelOpen
        };

        const classes = "project-page-container dropzone" + (this.props.settings.isPairingHistoryPanelOpen ? ' shift-left' : '');

		return <div id="pairing_board_-1" className={classes}>
            <Header {...headerProps}/>
            <Project {...projectProps}/>
            <Footer/>
            <PairingHistory {...pairingHistoryProps}/>
		</div>
	}

    dropzoneOnDragEnter(event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');

        this.toPairingBoardIndex = this.getIndexFromId(event.target.id);
    }

    dropzoneOnDragLeave(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        if(this.fromPairingBoardIndex === undefined) {
            this.fromPairingBoardIndex = this.getIndexFromId(event.target.id);
        }
    }

    dropzoneOnDrop(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        const personIndex = this.getIndexFromId(event.relatedTarget.id);

        if(this.fromPairingBoardIndex === undefined) {
            this.fromPairingBoardIndex = this.toPairingBoardIndex;
        }

        this.props.movePerson(this.fromPairingBoardIndex, this.toPairingBoardIndex, personIndex);

        this.fromPairingBoardIndex = undefined;
        this.toPairingBoardIndex = undefined;
    }

    trashOnDrop(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        const personIndex = this.getIndexFromId(event.relatedTarget.id);

        this.props.deletePerson(this.fromPairingBoardIndex, personIndex);

        this.fromPairingBoardIndex = undefined;
        this.toPairingBoardIndex = undefined;
    }

    getIndexFromId(idString) {
        if(idString === undefined) return -1;

        const segments = _.split(idString, '_');
        return parseInt(segments[segments.length-1]);
    }
}

App.propTypes = {
    movePerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,

    savePairing: PropTypes.func.isRequired,
    getRecommendedPairs: PropTypes.func.isRequired,
    resetPairs: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    setErrorType: PropTypes.func.isRequired,
    createPerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    fetchPairingHistory: PropTypes.func.isRequired,

    postLogout: PropTypes.func.isRequired
};

module.exports = App;
