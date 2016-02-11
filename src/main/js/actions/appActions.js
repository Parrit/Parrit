var Axios = require('axios');

function loadWorkspaceThunk() {
    return function(dispatch) {
        Axios.get('/workspace?id=1')
            .then(function(response) {
                var workspace = response.data;

                if(workspace) {
                    dispatch(loadWorkspaceCreator(workspace));
                }
            });
    };
}

function saveWorkspaceThunk() {
    return function(dispatch, getWorkspace){
        Axios.post('/workspace', getWorkspace().data.workspace)
            .then(function(response) {
                var workspace = response.data;

                if(workspace) {
                    dispatch(loadWorkspaceCreator(workspace));
                }
            });
    }
}

function loadWorkspaceCreator(workspace) {
    return {
        type: 'LOAD_WORKSPACE',
        workspace: workspace
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

function setNewPersonModalOpen(isOpen) {
    return {
        type: 'SET_NEW_PERSON_MODAL_OPEN',
        isOpen: isOpen
    }
}

module.exports = {
    loadWorkspace: loadWorkspaceThunk,
    saveWorkspace: saveWorkspaceThunk,
    movePerson: movePersonCreator,
    enableMove: enableMoveCreator,
    disableMove: disableMoveCreator,
    createPerson: createPerson,
    setNewPersonModalOpen: setNewPersonModalOpen
};
