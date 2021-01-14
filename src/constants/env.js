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
  let api_url = `http://192.168.10.12:8080/api`;
  if (releaseEnvironment == 'production') {
    api_url = 'https://production.dancingnomads.com';
  } else if (releaseEnvironment == 'staging') {
    api_url = 'https://stageme.dancingnomads.com';
  }
  return api_url;
};

export const BASE_URL = apiUrl();
