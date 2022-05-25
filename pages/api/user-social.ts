import { ResponseUser } from 'interfaces/api/user.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

import { user } from './user';

export default (req: NextApiRequest, res: NextApiResponse<ResponseUser['socials']>) => {
    switch (req.method) {
        case 'GET':
            return res.status(200).json(user.socials);
        case 'POST':
            const newSocial = req.body;
            const hasSocial = user.socials.find((social) => social.social === newSocial.social);
            if (hasSocial) {
                return res.status(400).json({
                    message: 'Social already exists',
                } as any);
            }
            user.socials.push(newSocial);

            return res.status(200).json(user.socials);
        case 'DELETE':
            const socialId = req.query.id;
            const socialIndex = user.socials.findIndex((social) => social.id === socialId);
            user.socials.splice(socialIndex, 1);
            return res.status(200).json(user.socials);
        case 'PUT':
            const socialToUpdate = req.body;
            const socialToUpdateIndex = user.socials.findIndex(
                (social) => social.id === socialToUpdate.id,
            );
            const socialToUpdateIsExist = user.socials.find(
                (social) => social.social === socialToUpdate.social,
            );
            if (socialToUpdateIsExist) {
                return res.status(400).json({
                    message: 'Social already exists',
                } as any);
            }
            user.socials[socialToUpdateIndex] = socialToUpdate;
            return res.status(200).json(user.socials);
        default:
            return res.status(200).json(user.socials);
    }
};
