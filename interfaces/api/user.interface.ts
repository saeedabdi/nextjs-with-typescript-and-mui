export interface ResponseUser {
    useName: string;
    imageUrl: string;
    socials: SocialsEntity[];
}
export interface SocialsEntity {
    id: string;
    social: string;
    link: string;
}
