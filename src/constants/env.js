import Constants from 'expo-constants';
// import * as Network from 'expo-network';
function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return 'development';
  if (env.indexOf('dev') !== -1) return 'development';
  if (env.indexOf('staging') !== -1) return 'staging';
  if (env.indexOf('prod') !== -1) return 'production';
}
export const releaseEnvironment = getEnvVars(Constants.manifest.releaseChannel);
const apiUrl = () => {
  let api_url = `http://192.168.10.27:8081/api`;
  // let api_url = `http://localhost:8081/api`;

  if (releaseEnvironment == 'production') {
    // expo build:ios --clear-provisioning-profile --revoke-credentials --release-channel production-1.0.0
    // expo build:android --release-channel production-1.0.0
    //  "ACCESS_COARSE_LOCATION",
    // "ACCESS_FINE_LOCATION"
    api_url = 'https://api.pourboir.com/api';
  } else if (releaseEnvironment == 'staging') {
    // expo publish --release-channel staging-1.0.0
    api_url = 'https://api.pourboir.com/api';
  }
  return api_url;
};

let email_to = 'salmansidd991@gmail.com';
if (releaseEnvironment == 'production') {
  email_to = 'joinus@pourboir.com';
} else if (releaseEnvironment == 'staging') {
  email_to = 'joinus@pourboir.com';
}
export { email_to };

export const BASE_URL = apiUrl();
