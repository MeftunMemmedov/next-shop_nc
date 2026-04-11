import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleChange = <T>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setFormState: Dispatch<SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setFormState((prevState) => ({ ...prevState, [name]: value }));
};

export const handleInputPhone = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^\d]/g, '');
  if (e.target.value.length > 9) {
    return;
  }
};

export const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^a-zA-ZğüşıəöçĞÜŞİÖÇƏ]/g, '');
};

export const handleInputCityName = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^a-zA-ZğüşıəöçĞÜŞİÖÇƏ ]/g, '');
};

export const handleInputFin = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
};

export const handleInputLetterandNumbers = (
  e: ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9ğüşıöçəĞÜŞİÖÇƏ ,]/g, '');
};

export const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\s/g, '');
};

export const getFormData = (
  data: Record<string, string | number | boolean | (string | File)[]>
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });
  return formData;
};
