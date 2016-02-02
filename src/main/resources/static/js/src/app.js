var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

// ****************** //
//      Reducers      //
// ****************** //

var workspaceReducer = function(state, action) {
	var a = {
		stations: [
		    {
		    	name: 'Unallocated',
		    	people: []
		    }
		]
	};
};

var appReducer = function(state, action) {
	if (typeof state === 'undefined') {
		state = {
			can_move: true,
			workspace: this.workspaceReducer(state, action)
		};
	}

	switch (action.type) {
		case "SET_MOVE":
			return {
				can_move: action.can_move,
				workspace: this.workspaceReducer(state, action)
			};
		default:
			return state;
	}
};

// ****************** //
//       Stores       //
// ****************** //

var appStore = Redux.createStore(appReducer);

// ****************** //
//   React Classes    //
// ****************** //

var App = React.createClass({
	render: function() {
		return React.createElement('div', {className: "container-fluid"},
            React.createElement('div', {className:"row content"},
                        React.createElement('div', {className:"col-sm-3 sidenav"},
							React.createElement('h4', null, "Parrit"),
							React.createElement(Menu)
						),
						React.createElement('div', {className:"col-sm-9 dark"},
							React.createElement('div', {className:"container-fluid workspace"},
								React.createElement(Workspace)
							)
						)
					)
		);
	}
});


var Menu = React.createClass({
	render: function() {
	  	return React.createElement('ul', null,
	    	React.createElement(PrimaryButton, {name: "Move", clickFunction:this.allowMove}),
	    	React.createElement(PrimaryButton, {name: "Don't Move", clickFunction:this.preventMove}),
	    	React.createElement(SuccessButton, {name: "Save", clickFunction:this.saveWorkspace})
	    );
	},
});

var PrimaryButton = React.createClass({
	render: function() {
  	return React.createElement('button',
		{
  			className: "btn btn-primary btn-block activatable",
  			onClick: this.props.clickFunction
  		},
        this.props.name
    );
  }
});

var SuccessButton = React.createClass({
	render: function() {
  	return React.createElement('button',
		{
  			className: "btn btn-success btn-block",
  			onClick: this.props.clickFunction
  		},
        this.props.name
    );
  }
});


// ***************** //
//      Exports      //
// ***************** //

module.exports = {
	workspaceReducer: workspaceReducer,
	appReducer: appReducer
};
