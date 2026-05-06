import { format, Locale } from 'date-fns';
import { az, enUS, ru } from 'date-fns/locale';
import { getLocale } from 'next-intl/server';

export const getPageTitle = (title: string) => {
  // const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME as string;
  return `${title} | SHOP`;
};

export const formattedDate = async (date: Date) => {
  const locale = await getLocale();
  const locales: Record<string, Locale> = {
    az,
    en: enUS,
    ru,
  };
  return format(date, 'dd MMMM yyyy', {
    locale: locales[locale] || enUS,
  });
};

export const blockScreenByTransparentOverlay = (state: boolean) => {
  if (state) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
  return () => document.body.classList.remove('overflow-hidden');
};
