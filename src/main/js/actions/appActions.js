var Axios = require('axios');

function loadStateThunk() {
    return function(dispatch) {
        Axios.get('/state?id=1')
            .then(function(response) {
                var state = response.data;

                if(state) {
                    dispatch(loadStateCreator(state));
                }
            });
    };
}

function saveStateThunk() {
    return function(dispatch, getState){
        Axios.post('/state', getState())
            .then(function(response) {
                var state = response.data;

                if(state) {
                    dispatch(loadStateCreator(state));
                }
            });
    }
}

function loadStateCreator(state) {
    return {
        type: 'LOAD_STATE',
        state: state
    };
}

function enableMoveCreator() {
    return {
        type: 'SET_MOVE',
        canMove: true
    };
}

function disableMoveCreator() {
    return {
        type: 'SET_MOVE',
        canMove: false
    };
}

function movePersonCreator(fromSpaceIndex, toSpaceIndex, personIndex) {
    return {
        type: 'MOVE_PERSON',
        fromSpaceIndex: fromSpaceIndex,
        toSpaceIndex: toSpaceIndex,
        personIndex: personIndex
    }
}

function createPerson(name) {
    return {
        type: 'CREATE_PERSON',
        name: name
    };
}

module.exports = {
    loadState: loadStateThunk,
    saveState: saveStateThunk,
    movePerson: movePersonCreator,
    enableMove: enableMoveCreator,
    disableMove: disableMoveCreator,
    createPerson: createPerson
};
