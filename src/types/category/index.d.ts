export type Category = {
  id: string;
  slug: string;
  image: string;
  title: string;
  children?: Category[];
};
