var React = require('react');
var Interact = require('interact.js');
var _ = require('lodash');

var PersonContainer = require('containers/PersonContainer.js');
var Space = require('components/Space.js');

var Workspace = React.createClass({
    componentDidMount: function() {
        var self = this;

        Interact('.draggable')
            .draggable({
                inertia:true,
                restrict: {
                    restriction: ".workspace"
                },
                autoScroll: true,

                onmove: dragMoveListener
            });

        function dragMoveListener (event) {
            // Keep the dragged position in the data-x/data-y attributes
            var target = event.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // Translate the element on the screen
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // Update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        var fromSpaceIndex, toSpaceIndex;
        Interact('.dropzone')
            .dropzone({
                // Only accept elements matching this CSS selector
                accept: '.draggable.drag-drop',

                // Require a 75% element overlap for a drop to be possible
                overlap: 0.50,

                // target -> dropzoneElement, relatedTarget -> draggableElement
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

                    if (fromSpaceIndex === toSpaceIndex) {
                        event.relatedTarget.removeAttribute('style');
                        event.relatedTarget.removeAttribute('data-x');
                        event.relatedTarget.removeAttribute('data-y');
                    }

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
                {this.props.people.map(function (person, idx) {
                    return <PersonContainer key={person.name} name={person.name} index={idx} spaceIndex={-1}/>
                })}
            </div>

            {this.props.spaces.map(function (space, idx) {
                return <Space key={idx} name={space.name} people={space.people} index={idx}/>;
            })}
        </div>
	}
});

module.exports = Workspace;
