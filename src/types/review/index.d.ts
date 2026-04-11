export type Review = {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ReviewMessage = {
  message: string;
  rating: number;
};
