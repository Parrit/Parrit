var Axios = require('axios');

function postStateAndDo(state, callback) {
    Axios.post('/workspace', state.data.workspace)
        .then(function (response) {
            callback(response.data);
        });
}

function getStateAndDo(callback) {
    Axios.get('/workspace?id=1')
        .then(function(response) {
            callback(response.data);
        });
}

module.exports = {
    postStateAndDo: postStateAndDo,
    getStateAndDo: getStateAndDo
};
