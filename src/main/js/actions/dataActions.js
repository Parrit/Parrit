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

function movePersonCreator(fromSpaceIndex, toSpaceIndex, personIndex) {
    return {
        type: 'MOVE_PERSON',
        fromSpaceIndex: fromSpaceIndex,
        toSpaceIndex: toSpaceIndex,
        personIndex: personIndex
    }
}

function createPersonCreator(name) {
    return {
        type: 'CREATE_PERSON',
        name: name
    };
}

function createSpaceCreator(name) {
    return {
        type: 'CREATE_SPACE',
        name: name
    };
}

function deletePersonCreator(spaceIndex, personIndex) {
    return {
        type: 'DELETE_PERSON',
        spaceIndex: spaceIndex,
        personIndex: personIndex
    };
}

module.exports = {
    loadWorkspace: loadWorkspaceThunk,
    saveWorkspace: saveWorkspaceThunk,
    movePerson: movePersonCreator,
    createPerson: createPersonCreator,
    createSpace: createSpaceCreator,
    deletePerson: deletePersonCreator
};
