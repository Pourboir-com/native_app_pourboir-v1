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
  let api_url = `http://192.168.10.2:8081/api`;
  // let api_url = `http://localhost:8081/api`;

  if (releaseEnvironment == 'production') {
    // expo build:ios --clear-provisioning-profile --revoke-credentials --release-channel production-1.0.0
    // expo build:android --release-channel production-1.0.0
    api_url =
      'http://ec2-34-211-185-52.us-west-2.compute.amazonaws.com:5000/api';
  } else if (releaseEnvironment == 'staging') {
    // expo publish --release-channel staging-0.0.1
    api_url =
      'http://ec2-34-211-185-52.us-west-2.compute.amazonaws.com:8080/api';
  }
  return api_url;
};

export const BASE_URL = apiUrl();
