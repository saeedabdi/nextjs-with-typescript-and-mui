import { ResponseUser, SocialsEntity } from 'interfaces/api/user.interface';

import api from './api';

export default {
    getUserDetails: () => api.get<ResponseUser>('/user'),
    getUserSocials: () => api.get<ResponseUser['socials']>('/user-social'),
    addUserSocial: (social: SocialsEntity) =>
        api.post<ResponseUser['socials']>('/user-social', social),
    deleteUserSocial: (socialId: string) =>
        api.delete<ResponseUser['socials']>('/user-social?id=' + socialId),
    updateUserSocial: (social: SocialsEntity) =>
        api.put<ResponseUser['socials']>('/user-social', social),
};
