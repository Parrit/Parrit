describe("Menu", function() {
	var Menu = require('../../src/menu.js');
	var menu;

	beforeEach(function() {
		menu = new Menu();
	});
	
	it("should be able to toggle movement", function() {
		menu.allowMove();
	});
});