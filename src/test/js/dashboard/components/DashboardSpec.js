var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var Dashboard = require('dashboard/components/Dashboard.js');

describe('Dashboard', function() {
    var props = {
        workspaceNames: ["Deathstar", "Chuck-e-Cheese"]
    };

    var dashboard;
    beforeEach(function() {
        dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);
    });

    it('has link tags with hrefs to the workspaces', function() {
        var workspaceLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'a');
        expect(workspaceLinks[0].getAttribute('href')).toBe("/Deathstar");
        expect(workspaceLinks[1].getAttribute('href')).toBe('/Chuck-e-Cheese');
    });
});