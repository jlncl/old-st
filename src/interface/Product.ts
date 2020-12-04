export interface IProductCardProps {
  className?: string;
  data: IProduct;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  size: number;
  date: string;
}
