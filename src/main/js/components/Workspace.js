var React = require('react');
var Interact = require('interact.js');
var _ = require('lodash');

var PersonList = require('components/PersonList.js');
var Space = require('components/Space.js');

var Workspace = React.createClass({
    componentDidMount: function() {
        var self = this;
        var fromSpaceIndex, toSpaceIndex;

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
                ondragenter: function (event) {
                    event.target.classList.add('drop-target');
                    event.relatedTarget.classList.add('can-drop');

                    toSpaceIndex = getIndexFromId(event.target.id);
                },
                ondragleave: function (event) {
                    event.target.classList.remove('drop-target');
                    event.relatedTarget.classList.remove('can-drop');

                    if(fromSpaceIndex === undefined) {
                        fromSpaceIndex = getIndexFromId(event.target.id);
                    }
                },
                ondrop: function (event) {
                    event.target.classList.remove('drop-target');
                    event.relatedTarget.classList.remove('can-drop');

                    var personIndex = getIndexFromId(event.relatedTarget.id);

                    if(fromSpaceIndex === undefined) {
                        fromSpaceIndex = toSpaceIndex;
                    }

                    self.props.movePerson(fromSpaceIndex, toSpaceIndex, personIndex);

                    fromSpaceIndex = undefined;
                    toSpaceIndex = undefined;
                }
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
                ondrop: function (event) {
                    event.target.classList.remove('drop-target');
                    event.relatedTarget.classList.remove('can-drop');

                    var personIndex = getIndexFromId(event.relatedTarget.id);

                    self.props.deletePerson(fromSpaceIndex, personIndex);

                    fromSpaceIndex = undefined;
                    toSpaceIndex = undefined;
                }
            });

        function getIndexFromId(idString) {
            var segments = _.split(idString, '_');
            return parseInt(segments[segments.length-1]);
        }
    },

	render: function() {
		return <div id="space_-1" className="container-fluid workspace dropzone">

            <div className="floatingSpace">
                <h2>Floating</h2>
                <PersonList people={this.props.people} index={-1} />
            </div>

            {this.props.spaces.map(function (space, idx) {
                return <Space key={idx} name={space.name} people={space.people} index={idx}/>;
            })}

            <div className="trash"></div>

        </div>
	}
});

module.exports = Workspace;
