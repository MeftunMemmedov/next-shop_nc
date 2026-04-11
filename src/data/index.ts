import { Faker, LocaleDefinition, az, en, ru } from '@faker-js/faker';

const locales: Record<string, LocaleDefinition> = {
  az: az,
  en: en,
  ru: ru,
};

export const faker = new Faker({
  locale: [locales['en'], en],
});
