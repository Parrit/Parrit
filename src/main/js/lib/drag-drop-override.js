var interact = require('./interact.js');

interact('.draggable')
	.draggable({
		restrict: {
    		restriction: '.workspace',
    	}
    });
