import React from 'react';
import PropTypes from 'prop-types';
import Interact from 'interact.js';
import * as _ from 'lodash';

import Header from './Header.js';
import Project from './Project.js';
import PairingHistory from './PairingHistory.js';
import Footer from '../../shared/components/Footer.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fromPairingBoardIndex: undefined,
            toPairingBoardIndex: undefined
        }
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
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen,
            postLogout: this.props.postLogout
        };

        const projectProps = {
            savePairing: this.props.savePairing,
            getRecommendedPairs: this.props.getRecommendedPairs,
            resetPairs: this.props.resetPairs,
            smartReset: this.props.smartReset,
            settings: this.props.settings,
            data: this.props.data,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
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
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen
        };

        const classes = "layout-wrapper project-page-container dropzone" + (this.props.settings.pairingHistoryPanel.isOpen ? ' shift-left' : '');

		return (
            <div id="pairing_board_-1" className={classes}>
                <Header {...headerProps}/>
                <Project {...projectProps}/>
                <Footer/>
                <PairingHistory {...pairingHistoryProps}/>
            </div>
		)
	}

    dropzoneOnDragEnter(event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');

        this.setState({toPairingBoardIndex: this.getIndexFromId(event.target.id)});
    }

    dropzoneOnDragLeave(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        if(this.state.fromPairingBoardIndex === undefined) {
            this.setState({fromPairingBoardIndex: this.getIndexFromId(event.target.id)});
        }
    }

    dropzoneOnDrop(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        const personIndex = this.getIndexFromId(event.relatedTarget.id);

        if(this.state.fromPairingBoardIndex === undefined) {
            this.setState({fromPairingBoardIndex: this.state.toPairingBoardIndex});
        }

        this.props.movePerson(this.state.fromPairingBoardIndex, this.state.toPairingBoardIndex, personIndex);

        this.setState({fromPairingBoardIndex: undefined});
        this.setState({toPairingBoardIndex: undefined});
    }

    trashOnDrop(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        const personIndex = this.getIndexFromId(event.relatedTarget.id);

        this.props.deletePerson(this.state.fromPairingBoardIndex, personIndex);

        this.setState({fromPairingBoardIndex: undefined});
        this.setState({toPairingBoardIndex: undefined});
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
    createPerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    fetchPairingHistory: PropTypes.func.isRequired,

    postLogout: PropTypes.func.isRequired
};
