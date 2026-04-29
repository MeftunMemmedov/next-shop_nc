import { format, Locale } from 'date-fns';
import { az, enUS, ru } from 'date-fns/locale';

export const getPageTitle = (title: string) => {
  // const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME as string;
  return `${title} | SHOP`;
};

export const formattedDate = (date: Date, currentLocale: string) => {
  const locales: Record<string, Locale> = {
    az,
    en: enUS,
    ru,
  };
  return format(date, 'dd MMMM yyyy', {
    locale: locales[currentLocale] || enUS,
  });
};
