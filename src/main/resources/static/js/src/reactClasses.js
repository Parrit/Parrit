var React = require('react');
var ReactDOM = require('react-dom');

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

var Workspace = React.createClass({
	render: function() {
		return React.createElement('div');
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

module.exports = {
	App: App
};
