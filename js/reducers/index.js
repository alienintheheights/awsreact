/**
 * The Application state.
 * @param {*} state 
 * @param {*} action 
 */
const appState = (state = {
    loggedIn: false,
    isFetching: false,
    creds: {},
    s3: null,
    ec2: null,
    authErrorMsg: "",
    s3errorMsg: "",
    ec2errorMsg: "",
    passwordRedirect: false
  }, action) => {
    
    switch (action.type) {

      case 'IS_FETCHING':
        return {...state, isFetching: true}

      case 'COGNITO_LOGIN_SUCCEEDED':
        return {...state, loggedIn: !!(action.creds), creds: action.creds, authErrorMsg: "", isFetching: false, passwordRedirect: false};
      
      case 'COGNITO_PASSWORD_REQUIRED':
        return {...state, loggedIn: !!(action.creds), creds: action.creds, authErrorMsg: action.message, passwordRedirect: true, isFetching: false};
        
      case 'COGNITO_LOGIN_FAILED':
        return {...state, loggedIn: false, authErrorMsg: action.message, isFetching: false, passwordRedirect: false};

      case 'COGNITO_LOGOUT_SUCCEEDED':
        return {...state, loggedIn: false, creds: {}, s3: null, authErrorMsg: ""};

      case 'COGNITO_LOGOUT_FAILED':
        return {...state, loggedIn: false, authErrorMsg: action.message};
  
      case 'S3_SUCCEEDED':
        return {...state, s3: action.payload, s3ErrorMsg: null, isFetching: false};
      
      case 'S3_FAILED':
        return {...state, s3ErrorMsg: action.message, isFetching: false};
  
      case 'EC2_LAUNCH_SUCCEEDED':
        return {...state, ec2: action.payload, ec2ErrorMsg: null, isFetching: false};
      
      case 'EC2_LAUNCH_FAILED':
        return {...state, ec2ErrorMsg: action.message, isFetching: false};
  
      default:
        return state
    }
  }
  
  export default appState