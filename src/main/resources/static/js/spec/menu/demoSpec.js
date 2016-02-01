var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

var $;


describe('just checking', function() {

	it('works for app', function() {
		var el = $('<div></div>');

		expect(el.text()).toEqual('require.js up and running');
	});
});