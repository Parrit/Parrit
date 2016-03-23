var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var Header = require('project/components/Header.js');

describe('Header', function() {
    var props;
    var header;
    var headerElement;

    beforeEach(function() {
        props = {
            setPairingHistoryPanelOpen: jasmine.createSpy('setPairingHistoryPanelOpenSpy'),
            isPairingHistoryPanelOpen: false,
            postLogout: jasmine.createSpy('postLogoutSpy')
        };

        header = RenderComponent(Header, <Header {...props}/>);
        headerElement = ReactDOM.findDOMNode(header);
    });

    it('renders a left caret when isPairingHistoryPanelOpen is false', function() {
        var leftCaret = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'history-caret-left');
        expect(leftCaret).toBeTruthy();
    });

    it('renders a right caret when isPairingHistoryPanelOpen is true', function() {
        props.isPairingHistoryPanelOpen = true;
        header = RenderComponent(Header, <Header {...props}/>);
        headerElement = ReactDOM.findDOMNode(header);

        var rightCaret = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'history-caret-right');
        expect(rightCaret).toBeTruthy();
    });

    it('#openPairingHistoryPanel calls setPairingHistoryPanelOpen with true', function() {
        header.openPairingHistoryPanel();
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(true);
    });

    it('#closePairingHistoryPanel calls setPairingHistoryPanelOpen with false', function() {
        header.closePairingHistoryPanel();
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(false);
    });
});