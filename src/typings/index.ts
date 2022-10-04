interface Blog {
  imageUrl: string;
  model: string;
  year: string;
  Kilometer: string;
  price: string;
  id: number;
}
interface User {
  id: number;
  model: string;
  tradinghour: string;
  CarInfo: string;
  price: number;
  brand: string;
  picture: string;
}

export type { Blog, User };
