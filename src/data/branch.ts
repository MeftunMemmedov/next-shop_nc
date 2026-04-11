import { Branch } from '@/types';

import { faker } from '.';

faker.seed(123);

export const createRandomBranches = (): Branch => {
  const title = faker.location.city();

  const startTime = faker.number.bigInt({ min: 8, max: 12 });
  const endTime = faker.number.bigInt({ min: 8, max: 11 });

  return {
    slug: faker.helpers.slugify(title),
    title: title,
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    working_hours: `${startTime} am - ${endTime} pm EST, 7 days a week`,
    map: faker.helpers.arrayElement([
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.344061946483!2d49.842151976969134!3d40.37906649483864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da7a06b402f%3A0xd8897cf79ec36111!2zMjggQWzEscWfdmVyacWfIE1lcmtlemk!5e0!3m2!1str!2saz!4v1732041148696!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.3934001634602!2d49.850369675149075!3d40.400134956650554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d5d5a2c1005%3A0x5ede1cc1418ccc54!2sGenclik%20Mall!5e0!3m2!1str!2saz!4v1732041211517!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.2797328945467!2d49.83435007514668!3d40.35832135919355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dffd00e6133%3A0x137483827cf83c8c!2sD%C9%99niz%20Mall!5e0!3m2!1str!2saz!4v1732041256553!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.458890607779!2d49.839080075147756!3d40.37652105808699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da5a4c85e9f%3A0x8b209a8e1ed5eea9!2sAF%20Mall!5e0!3m2!1str!2saz!4v1732041419193!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.7867104552747!2d49.83026847514723!3d40.369253458528966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dbba3445cab%3A0xad3008840abcda6d!2sTicaret%20Merkezi!5e0!3m2!1str!2saz!4v1732041501453!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.621976675198!2d49.83713817514754!3d40.37290565830683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d63bd9a9971%3A0xcd74b0b66dd1095e!2sLC%20Waikiki!5e0!3m2!1str!2saz!4v1732045130193!5m2!1str!2saz',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.3469282692413!2d49.84404517514779!3d40.37900295793598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da7a1a7e7c9%3A0x924e11763eb2a4a2!2sNEW%20YORKER!5e0!3m2!1str!2saz!4v1732045206539!5m2!1str!2saz',
    ]),
  };
};

export const BRANCHES: Branch[] = Array.from({ length: 12 }, () =>
  createRandomBranches()
);
