import { locales } from 'helpers/i18n';
import { useRouter } from 'next/router';

export const useTranslation = () => {
    const { locale } = useRouter();
    const t = (value: string): string => locales[locale as string][value] || value;
    return { t };
};
