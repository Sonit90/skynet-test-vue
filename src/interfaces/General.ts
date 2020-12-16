export interface Select {
  title: string;
  items: Item[];
}

export interface Item {
  title: string;
  price: number;
}

export interface Variant {
  title: string;
  description: string;
  color: string;
  price_default: number;
  options: Item[];
  select: Select[];
}

export interface Step{
  title: string;
  variants: Variant[];
}
