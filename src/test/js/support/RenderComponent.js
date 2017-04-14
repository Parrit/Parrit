const ReactTestUtils = require('react-dom/test-utils');

function renderComponent(reactComponent, renderJSX) {
    const document = ReactTestUtils.renderIntoDocument(renderJSX);
    return ReactTestUtils.findRenderedComponentWithType(document, reactComponent);
}

module.exports = renderComponent;