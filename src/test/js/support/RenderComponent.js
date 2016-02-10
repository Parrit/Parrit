var ReactTestUtils = require('react-addons-test-utils');

function renderComponent(reactComponent, renderJSX) {
    var document = ReactTestUtils.renderIntoDocument(renderJSX);
    return ReactTestUtils.findRenderedComponentWithType(document, reactComponent);
}

module.exports = renderComponent;