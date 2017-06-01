import { ActionReducer, Action } from '@ngrx/store';
import {
    SET_AUTH_CREDENTIAL, SET_AUTH_USER, SET_AUTH_COVERS,
    INIT, CLEAN_AUTH, LOGOUT
} from '../actions';
import _get from 'lodash/get';

import * as firebase from 'firebase/app';

const defaultState = {
    user: null,
    credential: null,
    provider: null,
};

export const authReducer: ActionReducer<Object> = (state: IAuthState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_AUTH_USER: {
            const provider = _get(payload.user, 'providerData[0]');
            delete payload.user.providerData;
            return Object.assign({}, state, {
                user: payload.user,
                provider
            });
        }

        case SET_AUTH_CREDENTIAL: {
            return Object.assign({}, state, {
                credential: payload.credential
            });
        }

        case INIT: {
            return payload.auth || defaultState;
        }

        case CLEAN_AUTH:
        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

export interface IStsTokenManager {
    accessToken: string;
    apiKey: string;
    expirationTime: number;
    refreshToken: string;
}

export interface IUser {
    uid: string;
    apiKey: string;
    appName: string;
    authDomain: string;
    displayName: string;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string | null;
    photoURL: string;
    redirectEventId: string | null;
    stsTokenManager: IStsTokenManager;
}

export interface ICredential {
    access_token_key: string;
    access_token_secret: string;
}

export interface ICover {
    h: number;
    w: number;
    url: string;
}

export interface ICovers {
    ipad: ICover;
    ipad_retina: ICover;
    web: ICover;
    web_retina: ICover;
    mobile: ICover;
    mobile_retina: ICover;
    "300x100": ICover;
    "600x200": ICover;
    "1500x500": ICover;
    "1080x360": ICover;
}

export interface IAuthState {
    user: IUser,
    credential: ICredential,
    provider: firebase.UserInfo,
}