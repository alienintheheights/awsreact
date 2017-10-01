/**
 * AWS API
 * 
 * login: authenticates username and password
 * logout: ends cognito session
 * getS3: fetchs a particular S3 bucket
 * launchEC2: dynamically launch an instance
 * 
 */
const { CognitoUserPool, AuthenticationDetails, CognitoUser } = AWSCognito.CognitoIdentityServiceProvider

AWS.config.region = process.env.AWS_REGION
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL
});

const userPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_USERPOOLID,
  ClientId: process.env.AWS_CLIENTAPP
})

export function login(payload) {
  return new Promise((resolve, reject) => {

    const cognitoUser = new CognitoUser({
      Username: payload.username,
      Pool: userPool
    })

    const authenticationDetails = new AuthenticationDetails({
      Username: payload.username,
      Password: payload.pass
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        // User authentication was successful
        cognitoUser.getUserAttributes((err, attrs) => {
          const payload = {};
          attrs.forEach(attr => (payload[attr.Name] = attr.Value));
          payload.jwt = result.getIdToken().getJwtToken();
          resolve({ payload });
        });
      },

      onFailure: err => {
        resolve({
          payload: null,
          err: err.message
        })
      },

      mfaRequired: function (codeDeliveryDetails) {
        // MFA is required to complete user authentication.
        // Get the code from user and call
        console.log("MFA Required")
        cognitoUser.sendMFACode(mfaCode, this)
        resolve({
          payload: null,
          err: codeDeliveryDetails
        })
      },

      newPasswordRequired: function (userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.
        console.log("New Password Required")

        resolve({
          payload: userAttributes,
          err: "New Password Required",
          passwordRedirect: true
        })
      }
    })
  })
}

export function changePassword(creds, oldPassword, newPassword) {
  
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: creds.email,
      Pool: userPool
    })

    const authenticationDetails = new AuthenticationDetails({
      Username: creds.email,
      Password: oldPassword
    })
  
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        delete creds.email_verified
        delete creds.oldPassword
        cognitoUser.completeNewPasswordChallenge(newPassword, creds, {
          onSuccess: result => {
            // User authentication was successful
            cognitoUser.getUserAttributes((err, attrs) => {
              const payload = {};
              attrs.forEach(attr => (payload[attr.Name] = attr.Value));
              payload.jwt = result.getIdToken().getJwtToken();
              resolve({ payload });
            });
          },
          onFailure: err => {
            resolve({
              payload: null,
              err: err.message
            })
          }
        })
      }
    })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.globalSignOut()
    resolve({})
  })
}

/**
 * Fetches S3 bucket data per the AWS env settings for this app.
 * 
 * @param {*} inputs the file(s) to fetch
 */
export function getS3(inputs) {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      resolve({ err: 'not logged in' })
    }
    console.log('accessing S3')
    //Instantiate aws sdk service objects now that the credentials have been updated.
    var s3 = new AWS.S3();

    var paramsS3 = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: process.env.AWS_S3_BUCKET_KEY
    };

    s3.getObject(paramsS3, function (err, data) {
      if (err) {
        //console.log(err, err.stack); // an error occurred
        resolve({ err: err.message })
      }
      else {
        console.log(data); // successful response
        var attachment = data.Body.toString();
        resolve({ payload: attachment })
      }
    });
  })
}

/**
 * Launches an EC2 instance.
 */
export function launchEC2() {
  return new Promise((resolve, reject) => {
    console.log('launching EC2')
    var ec2 = new AWS.EC2();
    var params = {
      ImageId: process.env.AWS_EC2_INSTANCE_ID,
      InstanceType: process.env.AWS_EC2_INSTANCE_TYPE,
      MaxCount: 1,
      MinCount: 1,
      DryRun: true
    };

    ec2.runInstances(params, function (err, data) {
      if (err) {
        resolve({ payload: null, err: err.message })
      }
      else {
        console.log(data);
        resolve({ payload: data, err: null })
      }
    });
  })
}