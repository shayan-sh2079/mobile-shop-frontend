export type IconsProps = { className?: string };

export type Mobile = {
  id: number;
  name: string;
  brand: string;
  images: string[];
  quantity: number;
  score: number;
  price: number;
};

export type SearchParams = Record<string, string | string[]> | undefined;
