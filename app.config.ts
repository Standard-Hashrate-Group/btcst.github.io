import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config })=>{
    return {
        ...config,
        extra:{
            env:process.env.env
        }
    }
}