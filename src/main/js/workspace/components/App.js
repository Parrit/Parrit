var React = require('react');
var Interact = require('interact.js');
var _ = require('lodash');

var Header = require('workspace/components/Header.js');
var Project = require('workspace/components/Project.js');
var Footer = require('shared/components/Footer.js');

var App = React.createClass({
    propTypes: {
        movePerson: React.PropTypes.func.isRequired,
        deletePerson: React.PropTypes.func.isRequired,

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

    fromSpaceIndex: undefined,
    toSpaceIndex: undefined,

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
        var projectProps = {
            savePairing: this.props.savePairing,
            getRecommendedPairs: this.props.getRecommendedPairs,
            settings: this.props.settings,
            data: this.props.data,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewSpaceModalOpen: this.props.setNewSpaceModalOpen,
            createPerson: this.props.createPerson,
            createSpace: this.props.createSpace,
            deleteSpace: this.props.deleteSpace
        };

		return <div id="space_-1" className="project-page-container dropzone">
            <Header/>
            <Project {...projectProps}/>
            <Footer/>
		</div>
	},

    dropzoneOnDragEnter: function (event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('can-drop');

        this.toSpaceIndex = this.getIndexFromId(event.target.id);
    },

    dropzoneOnDragLeave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        if(this.fromSpaceIndex === undefined) {
            this.fromSpaceIndex = this.getIndexFromId(event.target.id);
        }
    },

    dropzoneOnDrop: function(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        var personIndex = this.getIndexFromId(event.relatedTarget.id);

        if(this.fromSpaceIndex === undefined) {
            this.fromSpaceIndex = this.toSpaceIndex;
        }

        this.props.movePerson(this.fromSpaceIndex, this.toSpaceIndex, personIndex);

        this.fromSpaceIndex = undefined;
        this.toSpaceIndex = undefined;
    },

    trashOnDrop: function(event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        var personIndex = this.getIndexFromId(event.relatedTarget.id);

        this.props.deletePerson(this.fromSpaceIndex, personIndex);

        this.fromSpaceIndex = undefined;
        this.toSpaceIndex = undefined;
    },

    getIndexFromId: function(idString) {
        if(idString === undefined) return -1;

        var segments = _.split(idString, '_');
        return parseInt(segments[segments.length-1]);
    }
});

module.exports = App;
