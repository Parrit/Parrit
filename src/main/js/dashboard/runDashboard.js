var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var Provider = ReactRedux.Provider;

function runDashboard(workspaces) {
    //function createStore(initialState) {
    //    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    //    return createStoreMW(appReducer, initialState);
    //}
    //
    //var initialState = {
    //    workspaces: workspaces
    //};
    //
    //var store = createStore(initialState);
    //
    //ReactDOM.render(
    //    <Provider store={store}>
    //        <Dashboard/>
    //    </Provider>,
    //    document.getElementById('reactRoot')
    //);
}

module.exports = runDashboard;