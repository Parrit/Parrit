var React = require('react');
var Interact = require('interact.js');
var _ = require('lodash');

var PersonList = require('components/PersonList.js');
var Space = require('components/Space.js');

var Workspace = React.createClass({
    fromSpaceIndex: undefined,
    toSpaceIndex: undefined,

    componentDidMount: function() {
        Interact('.draggable')
            .draggable({
                restrict: {
                    restriction: ".workspace"
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

        Interact('.dropzone')
            .dropzone({
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

        Interact('.trash')
            .dropzone({
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
        var deleteSpace = this.props.deleteSpace;

		return <div id="space_-1" className="container-fluid workspace dropzone">

            <div className="floatingSpace">
                <h2>Floating</h2>
                <PersonList people={this.props.people} index={-1} />
            </div>

            <div className="spaces">
                {this.props.spaces.map(function (space, idx) {
                    return <Space key={idx} name={space.name} people={space.people} index={idx} deleteSpace={deleteSpace}/>;
                })}
            </div>

            <div className="trash"></div>

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

module.exports = Workspace;
