import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import md5 from 'md5'

import { API_URL, API_SALT } from 'react-native-dotenv'

export async function sendAuthenticatedRequest(internalSalt, target, path, params) {

    // build base token
    const baseToken = md5(internalSalt + API_SALT + target)

    // call home API
    const credentials = await Keychain.getInternetCredentials('access_token');
    return axios.get(API_URL + path, {
        params: params,
        headers: {
            base_token: baseToken,
            access_token: credentials.username
        }
    });
}

export function resetKeychainAccessToken() {
    Keychain.resetInternetCredentials('access_token');
}