export const doLogin = (payload) => {
    return {
      type: 'COGNITO_LOGIN',
      username: payload.username,
      pass: payload.password
    }
  }

export const doLogout = () => {
  return {
    type: 'COGNITO_LOGOUT'
  }
}
export const changePassword = (payload) => {
  return {
    type: 'CHANGE_PASSWORD',
    creds: payload.creds,
    newPassword: payload.password,
    oldPassword: payload.oldPassword
  }
}

export const getS3 = () => {
  return {
    type: 'LOAD_S3'
  }
}

export const launchEC2 = () => {
  return {
    type: 'LAUNCH_EC2'
  }
}