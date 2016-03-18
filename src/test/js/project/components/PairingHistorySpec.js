var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var PairingHistory = require('project/components/PairingHistory.js');

describe('PairingHistory', function() {
    var props;
    var pairingHistory;
    var pairingHistoryElement;

    beforeEach(function() {
        props = {
            setPairingHistoryPanelOpen: jasmine.createSpy('setPairingHistoryPanelOpenSpy'),
            isPairingHistoryPanelOpen: true
        };

        pairingHistory = RenderComponent(PairingHistory, <PairingHistory {...props}/>);
        pairingHistoryElement = ReactDOM.findDOMNode(pairingHistory);
    });

    it('displays the pairing history panel when isPairingHistoryPanelOpen is true', function() {
        var pairingHistoryPanel = ReactTestUtils.findRenderedDOMComponentWithClass(pairingHistory, 'panel-open');
        expect(pairingHistoryPanel).toBeTruthy();
    });

    it('#closePairingHistoryPanel calls setPairingHistoryPanelOpen with false', function() {
        pairingHistory.closePairingHistoryPanel();
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(false);
    });
});