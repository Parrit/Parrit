var Axios = require('axios');

function postStateAndDo(state, callback) {
    Axios.post('/api/workspace', state.data.workspace)
        .then(function (response) {
            callback(response.data);
        });
}

module.exports = {
    postStateAndDo: postStateAndDo
};
