import { ResponseUser } from 'interfaces/api/user.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

export const user: ResponseUser = {
    useName: 'John Doe',
    imageUrl: 'https://avatars3.githubusercontent.com/u/1234?s=460&v=4',
    socials: [
        {
            id: '1',
            social: 'facebook',
            link: 'https://facebook.com/saeedabdi',
        },
        {
            id: '2',
            social: 'twitter',
            link: 'https://twitter.com/saeedabdi',
        },
    ],
};
export default (req: NextApiRequest, res: NextApiResponse<ResponseUser>) => {
    switch (req.method) {
        case 'GET':
            return res.status(200).json(user);
        default:
            return res.status(200).json(user);
    }
};
