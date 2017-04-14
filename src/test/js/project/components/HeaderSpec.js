const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');

const Header = require('project/components/Header.js');

describe('Header', function() {
    let props;
    let header;
    let headerElement;

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
        const leftCaret = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'history-caret-left');
        expect(leftCaret).toBeTruthy();
    });

    it('renders a right caret when isPairingHistoryPanelOpen is true', function() {
        props.isPairingHistoryPanelOpen = true;
        header = RenderComponent(Header, <Header {...props}/>);
        headerElement = ReactDOM.findDOMNode(header);

        const rightCaret = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'history-caret-right');
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