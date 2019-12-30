import axios from 'axios';
import md5 from 'md5'

import { API_URL, API_SALT } from 'react-native-dotenv'

export function getRawPhoneNumber(formattedPhoneNumber) {
    let rawPhoneNumber = '';

    // itertively keep numeric chars
    for (var i = 0; i < formattedPhoneNumber.length; i++) {
        char = formattedPhoneNumber.charAt(i);
        if (char >= '0' && char <= '9') 
            rawPhoneNumber += char;
    }

    return rawPhoneNumber;
}

export function formatRawPhoneNumber(rawPhoneNumber) {
    let formattedPhoneNumber = '';

    // extract area code component
    if (rawPhoneNumber.length >= 4) {
        var areaCode = rawPhoneNumber.substring(0, 3);

        // extract three-code component
        if (rawPhoneNumber.length >= 7) {
            var threeCode = rawPhoneNumber.substring(3, 6);

            // extract four-code component
            if (rawPhoneNumber.length == 10) {
                var fourCode = rawPhoneNumber.substring(6);
                formattedPhoneNumber = '(' + areaCode + ') ' 
                    + threeCode + '-'
                    + fourCode;
            }
            else formattedPhoneNumber = '(' + areaCode + ') ' 
                + threeCode + '-'
                + rawPhoneNumber.substring(6);
        }
        else formattedPhoneNumber = '(' + areaCode + ') ' 
            + rawPhoneNumber.substring(3);
    }
    else formattedPhoneNumber = rawPhoneNumber;

    return formattedPhoneNumber;
}

export async function sendUnauthenticatedRequest(internalSalt, target, path, params) {

    // build base token
    const baseToken = md5(internalSalt + API_SALT + target)

    // call home API
    return axios.get(API_URL + path, {
        params: params,
        headers: {
            base_token: baseToken,
        }
    });
}