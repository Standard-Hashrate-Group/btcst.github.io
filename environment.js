import Constants from "expo-constants";
import active from "./active.env"

const ENV = {
  dev: {
      REACT_APP_NETWORK_URL:"https://data-seed-prebsc-1-s1.binance.org:8545",
      REACT_APP_CHAIN_ID:97,
      CONTRACT:{
          RTOKEN:"0xe28C4b5ca0D6cF41E5aF4FCa9A19b548Bf3B0dEf",
          STOKEN:"0xaa4C10aa3DE2E4dA6b0c0C9d177F1fa77314c9d8",
          FARM:"0x78650B139471520656b9E7aA7A5e9276814a38e9"
      },
      CHAIN_NAME:"Binance Smart Chain TestNet",
      WEB_URL:"https://test-get.1-b.tc/"
  },
  staging: {
      REACT_APP_NETWORK_URL:"https://bsc-dataseed1.defibit.io",
      REACT_APP_CHAIN_ID:56,
      CONTRACT:{
        RTOKEN:"0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        STOKEN:"0x78650B139471520656b9E7aA7A5e9276814a38e9",
        FARM:"0x5767a0b83f7B94eE5b9a8f5AddADcB9023156F88"
      },
      CHAIN_NAME:"Binance Smart Chain MainNet",
      WEB_URL:"https://get.1-b.tc/"
  },
  prod: {
      REACT_APP_NETWORK_URL:"https://bsc-dataseed1.defibit.io",
      REACT_APP_CHAIN_ID:56,
      CONTRACT:{
        RTOKEN:"0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        STOKEN:"0x78650B139471520656b9E7aA7A5e9276814a38e9",
        FARM:"0x5767a0b83f7B94eE5b9a8f5AddADcB9023156F88"
      },
      CHAIN_NAME:"Binance Smart Chain MainNet",
      WEB_URL:"https://get.1-b.tc/"
  }
};
   
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    //when use expo start -w we can override the env
    if (Constants.manifest.extra.env){
      return ENV[Constants.manifest.extra.env];
    }
    //if it is developemnt env make it stop here
    if (__DEV__) {
      return ENV.dev;
    }
    if (!env){
      env = active;
    }
    //else we try env parameters from releaseChannel
    if (env === 'dev') {
      return ENV.dev;
    }
    if (env === 'staging') {
      return ENV.staging;
    }
    if (env === 'prod') {
      return ENV.prod;
    }
};
   
export default getEnvVars;