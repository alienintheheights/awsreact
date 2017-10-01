import { call, put, takeEvery } from 'redux-saga/effects'
/**
 * Saga is a middlewear provider for Redux meaning that like
 * Redux it listens for events broadcast from the actions. 
 * It is used when async calls are made (fetch, AWS, etc), 
 * i.e., those that use Promises.
 * 
 * It is event-driven, meaning it will subscribe to the events
 * broadcast by the actions and upon completion, broadcast events
 * to be caught by the reducers (Redux).
 * 
 * Lifecycle:   Component handler => 
 *              action(event_name, params) => (event broadcast)
 *              saga(event_name, params) => (event listen)
 *                  api_based_on_event(params) =>
 *                  success/fail_event_name fired with return payload (event broadcast)
 *              reducer(success/fail_event_name, payload) => (event listen)
 *              Component update based on state change
 * 
 * The syntax is a bit arcane but all you need to deal with 
 * is the "yield put" calls used to invoke the API found
 * inside the generator functions (e.g., function* foo(action)).
 * 
 */

// enumerate API calls needed in the callbacks below
import { 
        login, 
        logout, 
        getS3, 
        launchEC2,
        changePassword
    } from '../api/aws'

/**========== callback handlers for Saga =============**/

// worker Saga: will be fired on COGNITO_LOGIN actions
function* awsLogin(action) {
    try {
        yield put({ type: 'IS_FETCHING'});

        var { payload, err, passwordRedirect} = yield call(login, action)
        if (!payload && err) {
            yield put({ type: 'COGNITO_LOGIN_FAILED', message: err });
        } else {
            if (passwordRedirect) {
                payload.oldPassword = action.pass
                yield put({ type: 'COGNITO_PASSWORD_REQUIRED', creds: payload, message: err });
            } else {
                yield put({ type: 'COGNITO_LOGIN_SUCCEEDED', creds: payload });
            }
        }

    } catch (e) {
        yield put({ type: 'COGNITO_LOGIN_FAILED', message: e.message });
    }
}

// worker Saga: will be fired on CHANGE_PASSWORD actions
function* handlePasswordChange(action) {
    try {
        yield put({ type: 'IS_FETCHING'});

        var { payload, err} = yield call(changePassword, action.creds, action.oldPassword, action.newPassword)
        if (!payload && err) {
            yield put({ type: 'COGNITO_LOGIN_FAILED', message: err });
        } else {
            payload.oldPassword = null
             yield put({ type: 'COGNITO_LOGIN_SUCCEEDED', creds: payload });
        }

    } catch (e) {
        yield put({ type: 'COGNITO_LOGIN_FAILED', message: e.message });
    }
}

// worker Saga: will be fired on S3 actions
function* loadS3(action) {
    try {
        yield put({ type: 'IS_FETCHING'});

        const { payload, err } = yield call(getS3, action)
        if (err) {
            yield put({ type: 'S3_FAILED', message: err });
        } else {
            yield put({ type: 'S3_SUCCEEDED', payload: payload });
        }

    } catch (e) {
        yield put({ type: 'COGNITO_LOGIN_FAILED', message: e.message });
    }
}

// worker Saga: launches EC2
function* invokeEC2(action) {
    try {
        yield put({ type: 'IS_FETCHING'});

        const { payload, err } = yield call(launchEC2, action)
        if (err) {
            yield put({ type: 'EC2_LAUNCH_FAILED', message: err });
        } else {
            yield put({ type: 'EC2_LAUNCH_SUCCEEDED', payload: payload });
        }

    } catch (e) {
        yield put({ type: 'EC2_LAUNCH_FAILED', message: e.message });
    }
}

// worker Saga: will be fired on COGNITO_LOGOUT actions
function* awsLogout(action) {
    try {
        yield put({ type: 'COGNITO_LOGOUT_SUCCEEDED' });
    } catch (e) {
        console.log('Saga died here ' + e)
        yield put({ type: 'COGNITO_LOGOUT_FAILED', message: e.message });
    }
}

/**=========== End of callbacks ============**/


/**
 * Entry point for this middlewear.
 * Starts async API call (promise-based) corresponding 
 * to the event trigger by the action layer.
 */
function* mySaga() {
    yield takeEvery('COGNITO_LOGIN', awsLogin);
    yield takeEvery('COGNITO_LOGOUT', awsLogout);
    yield takeEvery('LOAD_S3', loadS3);
    yield takeEvery('LAUNCH_EC2', invokeEC2);
    yield takeEvery('CHANGE_PASSWORD', handlePasswordChange)
}


export default mySaga;