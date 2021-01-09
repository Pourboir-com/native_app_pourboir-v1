import Constants from 'expo-constants';

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return 'development';
  if (env.indexOf('dev') !== -1) return 'development';
  if (env.indexOf('staging') !== -1) return 'staging';
  if (env.indexOf('prod') !== -1) return 'production';
}
export const releaseEnvironment = getEnvVars(Constants.manifest.releaseChannel);
const api_url = () => {
  let api_url = 'http://192.168.0.109:8080';
  if (releaseEnvironment == 'production') {
    api_url = 'https://production.dancingnomads.com';
  } else if (releaseEnvironment == 'staging') {
    api_url = 'https://stageme.dancingnomads.com';
  }
  return api_url;
};

export const BASE_URL = api_url();
