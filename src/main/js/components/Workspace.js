var React = require('react');
var Interact = require('interact.js');

var Space = require('components/Space.js');

var Workspace = React.createClass({
    componentDidMount: function() {
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

        Interact('.dropzone')
            .dropzone({
                // Only accept elements matching this CSS selector
                accept: '.draggable.drag-drop',

                // Require a 75% element overlap for a drop to be possible
                overlap: 0.75,

                // target -> dropzoneElement, relatedTarget -> draggableElement
                ondropactivate: function (event) {
                    event.target.classList.add('drop-active');
                },
                ondropdeactivate: function (event) {
                    event.target.classList.remove('drop-active');
                    event.target.classList.remove('drop-target');
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

                }
            });
    },

	render: function() {
		return <div className="container-fluid workspace">
			{this.props.workspace.spaces.map(function (space, idx) {
				return <Space key={idx} name={space.name} people={space.people} index={idx}/>;
			})}
      	</div>
	}
});

module.exports = Workspace;
