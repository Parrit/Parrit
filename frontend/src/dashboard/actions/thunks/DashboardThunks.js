import { setNewProjectErrorCreator, setLoginErrorCreator } from '../creators/DashboardCreators.js'
import { postNewProjectAndDo, postLoginAndRedirect } from '../../../shared/helpers/DatabaseHelpers.js'

export function createProjectThunk(name, password) {
    return function(dispatch) {
        postNewProjectAndDo(name, password,
            function successCallback() {
                postLoginAndRedirect(name, password)
            },
            function errorCallback(errorResponse) {
                dispatch(setNewProjectErrorCreator(errorResponse))
            }
        )
    }
}

export function loginThunk(name, password) {
    return function(dispatch) {
        postLoginAndRedirect(name, password,
            function errorCallback(errorResponse) {
                dispatch(setLoginErrorCreator(errorResponse))
            }
        )
    }
}


