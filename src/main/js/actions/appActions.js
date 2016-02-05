var Axios = require('axios');

function loadStateThunk() {
    return function(dispatch) {
        Axios.get('/state?id=0')
            .then(function(response) {
                dispatch(loadStateCreator(response.data))
            })
    }
}

function loadStateCreator(state) {
    return { type: 'LOAD_STATE', state: state };
}

function enableMoveCreator() {
    return { type: 'SET_MOVE', canMove: true };
}

function disableMoveCreator() {
    return { type: 'SET_MOVE', canMove: false };
}

module.exports = {
    loadState: loadStateThunk,
    enableMove: enableMoveCreator,
    disableMove: disableMoveCreator
};
